const debug = require('debug')('verifyToken');
const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorHandler');

module.exports = {
  InReqAuthorisation(req, res, next) {
    debug('verifyToken:');
    const bearerHeader = req.headers.authorization;
    debug('bearerHeader:', bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      debug('req.token:', req.token);
      jwt.verify(req.token, process.env.SECRETKEYJWT, (err, authData) => {
        if (err) {
          debug('token non valid');
          throw new ApiError('token not valid', { statusCode: 400 });
        } else {
          debug('token is valid');
          debug(req.token);
          // get the decoded payload ignoring signature, no secretOrPrivateKey needed
          // var decoded = jwt.decode(req.token);

          // get the decoded payload and header
          const decoded = jwt.decode(req.token, {
            complete: true,
          });
          debug('header ', decoded.header);
          debug('payload ', decoded.payload);
          debug('payload.user.id ', decoded.payload.user.id);
          // add connected user id in res
          res.connectedUserId = decoded.payload.user.id;
          next();
        }
      });
    } else {
      debug('no token received in backend');
      throw new ApiError('no token received in backend', { statusCode: 400 });
    }
  },
};
