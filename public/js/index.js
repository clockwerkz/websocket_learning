const socket = io();
const messageForm = document.getElementById('message-form');
const messages = document.getElementById('messages');
const locationBtn = document.getElementById('send-location');

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

locationBtn.addEventListener('click', (event)=> {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    } 
    navigator.geolocation.getCurrentPosition((position)=> {
        const { latitude, longitude } = position.coords;
        socket.emit('createLocationMessage', {
            latitude,
            longitude
        });
    }, ()=> alert('Unable to fetch location.'));
});
