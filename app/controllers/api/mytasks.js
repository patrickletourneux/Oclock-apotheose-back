const debug = require('debug')('dashboard controller');
const userDataMapper = require('../../datamappers/user');
const mytasksDataMapper = require('../../datamappers/mytasks');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a user exist in dbb for this id, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    debug(user);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    const mytasks = await mytasksDataMapper.findOneByPk(req.params.id);

    return res.status(200).json(mytasks);
  },
};
