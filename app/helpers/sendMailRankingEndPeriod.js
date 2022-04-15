require('dotenv').config();
const debug = require('debug')('sendMailEndPeriod helper');
const sendMailService = require('./sendMail');

const sendMailEndPeriod = {
  async sendMail(usersWithScore) {
    debug('usersWithScore ', usersWithScore);
    // pour chaque user on envoie un mail
    const mailsToSend = [];
    usersWithScore.users.forEach((user) => {
      debug('user :', user.email);

      const mail = sendMailService(user.email, 'Cduprops score semaine ', `<div> ${JSON.stringify(usersWithScore)} </div>`);

      mailsToSend.push(mail);
    });

    await Promise.all(mailsToSend);
    debug('done');
    return ('mails envoyés');
  },
};

module.exports = sendMailEndPeriod;
