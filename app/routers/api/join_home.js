const express = require('express');

const validate = require('../../validation/validator');
const joinHomeSchema = require('../../validation/schemas/joinHomeSchema');

const controller = require('../../controllers/api/join_home');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
/**
         * POST /api/v1/join_home
         * @summary POST join_home
         * @tags joinHome
         * @security BearerAuth
         * @param {JoinHome} request.body.required - joinHome
         * @return {boolean} 200 - success response - application/json
        //  * @return {ApiError} 400 - Bad request response - application/json
        //  * @return {ApiError} 404 - Category not found - application/json
         */
  .post(validate('body', joinHomeSchema), controllerHandler(controller.createOne));

module.exports = router;
