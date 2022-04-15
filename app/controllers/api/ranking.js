const debug = require('debug')('ranking controller');
const homeDataMapper = require('../../datamappers/home');
const rankingDataMapper = require('../../datamappers/ranking');
const rewardDataMapper = require('../../datamappers/reward');
const sendMailRankingEndPeriod = require('../../helpers/sendMailRankingEndPeriod');

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
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Ranking} Route API JSON response
     */
  async sendMailRankingEndPeriod(req, res) {
    debug('sendMailRankingEndPeriod');
    const usersWithScore = await rankingController.rankingCreation(req.params.id);
    const sendMail = await sendMailRankingEndPeriod.sendMail(usersWithScore);
    debug('sendMail', sendMail);
    return res.status(200).json(sendMail);
  },
  async rankingCreation(homeID) {
    // check if a home exist in dbb for this id, id in req.params.id
    const home = await homeDataMapper.findOneByPk(homeID);
    // debug(home);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', {
        statusCode: 404,
      });
    }
    let ranking = await rankingDataMapper.score(homeID);
    if (!ranking) {
      ranking = [];
    }
    // debug(ranking);
    const users = await rankingDataMapper.findUsersByHomeID(homeID);
    // debug('users ', users);
    let reward = await rewardDataMapper.findOneByHomeID(homeID);
    if (!reward) {
      reward = {
        title: 'no reward',
        descrition: 'no reward',
      };
    }
    delete reward.created_at;
    // debug('reward ', reward);
    // rework data for frontend need to deliver a clean ranking,
    // pseudo merge ranking with users in newUsers
    const newUsers = [];

    users.forEach((userH) => {
      const userHome = userH;
      const userRank = ranking.find((e) => e.id === userHome.id);
      if (userRank) {
        // debug('userRank.score', userRank.score);
        // debug('userRank', userRank);
        userHome.score = parseInt(userRank.score, 10);
      } else {
        userHome.score = 0;
      }
      // debug('userHome ', userHome);
      newUsers.push(userHome);
    });
    // sort by score
    newUsers.sort((b, a) => a.score - b.score);
    let i = 1;
    newUsers.forEach((e) => {
      e.rank = i;
      i += 1;
    });
    const obj = {
      // ranking,
      users: newUsers,
      reward,
    };
    return obj;
  },
};

module.exports = rankingController;