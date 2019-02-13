const generateMessage = (from, text) => {
    return {
       from,
       text,
       createdAt: Date.now() 
    }
}

const generateLocationMessage = ({latitude, longitude}) => {
    return `https://www.google.com/maps/@?api=1&map_action=map?center=${latitude},${longitude}`;
}

module.exports = {generateMessage, generateLocationMessage};