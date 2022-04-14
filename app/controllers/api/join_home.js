const debug = require('debug')('join_home controller');
const homeDataMapper = require('../../datamappers/home');
const userDataMapper = require('../../datamappers/user');
const { ApiError } = require('../../helpers/errorHandler');

/**
 * @typedef {object} JoinHome
 * @property {string} home_password - password for the home
 * @property {number} user_id - user_id to join home
 */

module.exports = {
  /**
     * join home
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {boolean} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body ', req.body);
    const home = await homeDataMapper.findOneByPassword(req.body.home_password);
    // check if home exist with the password in req.body
    if (!home) {
    //   debug('pas de home trouvé pour ce password');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    // debug(home);
    // check if user exist with the user_id in req.body
    const user = await userDataMapper.findOneByPk(req.body.user_id);
    if (!user) {
    //   debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    // check if user already in a home
    if (user.home_id !== null) {
    //   debug('user deja dans une maison');
      throw new ApiError('user deja dans une maison', { statusCode: 404 });
    }

    debug(user);
    delete user.id;
    user.home_id = home.id;
    // debug(user);
    const updatedUser = await userDataMapper.update(req.body.user_id, user);
    // debug(updatedUser);
    delete updatedUser.password;
    delete updatedUser.created_at;

    return res.status(200).json(updatedUser);
  },
};
