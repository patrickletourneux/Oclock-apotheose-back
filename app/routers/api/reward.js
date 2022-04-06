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
  .route('/');
  /**
    * POST /api/v1/rewards
    * @summary POST reward
    * @tags Reward
    * @param {CreateReward} request.body.required - CreateReward
    * @return {Reward} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Category not found - application/json
    */
    .post(validate('body', rewardCreateSchema), controllerHandler(controller.createOne));

module.exports = router;
