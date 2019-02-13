const generateMessage = (from, text) => {
    return {
       from,
       text,
       createdAt: Date.now() 
    }
}

const generateLocationMessage = ({from, coords}) => {
    return {
        from,
        url:`https://www.google.com/maps/@?api=1&map_action=map?center=${coords.latitude},${coords.longitude}`,
        createdAt: Date.now()
    };
}

module.exports = {generateMessage, generateLocationMessage};