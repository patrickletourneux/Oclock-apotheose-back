const debug = require('debug')('home_task controller');
const homeTaskDataMapper = require('../../datamappers/home_task');
const { ApiError } = require('../../helpers/errorHandler');

const homeTaskController = {
  /**
     * home_task controller to post a new home_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {HomeTask} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body.name ', req.body.name);
    debug('req.body.value ', req.body.value);
    const newHomeTask = await homeTaskDataMapper.insert(req.body);
    return res.status(200).json(newHomeTask);
  },

  /**
     * home_task controller to get a home_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {HomeTask} Route API JSON response
     */
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a home_task exist in dbb with this id in req.params.id
    const homeTask = await homeTaskDataMapper.findOneByPk(req.params.id);
    if (!homeTask) {
      debug('pas de home_task trouvée pour cet id');
      throw new ApiError('home_task not found', { statusCode: 404 });
    } else {
      return res.status(200).json(homeTask);
    }
  },

  /**
     * home_task controller to delete a home_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {HomeTask} Route API JSON response
     */
  async deleteOneByPk(req, res) {
    debug('dans deleteOneByPk');
    // check if a home_task exist in dbb for this id in req.params.id
    const homeTask = await homeTaskDataMapper.findOneByPk(req.params.id);
    if (homeTask) {
      debug('homeTask:', homeTask.id, ' a effacer de la bdd');
      // delete the home_task in dbb
      const result = await homeTaskDataMapper.delete(req.params.id);
      debug('result ', result);
      if (result) {
        return res.status(200).json('home_task supprimé de la bdd');
      }
      return res.status(400).json('erreur lors de la suppression de la home_task');
    }
    throw new ApiError('home_task not found', { statusCode: 404 });
  },

};

module.exports = homeTaskController;
