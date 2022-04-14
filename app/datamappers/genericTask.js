const debug = require('debug')('generic_task datamapper');
const client = require('../config/db');

const genericTaskDataMapper = {
  /**
       * get all generic task
       * @returns {GenericTasks} - La done_task insérée
       */
  async getAll() {
    debug('dans getAll');
    const result = await client.query(`SELECT * FROM "generic_task";`);
    return result.rows;
  },
};

module.exports = genericTaskDataMapper;
