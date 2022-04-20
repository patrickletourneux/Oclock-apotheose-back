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
     * @security BearerAuth
     * @param {number} id.path.required - home id identifier
     * @return {Ranking} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - dashboard not found - application/json
     */
  .get(controllerHandler(controller.findOneByPk))
  /**
     * POST /api/v1/ranking/{id}
     * @summary POST ranking by home id, send mail with actual ranking to all users of the home
     * @tags Ranking
     * @security BearerAuth
     * @param {number} id.path.required - home id identifier
     * @return {Ranking} 200 - success response - application/json
    //  * @return {ApiError} 400 - Bad request response - application/json
    //  * @return {ApiError} 404 - dashboard not found - application/json
     */
  .post(controllerHandler(controller.sendMailRankingEndPeriod));

module.exports = router;
