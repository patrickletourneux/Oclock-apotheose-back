const debug = require('debug')('ranking controller');
const homeDataMapper = require('../../datamappers/home');
const rankingDataMapper = require('../../datamappers/ranking');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a home exist in dbb for this id, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    debug(home);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    const ranking = await rankingDataMapper.score(req.params.id);
    // debug(ranking);
    const user = await rankingDataMapper.findUsersByPk(req.params.id);
    // debug(users);
    const obj = {
      ranking,
      user,
    };
    return res.status(200).json(obj);
  },
};
