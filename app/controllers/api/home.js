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
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a user exist in dbb for this email, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      return res.status(400).json('pas de home trouvé pour cet id');
      // throw new ApiError('user not found', { statusCode: 404 });
    }
    return res.status(200).json(home);
  },
};
