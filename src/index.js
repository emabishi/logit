require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const router = express.Router();
const routes = require('./routes');

app.use(bodyParser.json());

app.use('/api/v1', routes(router));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening')
});