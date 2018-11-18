module.exports = {
  logToday: (req, res, next) => {
    const headers = {
      'User-Agent': 'Logit/1.0',
      'Content-Type': 'application/json',
      'X-FreckleToken': process.env.FRECKLE_TOKEN
    };
    const status = 200;
    req.headers = headers;
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Jan == 0
    const day = date.getDate();

    const payload = {
      "date": `${year}-${month}-${day}`,
      "minutes": 480,
      "project_name": "Nivi"
    };
    // res.status(status).send(payload);
    console.log('here')
    res.status(status).send({'msg': 'hello'})
  }
}