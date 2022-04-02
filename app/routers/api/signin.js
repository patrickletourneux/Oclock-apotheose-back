const express = require('express');
const debug = require('debug')('routers:signin');

// const validate = require('../../validation/validator');
// const createSchema = require('../../validation/schemas/categoryCreateSchema');
// const updateSchema = require('../../validation/schemas/categoryUpdateSchema');

const controller = require('../../controllers/api/user');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * POST /api/v1/signin
     * @summary POST user email/password
     * @tags User
     * @param {InputUser} request.body.required - category info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Category not found - application/json
     */
    .post(controllerHandler(controller.findOneByEmail))
   

module.exports = router;
