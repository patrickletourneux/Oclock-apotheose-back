const debug = require('debug')('myhome controller');
const homeDataMapper = require('../../datamappers/home');
const myhomeDataMapper = require('../../datamappers/myhome');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a home exist in dbb for this id, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    // debug(home);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    const mytasks = await myhomeDataMapper.findOneByPk(req.params.id);

    return res.status(200).json(mytasks);
  },
};
