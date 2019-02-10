const socket = io();
socket.on('connect', function(){
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'Carlos',
        text: 'Hello from the client!'
    });

});

socket.on('newMessage', (message)=> {
    console.log('new message:', message);
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});
