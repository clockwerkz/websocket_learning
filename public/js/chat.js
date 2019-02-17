const socket = io();
const messageForm = document.getElementById('message-form');
const messages = document.getElementById('messages');
const locationBtn = document.getElementById('send-location');


//Function just to show how emitters/listeners can implement callback functions
const messageCB = (data) => {

}

const scrollToBottom = () => {
    const lastMessage = messages.querySelector('li:last-child').scrollHeight;
    let { scrollHeight, clientHeight, scrollTop } = messages;
    if ((clientHeight + scrollTop + lastMessage) >= scrollHeight) {
        messages.scrollBy(0,lastMessage);
    }
}

socket.on('connect', function(){
    console.log('Connected to Server');
    const URLparams = new URLSearchParams(window.location.search);
    const params = {
        name: URLparams.get('name'),
        room: URLparams.get('room')
    }
    socket.emit('join', params, (err)=>{
        if (err) {
            alert(err);
            window.location.href='/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('newMessage', (message)=> {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.getElementById('message-template').innerHTML;
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    messages.innerHTML += html;
    scrollToBottom();
})

socket.on('newLocationMessage', (message)=> {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.getElementById('location-message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    messages.innerHTML += html;
    scrollToBottom();
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
