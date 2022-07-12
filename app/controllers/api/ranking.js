const debug = require('debug')('ranking controller');
const homeDataMapper = require('../../datamappers/home');
const rankingDataMapper = require('../../datamappers/ranking');
const rewardDataMapper = require('../../datamappers/reward');
const sendMailRanking = require('../../services/sendMailRankingOneHome');

const {
  ApiError,
} = require('../../helpers/errorHandler');

const rankingController = {
  /**
     * ranking controller to get a ranking for a home.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Ranking} Route API JSON response
     */
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // req.params.id is home.id
    // check if a home exist in dbb for this id, id in req.params.id
    // on factorise la fonction ci dessous qui est appelé à plusieurs endroits
    const usersWithScore = await rankingController.rankingCreation(req.params.id);
    return res.status(200).json(usersWithScore);
  },
  /**
     * ranking controller to send a mail with ranking to all users of the home.
     * use to test the functionnality when we ask this route
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Ranking} Route API JSON response
     */
  async sendMailRankingForOneHome(req, res) {
    debug('sendMailRankingForOneHome in controller');
    let usersWithScore = await rankingController.rankingCreation(req.params.id);
    if (!usersWithScore) {
      usersWithScore = [];
    }
    const sendMail = await sendMailRanking.sendMail(usersWithScore);
    debug('sendMail', sendMail);
    return res.status(200).json(sendMail);
  },
  // return an object with 2 properties
  // users wich is an array of user with a rank
  // reward , the home reaward
  async getHomeFromBddWithHomeId(homeID) {
    const home = await homeDataMapper.findOneByPk(homeID);
    // debug(home);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', {
        statusCode: 404,
      });
    }
    return home;
  },
  async getHomeScores(homeID) {
    let ranking = await rankingDataMapper.score(homeID);
    if (!ranking) {
      ranking = [];
    }
    return ranking;
  },
  async getHomeReward(homeID) {
    const reward = await rewardDataMapper.findOneByHomeID(homeID);
    if (!reward) {
      throw new ApiError('pas reward not found', { statusCode: 404 });
    }
    delete reward.created_at;
    return reward;
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
    return newUsers;
  },
  async rankingCreation(homeID) {
    // check if a home exist in dbb for this id, id in req.params.id
    const home = await rankingController.getHomeFromBddWithHomeId(homeID);
    const userScores = await rankingController.getHomeScores(homeID);
    const homeUsers = await rankingDataMapper.findUsersByHomeID(homeID);
    const reward = await rankingController.getHomeReward(homeID);
    // rework data for frontend need to deliver a clean ranking,
    const homeRanking = await rankingController.createHomeRanking(homeUsers, userScores);

    const obj = {
      users: homeRanking,
      reward,
    };
    return obj;
  },
};

module.exports = rankingController;
