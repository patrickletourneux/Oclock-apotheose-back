const debug = require('debug')('mytasks controller');
const userDataMapper = require('../../datamappers/user');
const mytasksDataMapper = require('../../datamappers/mytasks');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // check if a user exist in dbb for this id, id in req.params.id
    const user = await userDataMapper.findOneByPk(req.params.id);
    // debug(user);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    const mytasks = await mytasksDataMapper.findOneByPk(req.params.id);
    const newTasks = [];

    mytasks.home_task.forEach((taskH) => {
      const taskHome = taskH;
      const taskAttributed = mytasks.attributed_task.find((e) => e.id === taskHome.id);
      if (taskAttributed) {
        taskHome.attributed = true;
      } else {
        taskHome.attributed = false;
      }
      newTasks.push(taskHome);
    });
    const obj = {
      // home_tasks: mytasks.home_task,
      // attributed_tasks: mytasks.attributed_task,
      home_tasks: newTasks,
      done_tasks: mytasks.done_task,
    };

    return res.status(200).json(obj);
  },
};
