const bcrypt = require('bcrypt');
const debug = require('debug')('user controller');
const jwt = require('jsonwebtoken');
const userDataMapper = require('../../datamappers/user');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {

  /**
     * user controller to post a new user.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body.email ', req.body.email);
    // look if a user already exits with this email
    const user = await userDataMapper.findOneByEmail(req.body.email);
    if (user) {
      debug('user deja existant avec cet email pas possible de cree');
      throw new ApiError('Un compte est déjà associé à cette adresse mail', { statusCode: 409 });
    }
    debug('pas de user trouvé, user à creer dans bdd');
    // encrypt password with bcrypt
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await userDataMapper.insert(req.body);
    return res.status(200).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        pseudonym: newUser.pseudonym,
        // avatar_img: newUser.avatar_img,
      },
    });
  },
  /**
     * signin controller to get a user by email and check access.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
  async findOneByEmail(req, res) {
    debug('dans findOneByEmail');
    // check if a user exist in dbb for this email
    const user = await userDataMapper.findOneByEmail(req.body.email);
    if (!user) {
      debug('pas de user trouvé');
      throw new ApiError('Email et/ou mot de passe incorrect', { statusCode: 401 });
    }
    debug('user trouvé pour cet email');
    // check password with bcrypt
    if (await bcrypt.compare(req.body.password, user.password)) {
      debug('user et password ok');
      // token generation with user information inside token and send it to the front
      delete user.password;
      delete user.created_at;
      jwt.sign({
        user,
      }, process.env.SECRETKEYJWT, {
        expiresIn: '3600s',
      }, (err, token) => {
        debug('token generation');
        return res.status(200).json({
          token,
          user: {
            id: user.id,
            // email: user.email,
            pseudonym: user.pseudonym,
            avatar_img: user.avatar_img,
          },
        });
      });
    } else {
      // sinon je lui envoie un message d'erreur
      debug('password nok');
      throw new ApiError('Email et/ou mot de passe incorrect', { statusCode: 401 });
    }
  },
  /**
     * user controller to post a new user.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    debug('res.connectedUserId : ', res.connectedUserId);
    // check if a user exist in dbb for this email, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    delete user.password;
    delete user.created_at;
    return res.status(200).json(user);
  },
  /**
     * user controller to delete a new user.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async deleteOneByPk(req, res) {
    debug('dans deleteOneByPk');
    // check if a user exist in dbb for this email, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    if (user) {
      debug('user:', user.id, ' a effacer de la bdd');
      // delete the user in dbb
      /**
       * TODO
       *
       */
      // need to delete data in good order to respect bdd contrains
      // need to delete the data associated to the user in bdd before delete the user
      // attributed_task
      // done_task
      // if user is the creator of the home and not the last user of the home , change the home.user_id for another user of the home and change user.home_id to null
      // if user is the last user of the home, change user.home_id to null then delete the home
      // then delete the user
      const result = await userDataMapper.delete(req.params.id);
      debug('result ', result);
      if (result) {
        return res.status(200).json('user supprimmé de la bdd');
      }
      // return res.status(400).json('erreur lors de la suppression du user');
      throw new ApiError('erreur lors de la suppression du user', { statusCode: 502 });
    }
    throw new ApiError('user not found', { statusCode: 404 });
  },
  /**
     * user controller to post a new user.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async update(req, res) {
    debug('dans update');

    // check if a user exist in dbb for this email, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    if (user) {
      debug('user à update : ', user);
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const userUpdated = await userDataMapper.update(req.params.id, req.body);
      debug('userUpdated ', userUpdated);
      delete userUpdated.password;
      delete userUpdated.created_at;
      return res.status(200).json(userUpdated);
    }
    throw new ApiError('user not found', { statusCode: 404 });
  },
};
