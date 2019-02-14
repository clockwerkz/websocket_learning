const moment = require('moment');
// Jan 1 1970 00:00:00 am

// const date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 AM 6:01 am

const time = moment();

console.log(time.format('h:mm a'));