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
    const li = document.createElement('li');
    const text = document.createTextNode(`${message.from}: ${message.text}`);
    li.appendChild(text);
    messages.appendChild(li);
})

socket.on('newLocationMessage', (message)=> {
    const a = document.createElement('a');
    a.setAttribute('href',message.url);
    a.setAttribute('target','blank');
    a.text="My Current Location"
    const text = document.createTextNode(`${message.from}:`);
    const li = document.createElement('li');
    li.appendChild(text);
    li.appendChild(a);
    messages.appendChild(li);
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
    locationBtn.disabled = true;
    locationBtn.value="Sending Location...";
    navigator.geolocation.getCurrentPosition((position)=> {
        socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, ()=> {
            locationBtn.disabled = false;
            locationBtn.value="Send Location";
        });
    }, ()=> alert('Unable to fetch location.'));
});
