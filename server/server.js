const path = require('path');
const http = require('http');
const _ = require('lodash');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '..','public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User has joined!'));

    socket.on('createMessage', (message, callback)=> {
        const { from, text } = _.pick(message, ['from','text']);
        io.emit('newMessage',generateMessage(from,text));
        callback('This is from the server');
    })

    socket.on('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage', {from: 'Admin', link:generateLocationMessage(coords)});
    });

    socket.on('disconnect', ()=> {
        console.log('User disconnected')
    });
})

server.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`)
})
