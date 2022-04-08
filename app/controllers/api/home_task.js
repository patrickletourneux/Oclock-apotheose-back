const debug = require('debug')('home_task controller');
const homeTaskDataMapper = require('../../datamappers/home_task');
const { ApiError } = require('../../helpers/errorHandler');

const homeTaskController = {
  /**
     * home_task controller to post a new home_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {Home_task} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body.name ', req.body.title);
    debug('req.body.value ', req.body.description);
    const newHomeTask = await homeTaskDataMapper.insert(req.body);
    return res.status(200).json(newHome_task);
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
    const homeTask = await homeTaskDataMapper.findOneByPk(req.params.id);
    if (!homeTask) {
      debug('pas de reward trouvé pour cet id');
      throw new ApiError('reward not found', { statusCode: 404 });
    } else {
      return res.status(200).json(homeTask);
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
      return res.status(400).json('erreur lors de la suppression du reward');
    }
    throw new ApiError('reward not found', { statusCode: 404 });
  },

  /**
     * reward controller to update a reward.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {User} Route API JSON response
     */
  async update(req, res) {
    debug('dans update');
    // check if a reward exist in dbb with this id in req.params.id
    const reward = await rewardDataMapper.findOneByPk(req.params.id);
    if (reward) {
      debug('reward à update : ', reward);
      const rewardUpdated = await rewardDataMapper.update(req.params.id, req.body);
      debug('rewardUpdated ', rewardUpdated);
      return res.status(200).json(rewardUpdated);
    }
    throw new ApiError('reward not found', { statusCode: 404 });
  },
};

module.exports = homeTaskController;
