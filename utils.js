const moment = require('moment-timezone');

// Returns true if input is valid date
const isDate = (input) => {
    // Check if date is of type date
    const date = new Date(input);
    return !isNaN(date.getTime()); // unix time
}

const isWeekend = (input) => {
  if (this.isDate(input)) {
    const date = new Date(input);
    const day = date.getDay();
    return (day === 6 || day === 0);
  } else {
    throw new Error('incorrect date for weekend');
  }
}

const datesAreEquivalent = (date1, date2) => {
  const getYear = (date) => date.getFullYear();
  const getMonth = (date) => date.getMonth() + 1; // Jan == 0
  const getDay = (date) => date.getDate();

  const date1String = `${getYear(date1)/getMonth(date1)/getDay(date1)}`;
  const date2String = `${getYear(date2)/getMonth(date2)/getDay(date2)}`;
  
  return (date1String === date2String);
}

const getDatesBetween = (fromDate, toDate, omitWeekends) => {
  // excludes fromDate
  let dates = [];
  if (fromDate && toDate) {
    do {
      if (!omitWeekends) {
        fromDate = moment(fromDate, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD'); // next day
        dates.push(fromDate);
      } else {
        // evaluate day of week
        fromDay = moment(fromDate, 'YYYY-MM-DD').isoWeekday(); // Gets day of week from 1-7
        if (fromDay === 5) { // Friday
          // ignore next 2 days
          fromDate = moment(fromDate, 'YYYY-MM-DD').add(2, 'days').format('YYYY-MM-DD'); // next Monday
        } else {
          fromDate = moment(fromDate, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD'); // next day
          dates.push(fromDate);
        }
      }
    }
    while (
      !(moment(moment(fromDate, 'YYYY-MM-DD').valueOf())
    .isSameOrAfter(moment(toDate, 'YYYY-MM-DD').valueOf(), 'day'))
    );
    return dates;
  } else {
    throw new Error('Incorrect input provided');
  }
}

  // getDatesBetween: (from, to, noWeekends) => {
  //   // Doesn't care about daylight savings 
  //   //date.setTime(date.getTime() + 12 * 1000 * 60 * 60); date.setHours(0);
  //   // https://stackoverflow.com/questions/6963311/add-days-to-a-date-object
  //   let allDates = [];
  //   let currentDate = new Date(from);
  //   let finalDate = new Date(to);
  //   do {
  //     if (this.isDate(currentDate) && this.isDate(finalDate)) {
  //       // Check if date is on a weekend
  //       // if (noWeekends && this.isWeekend(currentDate)) {
  //         // pass
  //       // } else {
  //         allDates.push(currentDate);
  //         currentDate = new Date(currentDate.setTime(currentDate.getTime() + 86400000)); // Go to the next day
  //       // }
  //     } else {
  //       throw new Error('incorrect date provided');
  //     }
  //   }
  //   while (!(this.datesAreEquivalent(currentDate, finalDate)))

  //   return allDates;
  // }
module.exports = {
  isDate, isWeekend, datesAreEquivalent, getDatesBetween
};