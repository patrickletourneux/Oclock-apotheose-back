const express = require('express');

const validate = require('../../validation/validator');
const homeTaskCreateSchema = require('../../validation/schemas/homeTaskCreateSchema');

const homeTaskController = require('../../controllers/api/home_task');
const controllerHandler = require('../../helpers/controllerHandler');

const verifyToken = require('../../helpers/verifyToken');

const router = express.Router();

/**
 * TODO ajouter verifyToken partout ou necessaire
 */

router
  .route('/')
/**
  * POST /api/v1/home_tasks
  * @summary POST home_task
  * @tags HomeTask
  * @param {CreateHomeTask} request.body.required - CreateHomeTask
  * @return {HomeTask} 200 - success response - application/json
  //  * @return {ApiError} 400 - Bad request response - application/json
  //  * @return {ApiError} 404 - Category not found - application/json
    */
  .post(validate('body', homeTaskCreateSchema), controllerHandler(homeTaskController.createOne));

router
  .route('/:id(\\d+)')
  /**
    * GET /api/v1/home_tasks/{id}
    * @summary Get one home_task by id
    * @tags HomeTask
    * @param {number} id.path.required - home_task id identifier
    * @return {HomeTask} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Home_task not found - application/json
     */
  .get(controllerHandler(homeTaskController.findOneByPk))
  // .get(verifyToken.InReqAuthorisation, controllerHandler(homeTaskController.findOneByPk))

  /**
    * DELETE /api/v1/home_tasks/{id}
    * @summary Delete one home_task
    * @tags HomeTask
    * @param {number} id.path.required - home_task id identifier
    * @return {boolean} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - home_task not found - application/json
    */
  // .delete(controllerHandler(homeTaskController.delete));
  .delete(controllerHandler(homeTaskController.deleteOneByPk));

module.exports = router;
