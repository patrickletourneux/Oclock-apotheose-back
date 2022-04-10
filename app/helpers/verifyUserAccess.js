const debug = require('debug')('verifyUserAccess');
const { ApiError } = require('./errorHandler');
const userDataMapper = require('../datamappers/user');
const homeDataMapper = require('../datamappers/home');

module.exports = {
  checkHomeIdAccess(req, res, next) {
    debug('res.tokenUserId', res.tokenUserId);
    debug('req.params.id ', req.params.id);
    const homeId = req.params.id;
    debug('homeId :', homeId);
    const user = userDataMapper.findOneByPk(res.tokenUserId);
    if (user.home_id === homeId) {
      debug('acces home ok');
      next();
    } else {
      throw new ApiError('acces user non valide pour cet url', { statusCode: 401 });
    }

    next();
  },
  checkUserIdAccess(req, res, next) {
    debug('res.tokenUserId', res.tokenUserId);
    const userId = req.params.id;
    debug('userId :', userId);
    if (res.tokenUserId === userId) {
      debug('acces user ok');
      next();
    } else {
      throw new ApiError('acces user non valide pour cet url', { statusCode: 401 });
    }
  },
};
