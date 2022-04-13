const express = require('express');

const validate = require('../../validation/validator');
const invitationSchema = require('../../validation/schemas/invitationSchema');

const controller = require('../../controllers/api/invitation');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
/**
         * POST /api/v1/invitation
         * @summary POST invitation
         * @tags Invitation
         * @security BearerAuth
         * @param {Invitation} request.body.required - invitation
         * @return {boolean} 200 - success response - application/json
        //  * @return {ApiError} 400 - Bad request response - application/json
        //  * @return {ApiError} 404 - Category not found - application/json
         */
  .post(validate('body', invitationSchema), controllerHandler(controller.createOne));

module.exports = router;
