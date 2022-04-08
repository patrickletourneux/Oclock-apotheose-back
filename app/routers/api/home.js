const express = require('express');

const validate = require('../../validation/validator');
const homeCreateSchema = require('../../validation/schemas/homeCreateSchema');
const homeUpdateSchema = require('../../validation/schemas/homeUpdateSchema');

const controller = require('../../controllers/api/home');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
/**
     * POST /api/v1/homes
     * @summary POST home
     * @tags Home
     * @param {CreateHome} request.body.required - SigninUser
     * @return {Home} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - Category not found - application/json
     */
  .post(validate('body', homeCreateSchema), controllerHandler(controller.createOne));

router
  .route('/:id(\\d+)')
/**
     * GET /api/v1/homes/{id}
     * @summary Get one home by id
     * @tags Home
     * @param {number} id.path.required - user id identifier
     * @return {Home} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
  .get(controllerHandler(controller.findOneByPk))
  // .get(verifyToken.InReqAuthorisation, controllerHandler(controller.findOneByPk))
/**
     * PATCH /api/v1/homes/{id}
     * @summary Update one home
     * @tags Home
     * @param {number} id.path.required -  UpdateHome
     * @param {UpdateHome} request.body.required - home info
     * @return {User} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
  .patch(validate('body', homeUpdateSchema), controllerHandler(controller.update))

  /**
     * DELETE /api/v1/homes/{id}
     * @summary Delete one home
     * @tags Home
     * @param {number} id.path.required - user id identifier
     * @return {boolean} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
  // .delete(controllerHandler(userController.delete));
  .delete(controllerHandler(controller.deleteOneByPk));

module.exports = router;
