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
     * done_task controller to get a done_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {DoneTask} Route API JSON response
     */
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a done_task exist in dbb with this id in req.params.id
    const doneTask = await doneTaskDataMapper.findOneByPk(req.params.id);
    if (!doneTask) {
      debug('pas de done_task trouvée pour cet id');
      throw new ApiError('done_task not found', { statusCode: 404 });
    } else {
      return res.status(200).json(doneTask);
    }
  },

};

module.exports = doneTaskController;
