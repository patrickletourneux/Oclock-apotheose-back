const debug = require('debug')('attributed_task controller');
const attributedTaskDataMapper = require('../../datamappers/attributed_task');
const { ApiError } = require('../../helpers/errorHandler');

const attributedTaskController = {
  /**
     * attributed_task controller to post a new attributed_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {AttributedTask} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    const newAttributedTask = await attributedTaskDataMapper.insert(req.body);
    delete newAttributedTask.created_at;
    return res.status(200).json(newAttributedTask);
  },

  /**
     * attributed_task controller to delete a attributed_task.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {AttributedTask} Route API JSON response
     */
  async deleteOneByPk(req, res) {
    debug('dans deleteOneByPk');
    // check if a done_task exist in dbb for this id in req.params.id
    const attributedTask = await attributedTaskDataMapper.findOneByPk(req.params.id);
    if (attributedTask) {
      debug('attributedTask:', attributedTask.id, ' a effacer de la bdd');
      // delete the attributed_task in dbb
      const result = await attributedTaskDataMapper.delete(req.params.id);
      debug('result ', result);
      if (result) {
        return res.status(200).json('attributed_task supprimé de la bdd');
      }
      throw new ApiError('erreur lors de la suppression de la attributed_task', { statusCode: 400 });
    }
    throw new ApiError('attributed_task not found', { statusCode: 404 });
  },
};

module.exports = attributedTaskController;
