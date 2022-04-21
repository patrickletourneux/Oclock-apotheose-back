const debug = require('debug')('generic_task controller');
const genericTaskDataMapper = require('../../datamappers/genericTask');

const genericTaskController = {
  /**
     * generic_task controller to getall.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {GenericTask} Route API JSON response
     */
  async getAll(req, res) {
    debug('dans getAll');
    const genericTask = await genericTaskDataMapper.getAll();
    genericTask.forEach((element) => { delete element.created_at; });
    return res.status(200).json(genericTask);
  },
};

module.exports = genericTaskController;
