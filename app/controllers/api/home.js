const debug = require('debug')('home controller');
const homeDataMapper = require('../../datamappers/home');
// const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  /**
     * home controller to post a new home.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Home} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body.email ', req.body.email);
    const newHome = await homeDataMapper.insert(req.body);
    return res.status(200).json(newHome);
  },

};
