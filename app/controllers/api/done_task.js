const debug = require('debug')('done_task controller');
const doneTaskDataMapper = require('../../datamappers/done_task');
const { ApiError } = require('../../helpers/errorHandler');

const doneTaskController = {
  /**
     * done_task controller to post a new done_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {DoneTask} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body.name ', req.body.name);
    debug('req.body.value ', req.body.value);
    const newDoneTask = await doneTaskDataMapper.insert(req.body);
    return res.status(200).json(newDoneTask);
  },

  /**
     * done_task controller to delete a done_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {DoneTask} Route API JSON response
     */
  async deleteOneByPk(req, res) {
    debug('dans deleteOneByPk');
    // check if a done_task exist in dbb for this id in req.params.id
    const doneTask = await doneTaskDataMapper.findOneByPk(req.params.id);
    if (doneTask) {
      debug('doneTask:', doneTask.id, ' a effacer de la bdd');
      // delete the home_task in dbb
      const result = await doneTaskDataMapper.delete(req.params.id);
      debug('result ', result);
      if (result) {
        return res.status(200).json('done_task supprimé de la bdd');
      }
      return res.status(400).json('erreur lors de la suppression de la done_task');
    }
    throw new ApiError('done_task not found', { statusCode: 404 });
  },
};

module.exports = doneTaskController;
