const express = require('express');

const genericTaskController = require('../../controllers/api/generic_task');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
    * GET /api/v1/generic_tasks
    * @summary GET generic_task
    * @tags GenericTask
    * @security BearerAuth
    * @return {GenericTasks} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - DoneTask not found - application/json
    */
  .get(controllerHandler(genericTaskController.getAll));

module.exports = router;
