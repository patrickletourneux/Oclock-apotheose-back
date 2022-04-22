const debug = require('debug')('join_home controller');
const homeDatamapper = require('../../datamappers/home');
const userDatamapper = require('../../datamappers/user');
const rankingDatamapper = require('../../datamappers/ranking');
const doneTaskDatamapper = require('../../datamappers/done_task');
const homeTaskDataMapper = require('../../datamappers/home_task');
const rewardDatamapper = require('../../datamappers/reward');

const { ApiError } = require('../../helpers/errorHandler');
const attributedTaskDataMapper = require('../../datamappers/attributed_task');

/**
 * @typedef {object} JoinHome
 * @property {string} home_password - password for the home
 * @property {number} user_id - user_id to join home
 */

module.exports = {
  /**
     * join home
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {boolean} Route API JSON response
     */
  async createOne(req, res) {
    debug('dans createOne');
    debug('req.body ', req.body);
    const home = await homeDatamapper.findOneByPassword(req.body.home_password);
    // check if home exist with the password in req.body
    if (!home) {
    //   debug('pas de home trouvé pour ce password');
      throw new ApiError('home not found', { statusCode: 404 });
    }
    // debug(home);
    // check if user exist with the user_id in req.body
    const user = await userDatamapper.findOneByPk(req.body.user_id);
    if (!user) {
    //   debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    // check if user already in a home
    if (user.home_id !== null) {
    //   debug('user deja dans une maison');
      throw new ApiError('user deja dans une maison', { statusCode: 404 });
    }

    debug(user);
    delete user.id;
    user.home_id = home.id;
    // debug(user);
    const updatedUser = await userDatamapper.update(req.body.user_id, user);
    // debug(updatedUser);
    delete updatedUser.password;
    delete updatedUser.created_at;

    return res.status(200).json(updatedUser);
  },
  async leaveHome(req, res) {
    debug('dans leaveHome');
    /**
     * when a user leave a home we clean the bdd
     */
    const homeIdToLeave = req.params.id;
    const userIdToleave = req.body.user_id;
    const home = await homeDatamapper.findOneByPk(homeIdToLeave);
    if (!home) {
      throw new ApiError('home not found', { statusCode: 404 });
    }
    const homeUsers = await rankingDatamapper.findUsersByHomeID(homeIdToLeave);
    const user = await userDatamapper.findOneByPk(userIdToleave);
    if (!user) {
      //   debug('pas de user trouvé pour cet id');
      throw new ApiError('user not found', { statusCode: 404 });
    }
    if (user.home_id !== home.id) {
      throw new ApiError('user do not belong to the home', { statusCode: 404 });
    }
    if (user.home_id === home.id) {
      debug('delete user data in the home');
      let attibutedTasks = await attributedTaskDataMapper.findAllByUserID(user.id);
      if (!attibutedTasks) {
        attibutedTasks = [];
      }
      debug('attibutedTasks ', attibutedTasks);
      let doneTasks = await doneTaskDatamapper.findAllByUserID(user.id);
      if (!doneTasks) {
        doneTasks = [];
      }
      debug('doneTasks ', doneTasks);
      const toDelete = [];
      attibutedTasks.forEach((e) => {
        const attibutedTaskToDelete = attributedTaskDataMapper.delete(e.id);
        toDelete.push(attibutedTaskToDelete);
      });
      doneTasks.forEach((e) => {
        const doneTaskToDelete = doneTaskDatamapper.delete(e.id);
        toDelete.push(doneTaskToDelete);
      });
      await Promise.all(toDelete);
    }
    if (user.id !== home.user_id) {
      user.home_id = null;
      delete user.id;
      await userDatamapper.update(userIdToleave, user);
      debug('user a quitté la maison');
      res.status(200).json('user a quitté la maison');
    } else if (user.id === home.user_id && homeUsers.length > 1) {
      debug(`if the user is the creator of the home and not the last user of the home, change the creator to another user
      then  delete all data linked to the user in the home attributed_task, done_task in the home `);
      const newCreator = homeUsers.find((e) => e.id !== user.id);
      home.user_id = newCreator.id;
      delete home.id;
      await homeDatamapper.update(homeIdToLeave, home);
      user.home_id = null;
      delete user.id;
      await userDatamapper.update(userIdToleave, user);
      res.status(200).json('user a quitté la maison');
    } else if (user.id === home.user_id && homeUsers.length === 1) {
      debug('if the user is the creator of the home and is the last user of the home, delete the home');
      const toDelete = [];
      let homeTasks = await homeTaskDataMapper.findAllByHomeId(home.id);
      if (!homeTasks) {
        homeTasks = [];
      }
      homeTasks.forEach((e) => {
        const homeTaskToDelete = homeTaskDataMapper.delete(e.id);
        toDelete.push(homeTaskToDelete);
      });
      await Promise.all(toDelete);
      const reward = await rewardDatamapper.findOneByHomeId(home.id);
      if (reward) {
        await rewardDatamapper.delete(reward.id);
      }
      user.home_id = null;
      delete user.id;
      await userDatamapper.update(userIdToleave, user);
      await homeDatamapper.delete(home.id);
      debug('user a quitté la maison et la maison a été détruite');
      res.status(200).json('user a quitté la maison et la maison a été détruite');
    }
  },
};
