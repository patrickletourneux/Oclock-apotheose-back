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
      `select "home".id as home_id,
      to_json(array_agg(distinct home_task)) as home_task,
      to_json(array_agg(distinct "user"))as user
from "home"
left join "user" on  home.id="user".home_id
left join "home_task" on home.id = home_task.home_id
GROUP BY "home".id
having "home".id=$1;`,
      [id],
    );
    debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
};
