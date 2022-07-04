const debug = require('debug')('mytasks datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Mytasks
 */

module.exports = {
/**
     * Récupère par son id
     * @param {number} id - L'id du user
     * @returns {(Mytasks|undefined)} -
     * Le user souhaité ou undefined si aucun user à cet id
     */

  async findOneByPk(id) {
    debug('dans findByPk');
    // query for my task
    const result = await client.query(
      `select "user".id as user_id,
      to_json(array_agg(distinct home)) as home,
      to_json(array_agg(distinct home_task)) as home_task,
      to_json(array_agg(distinct done_task))as done_task ,
      to_json(array_agg(distinct attributed_task)) as attributed_task
    from "user"
    LEFT JOIN (
    SELECT home.id,home.name ,home.user_id
    FROM "home"
    ) AS "home"
  on "user".home_id=home.id
    LEFT JOIN (
    SELECT home_task.id,home_task.name ,home_task.value,home_task.home_id
    FROM "home_task"
    ) AS "home_task"
  ON home.id = "home_task".home_id 
    LEFT JOIN "attributed_task" AS "attributed_task" ON "user".id = "attributed_task".user_id
    LEFT JOIN done_task on "user".id = done_task.user_id
  LEFT JOIN done_task as done on "user".id = done.user_id 
    where to_char(done_task.created_at,'YYYY') = to_char(now(),'YYYY')
      AND to_char(done_task.created_at,'WW') = to_char(now(),'WW')
      AND to_char(attributed_task.created_at,'YYYY') = to_char(now(),'YYYY')
      AND to_char(attributed_task.created_at,'WW') = to_char(now(),'WW')
      GROUP BY "user".id
    having "user".id=$1;`,
      [id],
    );
    // debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },

  async findHomeTaskByHomeId(id) {
    debug('dans findHomeTaskByHomeId');
    const result = await client.query(
      `select home.id as home_id,
      to_json(array_agg(distinct home_task)) as home_task
      from home
      join home_task on home_task.home_id = home.id
      GROUP BY home.id
      having home.id=$1;`,
      [id],
    );
    if (result.rowCount === 0) {
      return undefined;
    }

    debug(result.rows[0]);
    return result.rows[0];
  },

  async findDoneTaskByUserId(id) {
    debug('dans findDoneTaskByUserId');

    const result = await client.query(
      `select "user".id as user_id,
      to_json(array_agg(distinct done_task))as done_task 
    from "user"
    LEFT JOIN (
    SELECT home.id,home.name ,home.user_id
    FROM "home"
    ) AS "home"
  on "user".home_id=home.id
    LEFT JOIN done_task on "user".id = done_task.user_id
    where to_char(done_task.created_at,'YYYY') = to_char(now(),'YYYY')
      AND to_char(done_task.created_at,'WW') = to_char(now(),'WW')

      GROUP BY "user".id
    having "user".id=$1;`,
      [id],
    );
    if (result.rowCount === 0) {
      // debug(result);
      return undefined;
    }
    debug(result.rows[0]);
    return result.rows[0];
  },
  async findAttributedTaskByUserId(id) {
    debug('dans findAttributedTaskByUserId');

    const result = await client.query(
      `select "user".id as user_id,
      to_json(array_agg(distinct attributed_task))as attributed_task 
    from "user"
    LEFT JOIN (
    SELECT home.id,home.name ,home.user_id
    FROM "home"
    ) AS "home"
  on "user".home_id=home.id
    LEFT JOIN attributed_task on "user".id = attributed_task.user_id
    where to_char(attributed_task.created_at,'YYYY') = to_char(now(),'YYYY')
      AND to_char(attributed_task.created_at,'WW') = to_char(now(),'WW')

      GROUP BY "user".id
    having "user".id=$1;`,
      [id],
    );
    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },

};
