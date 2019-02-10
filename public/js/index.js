const socket = io();
socket.on('connect', function(){
    console.log('Connected to Server');

});

socket.on('newMessage', (message)=> {
    console.log('new message:', message);
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});
