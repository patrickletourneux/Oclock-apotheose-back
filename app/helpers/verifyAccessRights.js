const debug = require('debug')('verifyUserAccess');
const { ApiError } = require('./errorHandler');

module.exports = {
  checkHomeIdAccess(req, res, next) {
    // debug('res.tokenUserId', res.tokenUserId);
    // debug('res.tokenHomeId', res.tokenHomeId);
    // debug('req.params.id ', req.params.id);
    const homeId = req.params.id;
    // debug('homeId :', homeId);
    // check if user belongs to the home asked in route,
    // compare user.home_id in token to req.params.id
    if (res.tokenHomeId && res.tokenHomeId === homeId) {
      debug('acces home ok');
      next();
    } else {
      debug('acces home NOK');
      debug('ATTENTION test home non actif, besoin d effacer le next() de la ligne suivante pour l activer et decommenter ligne throw error');
      next();
      // throw new ApiError('acces user non valide pour cet url', {statusCode: 401,});
    }
  },
  checkUserIdAccess(req, res, next) {
    // debug('res.tokenUserId', res.tokenUserId);
    const userId = req.params.id;
    // debug('userId :', userId);
    if (res.tokenUserId && res.tokenUserId === userId) {
      debug('acces user ok');
      next();
    } else {
      debug('acces user NOK');
      debug('ATTENTION test user non actif, besoin d effacer le next() de la ligne suivante pour l activer et decommenter ligne throw error');
      next();
      // throw new ApiError('acces user non valide pour cet url', {statusCode: 401,});
    }
  },
};
