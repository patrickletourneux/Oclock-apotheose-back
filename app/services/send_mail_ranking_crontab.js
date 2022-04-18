require('dotenv').config({
  path: '/var/www/html/Z_c_du_props/projet-c-du-props-back/.env',
});

const sendMailRankingEndPeriod = require('../helpers/sendMailRankingEndPeriod');

sendMailRankingEndPeriod.crontabSendMail();
