const express = require('express');

const validate = require('../../validation/validator');
const doneTaskCreateSchema = require('../../validation/schemas/doneTaskCreateSchema');

const doneTaskController = require('../../controllers/api/done_task');
const controllerHandler = require('../../helpers/controllerHandler');

const verifyToken = require('../../helpers/verifyToken');

const router = express.Router();

/**
 * TODO ajouter verifyToken partout ou necessaire
 */

router
  .route('/')
/**
  * POST /api/v1/done_tasks
  * @summary POST done_task
  * @tags DoneTask
  * @param {CreateReward} request.body.required - CreateDoneTask
  * @return {DoneTask} 200 - success response - application/json
  //  * @return {ApiError} 400 - Bad request response - application/json
  //  * @return {ApiError} 404 - DoneTask not found - application/json
    */
  .post(validate('body', doneTaskCreateSchema), controllerHandler(doneTaskController.createOne));

router
  .route('/:id(\\d+)')
  /**
    * GET /api/v1/done_tasks/{id}
    * @summary Get one done_task by id
    * @tags DoneTask
    * @param {number} id.path.required - done_task id identifier
    * @return DoneTask} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - DoneTask not found - application/json
     */
  .get(controllerHandler(doneTaskController.findOneByPk));
// .get(verifyToken.InReqAuthorisation, controllerHandler(rewardController.findOneByPk))

module.exports = router;
