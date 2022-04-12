const debug = require('debug')('join_home datamapper');
const client = require('../config/db');

/**
 * @typedef {objet} JoinHome
 * @property {number} home_id - the id of teh associate home
 * @property {string} home_password - the home password
 * @property {number} user_id - id of the user
 */

/**
 * @typedef {object} TheJoinHome
 * @property {number} home_id - the id of teh associate home
 */
const joinHomeDataMapper = {
  /**
    * Ajoute un reward associé à une maison dans la base de donnée
    * @param {RouteJoinHome} la route de join_home - Les données à insérer
    * @returns {TheJoinHome} - La home à rejoindre
    */
  async insert(user) {
    debug('dans insert');
    const newJoinHome = await client.query(
      `
        INSERT INTO "user"
        (home_id) VALUES
        ($1) RETURNING *
            `,
      [user.home_id],
    );

    return newJoinHome.rows[0];
  },
};

module.exports = joinHomeDataMapper;
