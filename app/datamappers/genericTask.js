const debug = require('debug')('generic_task datamapper');
const client = require('../config/db');

/**
 * @typedef {object} GenericTasks
 */

const genericTaskDataMapper = {
  /**
       * get all generic task
       * @returns {GenericTasks} -
       * TODO pour swagger
       */
  async getAll() {
    debug('dans getAll');
    const result = await client.query('SELECT * FROM "generic_task";');
    return result.rows;
  },
};

module.exports = genericTaskDataMapper;
