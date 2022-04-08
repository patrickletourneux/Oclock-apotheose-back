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

  async findOneByPk(id) {
    debug('dans findByPk');
    // query for dashboard
    const result = await client.query(
      '',
      [id],
    );
    debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
};
