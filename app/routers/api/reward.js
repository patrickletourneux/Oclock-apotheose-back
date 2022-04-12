const express = require('express');

const validate = require('../../validation/validator');
const rewardCreateSchema = require('../../validation/schemas/rewardCreateSchema');
const rewardUpdateSchema = require('../../validation/schemas/rewardUpdateSchema');

const rewardController = require('../../controllers/api/reward');
const controllerHandler = require('../../helpers/controllerHandler');

const verifyToken = require('../../helpers/verifyToken');

const router = express.Router();

/**
 * TODO ajouter verifyToken partout ou necessaire
 */

router
  .route('/')
/**
  * POST /api/v1/rewards
  * @summary POST reward
  * @tags Reward
  * @security BearerAuth
  * @param {CreateReward} request.body.required - CreateReward
  * @return {Reward} 200 - success response - application/json
  //  * @return {ApiError} 400 - Bad request response - application/json
  //  * @return {ApiError} 404 - Category not found - application/json
    */
  .post(validate('body', rewardCreateSchema), controllerHandler(rewardController.createOne));

router
  .route('/:id(\\d+)')
  /**
    * GET /api/v1/rewards/{id}
    * @summary Get one reward by id
    * @tags Reward
    * @security BearerAuth
    * @param {number} id.path.required - reward id identifier
    * @return {Reward} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Reward not found - application/json
     */
  .get(controllerHandler(rewardController.findOneByPk))
  // .get(verifyToken.InReqAuthorisation, controllerHandler(rewardController.findOneByPk))

  /**
    * PATCH /api/v1/rewards/{id}
    * @summary Update one reward
    * @tags Reward
    * @security BearerAuth
    * @param {number} id.path.required -  UpdateReward
    * @param {UpdateReward} request.body.required - reward info
    * @return {User} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Reward not found - application/json
     */
  .patch(validate('body', rewardUpdateSchema), controllerHandler(rewardController.update))

  /**
    * DELETE /api/v1/rewards/{id}
    * @summary Delete one reward
    * @tags Reward
    * @security BearerAuth
    * @param {number} id.path.required - reward id identifier
    * @return {boolean} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Reward not found - application/json
    */
  // .delete(controllerHandler(rewardController.delete));
  .delete(controllerHandler(rewardController.deleteOneByPk));

module.exports = router;
