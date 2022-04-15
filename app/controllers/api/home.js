const debug = require('debug')('home controller');
const homeDataMapper = require('../../datamappers/home');
const userDataMapper = require('../../datamappers/user');
const { ApiError } = require('../../helpers/errorHandler');

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
    debug('req.body :', req.body);
    // create home
    const newHome = await homeDataMapper.insert(req.body);
    delete newHome.created_at;
    const user = {
      home_id: newHome.id,
    };
    const id = req.body.user_id;
    // update user.home_id with the id of new created home
    const userUpdated = await userDataMapper.update(id, user);
    delete userUpdated.password;
    delete userUpdated.created_at;
    return res.status(200).json(newHome);
  },
  /**
     * home controller to post a new home.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Home} Route API JSON response
     */
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a user exist in dbb for this email, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    } else {
      delete home.created_at;
      return res.status(200).json(home);
    }
  },
  /**
     * home controller to delete a new user.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async deleteOneByPk(req, res) {
    debug('dans deleteOneByPk');
    // check if a user exist in dbb for this email, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    if (home) {
      debug('home:', home.id, ' a effacer de la bdd');
      // delete the user in dbb
      const result = await homeDataMapper.delete(req.params.id);
      debug('result ', result);
      if (result) {
        return res.status(200).json('home supprimmé de la bdd');
      }
      throw new ApiError('error during delete home', { statusCode: 500 });
    }
    throw new ApiError('home not found', { statusCode: 404 });
  },
  /**
     * home controller to post a new home.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async update(req, res) {
    debug('dans update');
    // check if a home exist in dbb for this email, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    if (home) {
      debug('home à update : ', home);
      const homeUpdated = await homeDataMapper.update(req.params.id, req.body);
      debug('homeUpdated ', homeUpdated);
      delete homeUpdated.created_at;
      return res.status(200).json(homeUpdated);
    }
    throw new ApiError('home not found', { statusCode: 404 });
  },
};
