const axios = require('axios');

module.exports = {
  logToday:  async (req, res, next) => {
    const headers = {
      'User-Agent': 'Logit/1.0',
      'Content-Type': 'application/json',
      'X-FreckleToken': process.env.FRECKLE_TOKEN
    };
    const status = 200;
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
      const res = await axios.post('https://api.letsfreckle.com/v2/entries', payload, { headers });
      const data = res.data;
      res.status(status).send(data);

    } catch(e) {
      status = 500;
      res.status(status).send({
        error: e
      });
    }
  }
}