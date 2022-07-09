const debug = require('debug')('mytasks controller');
const userDataMapper = require('../../datamappers/user');
const mytasksDataMapper = require('../../datamappers/mytasks');
const homeDataMapper = require('../../datamappers/home');
const { ApiError } = require('../../helpers/errorHandler');

const myTasksController = {
  async getUserFromBdd(req) {
    const user = await userDataMapper.findOneByPk(req.params.id);
    // debug(user);
    if (!user) {
      debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    return user;
  },
  async getHomeFromBdd(user) {
    const home = await homeDataMapper.findOneByPk(user.home_id);
    if (!home) {
      debug('pas de home trouvé pour cet id');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    delete home.created_at;
    delete home.password;
    return home;
  },
  async getDoneTaskByUserId(user) {
    let doneTasks = await mytasksDataMapper.findDoneTaskByUserId(user.id);
    if (!doneTasks) {
      doneTasks = [];
    }
    return doneTasks;
  },
  async getHomeTaskByHomeId(home) {
    let homeTask = await mytasksDataMapper.findHomeTaskByHomeId(home.id);
    if (!homeTask) {
      homeTask = [];
    }
    return homeTask;
  },
  async getAttributesTaskByUserId(user) {
    let attributedTask = await mytasksDataMapper.findAttributedTaskByUserId(user.id);
    if (!attributedTask) {
      attributedTask = [];
    }
    return attributedTask;
  },
  async findOneByPk(req, res) {
    debug('dans findOneByPk');
    // req.params.id is user.id
    // check if a user exist in dbb for this id, id in req.params.id
    const user = await myTasksController.getUserFromBdd(req);
    const home = await myTasksController.getHomeFromBdd(user);
    const doneTasks = await myTasksController.getDoneTaskByUserId(user);
    const homeTask = await myTasksController.getHomeTaskByHomeId(home);
    let attributedTask = await myTasksController.getAttributesTaskByUserId(user);
    const newTasks = [];
    // if 0 attributed to the user
    if (!attributedTask) {
      attributedTask = [];
      homeTask.home_task.forEach((taskH) => {
        const taskHome = taskH;
        // 0 in front will be interpreted as not attributed
        taskHome.attributedTaskId = 0;
        newTasks.push(taskHome);
      });
    } else {
      homeTask.home_task.forEach((taskH) => {
        const taskHome = taskH;
        const taskAttributed = attributedTask.attributed_task.find((e) => e.home_task_id === taskHome.id);
        if (taskAttributed) {
          taskHome.attributedTaskId = taskAttributed.id;
        } else {
          // 0 in front will be interpreted as not attributed
          taskHome.attributedTaskId = 0;
        }
        newTasks.push(taskHome);
      });
    }
    const obj = {
      home_tasks: newTasks,
      done_tasks: doneTasks,
    };
    return res.status(200).json(obj);
  },
};

module.exports = myTasksController;
