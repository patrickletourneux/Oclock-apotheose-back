const debug = require('debug')('dashboard controller');
const userDataMapper = require('../../datamappers/user');
const dashboardDataMapper = require('../../datamappers/dashboard');
const homeDataMapper = require('../../datamappers/home');
const mytasksDataMapper = require('../../datamappers/mytasks');
const rankingDataMapper = require('../../datamappers/ranking');
const rewardDataMapper = require('../../datamappers/reward');

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

    const home = await homeDataMapper.findOneByPk(homeId);
    delete home.created_at;
    const reward = await rewardDataMapper.findOneByHomeID(req.params.id);
    delete reward.created_at;
    const attributedTask = await dashboardDataMapper.findAttributedTaskCountByUserId(req.params.id);
    const doneTask = await dashboardDataMapper.findDoneTaskCountByUserId(req.params.id);
    // const mytasks = await mytasksDataMapper.findOneByPk(userId);
    const ranking = await rankingDataMapper.score(homeId);
    /**
     * TODO
      */
    // besoin de recuperer le reward par award.home_id
    // const reward = await awardDataMapper.findOneByPk(userId);
    const obj = {
      home,
      reward,
      tasks:{
        attributed_task_count: attributedTask.attributed_task_count,
        done_task_count: doneTask.done_task_count,
      },
      // mytasks,
      ranking,
    };
    return res.status(200).json(obj);
  },
};
