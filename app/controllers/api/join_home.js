const debug = require('debug')('join_home controller');
const joinHomeDataMapper = require('../../datamappers/join_home');
const { ApiError } = require('../../helpers/errorHandler');

const joinHomeController = {
  /**
     * join_home controller to post a new join_home.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {JoinHome} Route API JSON response
     */
  async update(req, res) {
    debug('dans update');
    debug('req.body.home_id ', req.body.home_id);
    debug('req.body.home_password ', req.body.home_password);
    debug('req.body.user_id ', req.body.user_id);
    debug('req.body', req.body);
    const newJoinHome = await joinHomeDataMapper.update(req.body);
    // delete newJoinHome.created_at;
    return res.status(200).json(newJoinHome);
  },

  /**
   * join_home controller to check home_id and password
   * ExpressMiddleware signature
   * @param {object} req Express request object (not used)
   * @param {object} res Express response object
   * @returns {User} Route API JSON response
   */
  async findOnePassword(req, res) {
    debug('dans findOneByPassword');
    // check if a user exist in dbb for this email, id in req.params.id
    const homePass = await joinHomeDataMapper.getPassword(req.body.password);
    if (!homePass) {
      debug('pas de password trouvé pour cette maison');
      throw new ApiError('home not found', { statusCode: 404 });
    } else if (undefined) {
      throw new ApiError('Ce mot de passe n\'existe pas', { statusCode: 400 });
    } else {
      res.status(200).message('Ca marche !!, tu  peux rejoindre la maison');
    }
  },
};

module.exports = joinHomeController;
