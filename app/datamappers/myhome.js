const debug = require('debug')('myhome datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Myhome
 */

module.exports = {
/**
     * Récupère par son id
     * @param {number} id - L'id home
     * @returns {(Myhome|undefined)} -
     * La Home souhaité ou undefined si aucun home à cet id
     */

  async findOneByPk(id) {
    debug('dans findByPk');
    // query for my home
    const result = await client.query(
      `SELECT "home".id AS id, "home".name,"home".password,
      to_json(array_agg(distinct home_task)) as home_tasks,
      to_json(array_agg(distinct "user")) as "users"
      FROM "home"

    LEFT JOIN (
    SELECT "user".id,"user".pseudonym ,"user".home_id,"user".avatar_img
    FROM "user"
    ) AS "user"
      ON  home.id = "user".home_id

      LEFT JOIN (
    SELECT home_task.id,home_task.name ,home_task.value,home_task.home_id
    FROM "home_task"
    ) AS "home_task"
    ON home.id = "home_task".home_id

      GROUP BY "home".id
    HAVING "home".id=$1;`,
      [id],
    );
    // debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
};
