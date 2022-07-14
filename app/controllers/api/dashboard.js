const debug = require('debug')('dashboard controller');
const userDataMapper = require('../../datamappers/user');
const dashboardDataMapper = require('../../datamappers/dashboard');
const homeDataMapper = require('../../datamappers/home');
const rankingDataMapper = require('../../datamappers/ranking');
const rewardDataMapper = require('../../datamappers/reward');

const { ApiError } = require('../../helpers/errorHandler');

const dashboardController = {
  // need to return to fron all necessary data for dashboard vue
  async getUserFromBdd(req) {
    const user = await userDataMapper.findOneByPk(req.params.id);
    // debug(user);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    return user;
  },
  async getHomeFromBdd(user) {
    const home = await homeDataMapper.findOneByPk(user.home_id);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    delete home.created_at;
    delete home.password;
    return home;
  },
  async getNumberUsersinHome(user) {
    const usersHome = await rankingDataMapper.findUsersByHomeID(user.home_id);
    let userCount = 0;
    if (usersHome) {
      userCount = usersHome.length;
    }
    return userCount;
  },
  async getHomeReward(user) {
    const reward = await rewardDataMapper.findOneByHomeID(user.home_id);
    if (!reward) {
      throw new ApiError('pas reward not found', { statusCode: 404 });
    }
    delete reward.created_at;
    return reward;
  },
  async getNumberAttributedTaskToUser(user) {
    const attributedTask = await dashboardDataMapper.findAttributedTaskCountByUserId(user.id);
    let attributedCount = 0;
    if (attributedTask) {
      attributedCount = parseInt(attributedTask.attributed_task_count, 10);
    }
    return attributedCount;
  },
  async getNumberDoneTaskByUser(user) {
    const doneTask = await dashboardDataMapper.findDoneTaskCountByUserId(user.id);
    let doneCount = 0;
    if (doneTask) {
      doneCount = parseInt(doneTask.done_task_count, 10);
    }
    return doneCount;
  },
  async getHomeScores(user) {
    let ranking = await rankingDataMapper.score(user.home_id);
    if (!ranking) {
      ranking = [];
    }
    return ranking;
  },
  async createHomeRanking(homeUsers, userScores) {
    // rework data to generate ranking for front end vue
    const newUsers = [];
    homeUsers.forEach((userH) => {
      const userHome = userH;
      const userRank = userScores.find((e) => e.id === userHome.id);
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
    console.log(newUsers)
    return newUsers;
  },

  async buildDashboardData(req,res){
        // req.params.id is user.id
        const user = await dashboardController.getUserFromBdd(req);
        // load data for front end vue and reward data to deliver to front end exactly the need
        const home = await dashboardController.getHomeFromBdd(user);
        home.userCount = await dashboardController.getNumberUsersinHome(user);
        const reward = await dashboardController.getHomeReward(user);
        const attributedCount = await dashboardController.getNumberAttributedTaskToUser(user);
        const doneCount = await dashboardController.getNumberDoneTaskByUser(user);
        const homeUsers = await rankingDataMapper.findUsersByHomeID(user.home_id);
        const userScores = await dashboardController.getHomeScores(user);
        const homeRanking = await dashboardController.createHomeRanking(homeUsers, userScores);
        const firstUser = homeRanking[0];
        const currentUser = homeRanking.find((e) => e.id === user.id);
    
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
        return obj;
  },

  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // req.params.id is user.id
    const obj = await dashboardController.buildDashboardData(req,res);
    // // load data for front end vue and reward data to deliver to front end exactly the need
    // const home = await dashboardController.getHomeFromBdd(user);
    // home.userCount = await dashboardController.getNumberUsersinHome(user);
    // const reward = await dashboardController.getHomeReward(user);
    // const attributedCount = await dashboardController.getNumberAttributedTaskToUser(user);
    // const doneCount = await dashboardController.getNumberDoneTaskByUser(user);
    // const homeUsers = await rankingDataMapper.findUsersByHomeID(user.home_id);
    // const userScores = await dashboardController.getHomeScores(user);
    // const homeRanking = await dashboardController.createHomeRanking(homeUsers, userScores);
    // const firstUser = homeRanking[0];
    // const currentUser = homeRanking.find((e) => e.id === user.id);

    // // object to send to front end
    // const obj = {
    //   home,
    //   reward,
    //   tasks: {
    //     user_attributed_task_count: attributedCount,
    //     user_done_task_count: doneCount,
    //   },
    //   ranking: {
    //     firstUser,
    //     currentUser,
    //   },
    // };
    return res.status(200).json(obj);
  },
};

module.exports = dashboardController;
