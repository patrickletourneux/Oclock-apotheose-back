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
     * @param {number} id - L'id de la home
     * @returns {(Dashboard|undefined)} -
     * Le user souhaité ou undefined si aucun user à cet id
     */

  async findAttributedTaskCountByUserId(id) {
    debug('dans findAttributedTaskCountByUserId');
    // query for dashboard
    const result = await client.query(
      `select  count(*) as attributed_task_count from attributed_task
      where to_char(attributed_task.created_at,'YYYY') = to_char(now(),'YYYY')
            AND to_char(attributed_task.created_at,'WW') = to_char(now(),'WW') 
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
      where to_char(done_task.created_at,'YYYY') = to_char(now(),'YYYY')
            AND to_char(done_task.created_at,'WW') = to_char(now(),'WW')
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
