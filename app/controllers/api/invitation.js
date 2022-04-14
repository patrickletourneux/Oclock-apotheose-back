const debug = require('debug')('invitation controller');
const homeDataMapper = require('../../datamappers/home');
const sendMailService = require('../../helpers/sendMail');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  /**
     * invitation controller to send invitation.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {boolean} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body ', req.body);
    const home = await homeDataMapper.findOneByPk(req.body.home_id);
    debug(home);
    const envoi = await sendMailService(
      req.body.email,
      // ne pas depasser le nombre de caractères max pour le subject
      'Cduprops invitation ',
      `rejoins la maison ${home.id.toString()} avec le mot de passe ${home.password.toString()} `,
    );
    debug('envoi message', envoi);

    return res.status(200).json('invitation envoyée par mail');
  },
};
