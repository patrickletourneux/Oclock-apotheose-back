require('dotenv').config({
  path: '/var/www/html/Z_c_du_props/projet-c-du-props-back/.env',
});
const schedule = require('node-schedule');

const debug = require('debug')('sendMailRankingCrontab helper');
const rankingController = require('../controllers/api/ranking');
const homeDatamapper = require('../datamappers/home');
const sendMailRanking = require('../helpers/sendMailRanking');

const sendMailEndPeriodCrontab = {
  // to send a mail with ranking for each user of each home
  async crontabSendMail() {
    // get from dbb array of all homes ID
    const homesId = await homeDatamapper.findAll();
    const homesIdArray = [];
    homesId.forEach((e) => {
      homesIdArray.push(e.id);
    });
    debug(homesIdArray);
    const mailsToSend = homesIdArray.map(async (id) => {
      const usersWithScore = await rankingController.rankingCreation(id);
      await sendMailRanking.sendMail(usersWithScore);
    });
    await Promise.all(mailsToSend);
    debug('done dans crontabSendMail');
    return ('mails envoyés');
  },
};

// to send every sunday at 23h50
// const sendMail = schedule.scheduleJob('04 * * * *', () => {
const sendMail = schedule.scheduleJob('50 23 * * 7', () => {
  debug('sendMailCrontab with Node Schedule');
  sendMailEndPeriodCrontab.crontabSendMail();
});
