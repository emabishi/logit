require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const router = express.Router();
const routes = require('./routes');

app.use(cors())
app.use(bodyParser.json());

app.use('/api/v1', routes(router));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening')
});