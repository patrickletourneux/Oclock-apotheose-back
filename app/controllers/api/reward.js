const debug = require('debug')('reward controller');
const rewardDataMapper = require('../../datamappers/reward');
const { ApiError } = require('../../helpers/errorHandler');

const rewardController = {
  /**
     * reward controller to post a new reward.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Reward} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    // debug('req.body.title ', req.body.title);
    // debug('req.body.description ', req.body.description);
    const newReward = await rewardDataMapper.insert(req.body);
    delete newReward.created_at;
    return res.status(200).json(newReward);
  },

  /**
     * reward controller to get a reward.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Reward} Route API JSON response
     */
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a reward exist in dbb with this id in req.params.id
    const reward = await rewardDataMapper.findOneByPk(req.params.id);
    if (!reward) {
      // debug('pas de reward trouvé pour cet id');
      throw new ApiError('reward not found', { statusCode: 404 });
    } else {
      delete reward.created_at;
      return res.status(200).json(reward);
    }
  },

  /**
     * reward controller to delete a reward.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Reward} Route API JSON response
     */
  async deleteOneByPk(req, res) {
    debug('dans deleteOneByPk');
    // check if a reward exist in dbb for this id in req.params.id
    const reward = await rewardDataMapper.findOneByPk(req.params.id);
    if (reward) {
      debug('reward:', reward.id, ' a effacer de la bdd');
      // delete the reward in dbb
      const result = await rewardDataMapper.delete(req.params.id);
      debug('result ', result);
      if (result) {
        return res.status(200).json('reward supprimé de la bdd');
      }
      throw new ApiError('erreur lors de la suppression du reward', { statusCode: 500 });
    }
    throw new ApiError('reward not found', { statusCode: 404 });
  },

  /**
     * reward controller to update a reward.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Reward} Route API JSON response
     */
  async update(req, res) {
    debug('dans update');
    // check if a reward exist in dbb with this id in req.params.id
    const reward = await rewardDataMapper.findOneByPk(req.params.id);
    if (reward) {
      debug('reward à update : ', reward);
      const rewardUpdated = await rewardDataMapper.update(req.params.id, req.body);
      debug('rewardUpdated ', rewardUpdated);
      delete rewardUpdated.created_at;
      return res.status(200).json(rewardUpdated);
    }
    throw new ApiError('reward not found', { statusCode: 404 });
  },
};

module.exports = rewardController;
