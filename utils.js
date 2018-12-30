const moment = require('moment-timezone');
const axios = require('axios');

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

const logForDate = async (req, res, date, project) => {
  let status = 200;
  if (isDate(date)) {
    date = date.replace('/', '-');
    const payload = {
      date,
      minutes: 480,
      project_name: project
    };
    const headers = {
      'User-Agent': 'Logit/1.0',
      'Content-Type': 'application/json',
      'X-FreckleToken': process.env.FRECKLE_TOKEN
    };
    try {
      return axios.post('https://api.letsfreckle.com/v2/entries', payload, {
        headers
      });

    } catch (e) {
      status = 500;
      res.status(status).send({
        error: e,
      });
    }
  } else {
    status = 400;
    res.status(status).send({
      error: 'Bad request',
      message: 'Incorrect date supplied.'
    })
  }
}
module.exports = {
  isDate, isWeekend, datesAreEquivalent, getDatesBetween, logForDate
};