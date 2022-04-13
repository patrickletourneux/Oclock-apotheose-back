const express = require('express');

const validate = require('../../validation/validator');
const doneTaskCreateSchema = require('../../validation/schemas/doneTaskCreateSchema');

const doneTaskController = require('../../controllers/api/done_task');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
    * POST /api/v1/done_tasks
    * @summary POST done_task
    * @tags DoneTask
    * @security BearerAuth
    * @param {CreateDoneTask} request.body.required - CreateDoneTask
    * @return {DoneTask} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - DoneTask not found - application/json
    */
  .post(validate('body', doneTaskCreateSchema), controllerHandler(doneTaskController.createOne));

router
  .route('/:id(\\d+)')
  /**
    * DELETE /api/v1/done_tasks/{id}
    * @summary Delete one done_task
    * @tags DoneTask
    * @security BearerAuth
    * @param {number} id.path.required - done_task id identifier
    * @return {boolean} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - done_task not found - application/json
    */
  .delete(controllerHandler(doneTaskController.deleteOneByPk));

module.exports = router;
