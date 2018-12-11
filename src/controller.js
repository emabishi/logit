const axios = require('axios');
const isDate = require('../utils').isDate;
const getDatesBetween = require('../utils').getDatesBetween;
const moment = require('moment-timezone');

module.exports = {
  logToday:  async (req, res, next) => {
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
      const resp = await axios.post('https://api.letsfreckle.com/v2/entries', payload, { headers });
      const data = resp.data;
      res.status(status).send(data);

    } catch(e) {
      status = 500;
      res.status(status).send({
        error: JSON.stringify(e, null, 2)
      });
    }
  },
  logForDate: async (req, res, next) => {
    let status = 200;
    let { date, project } = req.body;
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
        const resp = await axios.post('https://api.letsfreckle.com/v2/entries', payload, {
          headers
        });
        const data = resp.data;
        res.status(status).send(data);

      } catch (e) {
        status = 500;
        res.status(status).send({
          error: JSOM.stringify(e, null, 2),
        });
      }
    } else {
      status = 400;
      res.status(status).send({
        error: 'Bad request',
        message: 'Incorrect date supplied.'
      })
    }
  },
  logBetween: (req, res, next) => {
    // Will loop through and call logForDate
    // Will not log weekends when omitWeekends is true
    
    let status = 200;
    let { from, to, omitWeekends } = req.body;

    let fts = moment(from, 'DD/MM/YYYY').valueOf();
    const fromDate = moment(fts).tz('Africa/Nairobi').format('DD/MM/YYYY');
    let tts = moment(to, 'DD/MM/YYYY').valueOf();
    const toDate = moment(tts).tz('Africa/Nairobi').format('DD/MM/YYYY');

    const dates = getDatesBetween(fromDate, toDate, omitWeekends);
    if (dates) {
      res.status(status).send({
        dates
      });
    } else {
      status = 500;
      res.status(status).send({
        message: 'Something wen\'t wrong'
      });
    }
  }
}