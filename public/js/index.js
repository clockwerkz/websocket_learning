const socket = io();
socket.on('connect', function(){
    console.log('Connected to Server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function() {
    console.log('New email');
});