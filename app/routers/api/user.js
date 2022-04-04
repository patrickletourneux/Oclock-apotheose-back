const express = require('express');

const validate = require('../../validation/validator');
const userCreateSchema = require('../../validation/schemas/userCreateSchema');
const userUpdateSchema = require('../../validation/schemas/userUpdateSchema');

const userController = require('../../controllers/api/user');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
/**
     * POST /api/v1/users
     * @summary Create a user
     * @tags User
     * @param {CreateUser} request.body.required - CreateUser
     * @return {User} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
  .post(validate('body', userCreateSchema), controllerHandler(userController.createOne));
// .post(controllerHandler(userController.createOne));

router
  .route('/:id(\\d+)')
/**
     * GET /api/v1/users/{id}
     * @summary Get one user by id
     * @tags User
     * @param {number} id.path.required - user id identifier
     * @return {User} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
  .get(controllerHandler(userController.findOneByPk))
/**
     * PATCH /api/v1/users/{id}
     * @summary Update one user
     * @tags User
     * @param {number} id.path.required -  UpdateUser
     * @param {UpdateUser} request.body.required - user info
     * @return {User} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
// .patch(validate('body', updateSchema), controllerHandler(userController.update))
  .patch(validate('body', userUpdateSchema), controllerHandler(userController.update))
  /**
     * DELETE /api/v1/users/{id}
     * @summary Delete one user
     * @tags User
     * @param {number} id.path.required - user id identifier
     * @return {boolean} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - User not found - application/json
     */
  // .delete(controllerHandler(userController.delete));
  .delete(controllerHandler(userController.deleteOneByPk));

module.exports = router;
