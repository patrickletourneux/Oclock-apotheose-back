const debug = require('debug')('dashboard controller');
const userDataMapper = require('../../datamappers/user');
const dashboardDataMapper = require('../../datamappers/dashboard');
const homeDataMapper = require('../../datamappers/home');
const myhomeDataMapper = require('../../datamappers/myhome');
const mytasksDataMapper = require('../../datamappers/mytasks');
const rankingDataMapper = require('../../datamappers/ranking');

const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a user exist in dbb for this email, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    // debug(user);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    const userId = user.id;
    const homeId = user.home_id;

    const myhome = await homeDataMapper.findOneByPk(homeId);
    const mytasks = await mytasksDataMapper.findOneByPk(userId);
    const ranking = await rankingDataMapper.score(homeId);
    /** 
     * TODO 
      */
    // besoin de recuperer le reward par award.home_id 
    // const reward = await awardDataMapper.findOneByPk(userId);
    const obj = {
      myhome,
      mytasks,
      ranking,
    };
    return res.status(200).json(obj);
  },
};
