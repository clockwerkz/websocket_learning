const socket = io();
const messageForm = document.getElementById('message-form');
const messages = document.getElementById('messages');

const messageCB = (data) => {

}

socket.on('connect', function(){
    console.log('Connected to Server');

});

socket.on('newMessage', (message)=> {
    console.log(message);
    const newMessage = `<li>${message.from}: ${message.text}</li>`;
    messages.innerHTML+=(newMessage);
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

messageForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    socket.emit('createMessage', {from:'User', text:event.target['message'].value}, messageCB);
    event.target['message'].value='';
});

