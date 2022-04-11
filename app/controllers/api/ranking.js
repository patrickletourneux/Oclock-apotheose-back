const debug = require('debug')('ranking controller');
const homeDataMapper = require('../../datamappers/home');
const rankingDataMapper = require('../../datamappers/ranking');
const rewardDataMapper = require('../../datamappers/reward');

const {
  ApiError,
} = require('../../helpers/errorHandler');

module.exports = {
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a home exist in dbb for this id, id in req.params.id
    const home = await homeDataMapper.findOneByPk(req.params.id);
    debug(home);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', {
        statusCode: 404,
      });
    }
    const ranking = await rankingDataMapper.score(req.params.id);
    // debug(ranking);
    const users = await rankingDataMapper.findUsersByPk(req.params.id);
    // debug('users ', users);
    const reward = await rewardDataMapper.findOneByHomeID(req.params.id);
    delete reward.created_at;
    // debug('reward ', reward);
    // rework data for frontend need to deliver a clean ranking,
    // pseudo merge ranking with users in newUsers
    const newUsers = [];

    users.forEach((userHome) => {
      const userRank = ranking.find((e) => e.id === userHome.id);
      if (userRank) {
        debug('userRank.score', userRank.score);
        debug('userRank', userRank);
        userHome.score = userRank.score;
      } else {
        userHome.score = 0;
      }
      debug('userHome ', userHome);
      newUsers.push(userHome);
    });
    // sort by score
    newUsers.sort((b, a) => a.score - b.score);
    let i = 1;
    for (item of newUsers) {
      item.rank = i;
      i++;
    }
    const obj = {
      // ranking,
      users: newUsers,
      reward,
    };
    return res.status(200).json(obj);
  },
};
