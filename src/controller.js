const axios = require('axios');
const isDate = require('../utils').isDate;

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
  }
  // logBetween: (req, res, next) => {
  //   const from = req.body.from;
  //   const to = req.body.to;
  //   // Will loop through and call logForDate
  // }
}