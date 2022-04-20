const debug = require('debug')('join_home controller');
const homeDataMapper = require('../../datamappers/home');
const userDataMapper = require('../../datamappers/user');
const rankingDataMapper = require('../../datamappers/ranking');
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
  async leaveHome(req, res) {
    /**
     * TODO
     */
    const homeIdToLeave = req.params.home_id;
    const userIdToleave = req.body.user_id;
    const home = await homeDataMapper.findOneByPk(homeIdToLeave);
    if (!home) {
      throw new ApiError('home not found', { statusCode: 404 });
    }
    const homeUsers = await rankingDataMapper.findUsersByHomeID(homeIdToLeave);
    const user = await userDataMapper.findOneByPk(userIdToleave);
    if (!user) {
      //   debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    /**
     * TODO test if user in homeUsers, if not throw error
     */
    if (userIdToleave !== home.user_id) {
      debug(`case if the user is not the creator of the home (home.user_id)
       delete all data linked to the user in the home attributed_task, done_task in the home `);
    } else if (userIdToleave === home.user_id && homeUsers.length > 1) {
      debug(`if the user is the creator of the home and not the last user of the home, change the creator to another user
      then  delete all data linked to the user in the home attributed_task, done_task in the home `);
    } else if (userIdToleave === home.user_id && homeUsers.length === 1) {
      debug('if the user is the creator of the home and is the last user of the home, delete the home');
    }
  },
};
