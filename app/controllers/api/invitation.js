const debug = require('debug')('invitation controller');
const homeDataMapper = require('../../datamappers/home');
const sendMailService = require('../../services/sendMail');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  /**
     * invitation controller to send invitation.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {boolean} Route API JSON response
     */
  async createOne(req, res, next) {
    debug('dans createOne');
    debug('req.body ', req.body);
    const home = await homeDataMapper.findOneByPk(req.body.home_id);
    // debug(home);
    const transporterSendmail = sendMailService(
      req.body.email,
      // ne pas depasser le nombre de caractères max pour le subject
      'Cduprops invitation ',
      `Rejoins la maison "${home.name}" avec le code "${home.password.toString()}" `,
    );

    debug(transporterSendmail);
    try {
      const envoi = await transporterSendmail;
      debug('dans le try envoi.accepted', envoi.accepted);
      res.status(200).json('mail envoyé');
    } catch (error) {
      debug('dans le catch error ', error);
      next(new ApiError('error envoi mail', { statusCode: 500 }));
    }
  },
};
