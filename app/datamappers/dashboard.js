const debug = require('debug')('dashboard datamapper');
const client = require('../config/db');

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

  async findOneByPk(id) {
    debug('dans findByPk');
    // query for my task 
    const result = await client.query(
      `select "user".id as user_id,
      to_json(array_agg(distinct home)) as home,
      to_json(array_agg(distinct home_task)) as home_tasks,
      to_json(array_agg(distinct done_task))as done_tasks ,
      to_json(array_agg(distinct attributed_task)) as attributed_tasks, 
      to_json(array_agg(distinct reward))as rewards
from "user"
left join "home" on "user".id=home.user_id
left join "home_task" on home.id = home_task.home_id
left join "attributed_task" on home_task.id = attributed_task.home_task_id
left join "reward" on home.id = reward.home_id
left join "done_task" on "user".id = done_task.user_id
where to_char(done_task.created_at,'YYYY') = to_char(now(),'YYYY')
      AND to_char(done_task.created_at,'WW') = to_char(now(),'WW')
      AND to_char(attributed_task.created_at,'YYYY') = to_char(now(),'YYYY')
      AND to_char(attributed_task.created_at,'WW') = to_char(now(),'WW')
GROUP BY "user".id
having "user".id=$1;`,
      [id],
    );
    debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
};
