const moment = require('moment');
// Jan 1 1970 00:00:00 am

// const date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 AM 6:01 am

const time = moment();


const createdAt = 1550208343232;
const date_made = moment(createdAt);

console.log(date_made.format('MMM Do, YYYY h:mm a'));

const someTimestamp = moment().valueOf();
console.log('someTimestamp', someTimestamp);
//console.log(time.format('h:mm a'));