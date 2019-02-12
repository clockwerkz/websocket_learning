const generateMessage = (from, text) => {
    return {
       from,
       text,
       createdAt: Date.now() 
    }
}

const generateLocationMessage = ({latitude, longitude}) => {
    return `<a href="https://www.google.com/maps/@?api=1&map_action=map?center=${latitude},${longitude}" target="_blank">Map of Location</a>`;
}

module.exports = {generateMessage, generateLocationMessage};