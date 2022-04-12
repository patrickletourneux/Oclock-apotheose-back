const debug = require('debug')('dashboard controller');
const userDataMapper = require('../../datamappers/user');
const dashboardDataMapper = require('../../datamappers/dashboard');
const homeDataMapper = require('../../datamappers/home');
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
    const homeId = user.home_id;

    /**
 * TODO to secure all cases if following data are undefined
 */

    // load data for front end vue
    const home = await homeDataMapper.findOneByPk(homeId);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    delete home.created_at;
    delete home.password;
    const usersHome = await rankingDataMapper.findUsersByPk(req.params.id);
    home.userCount = usersHome.length;
    const reward = await rewardDataMapper.findOneByHomeID(req.params.id);
    delete reward.created_at;
    const attributedTask = await dashboardDataMapper.findAttributedTaskCountByUserId(req.params.id);
    const doneTask = await dashboardDataMapper.findDoneTaskCountByUserId(req.params.id);
    const ranking = await rankingDataMapper.score(req.params.id);
    const users = await rankingDataMapper.findUsersByPk(req.params.id);

    // rework data to generate ranking for front end vue
    const newUsers = [];
    users.forEach((userH) => {
      const userHome = userH;
      const userRank = ranking.find((e) => e.id === userHome.id);
      if (userRank) {
        userHome.score = userRank.score;
      } else {
        userHome.score = 0;
      }
      newUsers.push(userHome);
    });
    // sort by score
    newUsers.sort((b, a) => a.score - b.score);
    let i = 1;
    newUsers.forEach((e) => {
      e.rank = i;
      i += 1;
    });

    const firstUser = newUsers[0];
    const currentUser = newUsers.find((e) => e.id === user.id);

    // object to send to front end
    const obj = {
      home,
      reward,
      tasks: {
        user_attributed_task_count: attributedTask.attributed_task_count,
        user_done_task_count: doneTask.done_task_count,
      },
      ranking: {
        firstUser,
        currentUser,
      },
    };
    return res.status(200).json(obj);
  },
};
