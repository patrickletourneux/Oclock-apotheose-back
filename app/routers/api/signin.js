const express = require('express');

const validate = require('../../validation/validator');
const userSigninSchema = require('../../validation/schemas/userSigninSchema');

const controller = require('../../controllers/api/user');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
/**
     * POST /api/v1/signin
     * @summary POST user email/password
     * @tags User
     * @param {SigninUser} request.body.required - user info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Category not found - application/json
     */
  .post(validate('body', userSigninSchema), controllerHandler(controller.findOneByEmail));

module.exports = router;
