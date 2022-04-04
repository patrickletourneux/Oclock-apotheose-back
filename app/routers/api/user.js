const express = require('express');

// const validate = require('../../validation/validator');
// const createSchema = require('../../validation/schemas/categoryCreateSchema');
// const updateSchema = require('../../validation/schemas/categoryUpdateSchema');

const userController = require('../../controllers/api/user');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
/**
     * POST /api/v1/users
     * @summary Create a user
     * @tags User
     * @param {User} request.body.required - user info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Category not found - application/json
     */
// .post(validate('body', createSchema), controllerHandler(userController.create));
  .post(controllerHandler(userController.createOne));

router
  .route('/:id(\\d+)')
/**
     * GET /api/users/{id}
     * @summary Get one user by id
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
  .get(controllerHandler(userController.findOneByPk))
/**
     * PATCH /api/users/{id}
     * @summary Update one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @param {User} request.body.required - user info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
// .patch(validate('body', updateSchema), controllerHandler(userController.update))
// .patch(userController.update)
/**
     * DELETE /api/users/{id}
     * @summary Delete one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {boolean} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
// .delete(controllerHandler(userController.delete));
// .delete(userController.delete);

module.exports = router;
