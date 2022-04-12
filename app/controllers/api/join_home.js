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
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body.home_id ', req.body.home_id);
    debug('req.body.home_password ', req.body.home_password);
    debug('req.body.user_id ', req.body.user_id);
    const newJoinHome = await joinHomeDataMapper.insert(req.body);
    delete newJoinHome.created_at;
    return res.status(200).json(newJoinHome);
  },

};

module.exports = joinHomeController;
