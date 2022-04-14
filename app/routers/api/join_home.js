const express = require('express');

const validate = require('../../validation/validator');
const joinHomeCreateSchema = require('../../validation/schemas/joinHomeCreateSchema');

const joinHomeController = require('../../controllers/api/join_home');
const controllerHandler = require('../../helpers/controllerHandler');
const findHomePassword = require('../../validation/schemas/findHomePassword');

const router = express.Router();

router
  .route('/')
/**
     * POST /api/v1/join_home
     * @summary POST join_home
     * @tags JoinHome
     * @security BearerAuth
     * @param {JoinHome} request.body.required - Route pour rejoindre une maison
     * @return {TheJoinHome} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Category not found - application/json
     */
  // .post(validate('body', joinHomeCreateSchema), controllerHandler(joinHomeController.update));
  .post(validate('body', findHomePassword), controllerHandler(joinHomeController.findOnePassword));

module.exports = router;
