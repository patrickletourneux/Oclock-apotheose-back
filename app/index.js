/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const xssClean = require('xss-clean');

// require for periodic send mail
const sendMailRankingCrontab = require('./services/sendMailRankingCrontab');

const router = require('./routers');

const app = express();
require('./helpers/apiDocs')(app);

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// sanitiz user input   protect against Cross-site scriptin / XSS attacks
app.use(xssClean());

// On lève la restriction CORS pour nos amis React
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;
