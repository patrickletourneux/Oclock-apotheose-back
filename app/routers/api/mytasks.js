const express = require('express');

const controller = require('../../controllers/api/mytasks');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/:id(\\d+)')
/**
     * GET /api/v1/mytasks/{id}
     * @summary Get mytasks by user id
     * @tags mytasks
     * @param {number} id.path.required - user id identifier
     * @return {Mytasks}} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - dashboard not found - application/json
     */
  .get(controllerHandler(controller.findOneByPk));

module.exports = router;
