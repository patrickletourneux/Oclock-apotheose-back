const express = require('express');

const controller = require('../../controllers/api/ranking');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/:id(\\d+)')
/**
     * GET /api/v1/ranking/{id}
     * @summary Get ranking by home id
     * @tags Ranking
     * @param {number} id.path.required - home id identifier
     * @return {Ranking}} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - dashboard not found - application/json
     */
  .get(controllerHandler(controller.findOneByPk));

module.exports = router;
