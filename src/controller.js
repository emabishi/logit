const axios = require('axios');
const getDatesBetween = require('../utils').getDatesBetween;
const logForDate = require('../utils').logForDate;
const moment = require('moment-timezone');


class LogController {
  async logToday (req, res, next) {
    const headers = {
      'User-Agent': 'Logit/1.0',
      'Content-Type': 'application/json',
      'X-FreckleToken': process.env.FRECKLE_TOKEN
    };
    let status = 200;
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Jan == 0
    const day = date.getDate();

    const payload = {
      "date": `${year}-${month}-${day}`,
      "minutes": 480,
      "project_name": "Nivi"
    };
    try {
      const resp = await axios.post('https://api.letsfreckle.com/v2/entries', payload, {
        headers
      });
      const data = resp.data;
      res.status(status).send(data);

    } catch (e) {
      status = 500;
      res.status(status).send({
        error: e,
      });
    }
  }
  logBetween (req, res, next) {
    // Will loop through dates and call logForDate
    // Will not log weekends when omitWeekends is true
    
    let status = 200;
    let { from, to, omitWeekends } = req.body;

    let fts = moment(from, 'YYYY-MM-DD').valueOf();
    const fromDate = moment(fts).tz('Africa/Nairobi').format('YYYY-MM-DD');
    let tts = moment(to, 'YYYY-MM-DD').valueOf();
    const toDate = moment(tts).tz('Africa/Nairobi').format('YYYY-MM-DD');

    const dates = getDatesBetween(fromDate, toDate, omitWeekends);

    if (dates) {
      // date should be of the form yyyy-mm-dd
      const promiseList = dates.map(date => logForDate(req, res, date, 'Nivi'));
      Promise.all(promiseList).then(resp => { console.log(resp); res.send(JSON.stringify(resp)) }).catch(e => res.send(JSON.stringify(e)));
    } else {
      status = 500;
      res.status(status).send({
        message: 'No dates provided'
      });
    }
  }
}
module.exports = LogController;