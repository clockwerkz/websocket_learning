const path = require('path');
const http = require('http');
const _ = require('lodash');
const express = require('express');
const socketIO = require('socket.io');
const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '..','public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room are required');
        }
        socket.join(params.room);
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined!`));
        callback();
    });

    socket.on('createMessage', (message, callback)=> {
        const { from, text } = _.pick(message, ['from','text']);
        io.emit('newMessage',generateMessage(from,text));
        callback('This is from the server');
    })

    socket.on('createLocationMessage', (coords, callback)=> {
        io.emit('newLocationMessage', generateLocationMessage({from:'Admin', coords}));
        callback();
    });

    socket.on('disconnect', ()=> {
        console.log('User disconnected')
    });
})

server.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`)
})
