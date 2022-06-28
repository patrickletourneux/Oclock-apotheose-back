const nodemailer = require('nodemailer');
const debug = require('debug')('sendMail service');
const { ApiError } = require('../helpers/errorHandler');

const sendMail = async function send(email, sub, message) {
  /**
     * envoi une invitation dans une maison
     * @param {Invitation} invitation - Les données à insérer
     * @returns {boolean} - true or false
     */
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.CDUPROPSMAIL,
      pass: process.env.CDUPROPSMAILPASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  debug(email);
  // debug(sub);
  // debug(message);

  const mailOptions = {
    from: 'cduprops',
    to: email,
    subject: sub,
    html: message,
  };

  // If callback argument is not set then the method returns a Promise object.
  // https://nodemailer.com/usage/
  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
