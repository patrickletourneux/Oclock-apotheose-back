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
    // req.params.id is user.id
    // check if a user exist in dbb for this email, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    // debug(user);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }

    /**
 * TODO to secure all cases if following data are undefined
 */

    // load data for front end vue and reword data to deliver to front end exactly the need
    const home = await homeDataMapper.findOneByPk(user.home_id);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    delete home.created_at;
    delete home.password;
    const usersHome = await rankingDataMapper.findUsersByHomeID(user.home_id);
    if (usersHome) {
      home.userCount = usersHome.length;
    } else {
      home.userCount = 0;
    }
    const reward = await rewardDataMapper.findOneByHomeID(user.home_id);
    if (!reward) {
      throw new ApiError('pas reward not found', { statusCode: 404 });
    }
    delete reward.created_at;
    const attributedTask = await dashboardDataMapper.findAttributedTaskCountByUserId(user.id);
    let attributedCount;
    if (!attributedTask) {
      attributedCount = 0;
    } else {
      attributedCount = parseInt(attributedTask.attributed_task_count, 10);
    }
    const doneTask = await dashboardDataMapper.findDoneTaskCountByUserId(user.id);
    let doneCount;
    if (!doneTask) {
      doneCount = 0;
    } else {
      doneCount = parseInt(doneTask.done_task_count, 10);
    }
    let ranking = await rankingDataMapper.score(user.home_id);
    if (!ranking) {
      ranking = [];
    }
    const users = await rankingDataMapper.findUsersByHomeID(user.home_id);

    // rework data to generate ranking for front end vue
    const newUsers = [];
    users.forEach((userH) => {
      const userHome = userH;
      const userRank = ranking.find((e) => e.id === userHome.id);
      if (userRank) {
        userHome.score = parseInt(userRank.score, 10);
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
        user_attributed_task_count: attributedCount,
        user_done_task_count: doneCount,
      },
      ranking: {
        firstUser,
        currentUser,
      },
    };
    return res.status(200).json(obj);
  },
};
