const debug = require('debug')('verifyUserAccess');

const userDataMapper = require('../datamappers/user');

const { ApiError } = require('./errorHandler');

module.exports = {
  async checkHomeIdAccess(req, res, next) {
    if (process.env.TOKEN_VERIFY_ACTIV) {
      debug('ATTENTION test home non actif, besoin d effacer le next() de la ligne suivante pour l activer ');
      return next();
    }
    const homeId = parseInt(req.params.id, 10);
    debug('homeId :', homeId);
    // check if user in token belongs to the home asked in route,
    const user = await userDataMapper.findOneByPk(res.tokenUserId);
    if (!user) {
      throw new ApiError('user not found', { statusCode: 404 });
    }
    // compare user.home_id in token to req.params.id
    if (user.home_id === homeId) {
      debug('acces home ok');
      return next();
    }
    debug('acces home NOK');
    throw new ApiError('acces user non valide pour cet url', { statusCode: 401 });
  },
  async checkUserIdAccess(req, res, next) {
    if (process.env.TOKEN_VERIFY_ACTIV) {
      debug('ATTENTION test home non actif, besoin d effacer le next() de la ligne suivante pour l activer ');
      return next();
    }
    debug('res.tokenUserId', res.tokenUserId);
    // debug('req.params ', req.params);
    const userId = parseInt(req.params.id, 10);
    const user = await userDataMapper.findOneByPk(userId);
    if (!user) {
      throw new ApiError('user not found', { statusCode: 404 });
    }
    if (process.env.SERVEROVH === 'Y' || process.env.SERVEROVH === 'N') {
      debug('ATTENTION test home non actif, besoin d effacer le next() de la ligne suivante pour l activer ');
      return next();
    }
    if (res.tokenUserId === user.id) {
      debug('acces user ok');
      return next();
    }
    /**
     * TODO  pqoi l erreur ici bloque le serveur ???
     */
    debug('acces user NOK');
    throw new ApiError('acces user non valide pour cet url', { statusCode: 401 });
  },
};
