const moment = require('moment');

//moment().valueOf() -> same as Date.now();

const generateMessage = (from, text) => {
    return {
       from,
       text,
       createdAt: moment().valueOf()
    }
}

const generateLocationMessage = ({from, coords}) => {
    return {
        from,
        url:`https://www.google.com/maps/@?api=1&map_action=map?center=${coords.latitude},${coords.longitude}`,
        createdAt: moment().valueOf()
    };
}

module.exports = {generateMessage, generateLocationMessage};