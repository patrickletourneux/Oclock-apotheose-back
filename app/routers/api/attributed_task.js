const express = require('express');

const validate = require('../../validation/validator');
const attributedTaskCreateSchema = require('../../validation/schemas/attributedTaskCreateSchema');

const attributedTaskController = require('../../controllers/api/attributed_task');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
    * POST /api/v1/attributed_tasks
    * @summary POST attributed_task
    * @tags AttributedTask
    * @security BearerAuth
    * @param {CreateAttributedTask} request.body.required - CreateAttributedTask
    * @return {AttributedTask} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - AttributedTask not found - application/json
    */
  .post(validate('body', attributedTaskCreateSchema), controllerHandler(attributedTaskController.createOne));

router
  .route('/:id(\\d+)')
  /**
    * DELETE /api/v1/attributed_tasks/{id}
    * @summary Delete one attributed_task
    * @tags AttributedTask
    * @security BearerAuth
    * @param {number} id.path.required - attributed_task id identifier
    * @return {boolean} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - attributed_task not found - application/json
    */
  .delete(controllerHandler(attributedTaskController.deleteOneByPk));

module.exports = router;
