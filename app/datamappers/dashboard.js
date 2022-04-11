const debug = require('debug')('dashboard datamapper');
const client = require('../config/db');

/**
 * NOT USED
 */
/**
 * @typedef {object} Dashboard
 */

module.exports = {
/**
     * Récupère par son id
     * @param {number} id - L'id du user
     * @returns {(Dashboard|undefined)} -
     * Le user souhaité ou undefined si aucun user à cet id
     */

  async findAttributedTaskCountByUserId(id) {
    debug('dans findAttributedTaskCountByUserId');
    // query for dashboard
    const result = await client.query(
      `select  count(*) as attributed_task_count from attributed_task 
    group by attributed_task.user_id 
    having attributed_task.user_id =$1;`,
      [id],
    );
    debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
  async findDoneTaskCountByUserId(id) {
    debug('dans findDoneTaskCountByUserId');
    // query for dashboard
    const result = await client.query(
      `select  count(*) as done_task_count from done_task 
      group by done_task.user_id 
      having done_task.user_id =$1;`,
      [id],
    );
    debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
  },
};
