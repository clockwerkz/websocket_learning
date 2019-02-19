const path = require('path');
const http = require('http');
const _ = require('lodash');
const express = require('express');
const socketIO = require('socket.io');

const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '..','public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=> {


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined!`));
        callback();
    });

    socket.on('createMessage', (message, callback)=> {
        const user = users.getUser(socket.id);
        const { text } = _.pick(message, ['text']);
        if (user && isRealString(text)) {
            io.to(user.room).emit('newMessage',generateMessage(user.name,text));
            callback('This is from the server');
        }
    })

    socket.on('createLocationMessage', (coords, callback)=> {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords));
            callback();
        }
    });

    socket.on('disconnect', ()=> {
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
            console.log('User disconnected');
        }
    });
})

server.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`)
})
