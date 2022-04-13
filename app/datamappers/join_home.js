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
  async update(user) {
    debug('dans update');
    const newJoinHome = await client.query(
      `
        UPDATE "user" 
        SET (home_id, home_password, user_id) VALUES
        ($1, $2, $3) RETURNING home_id
        WHERE user_id = $3
            `,
      [user.home_id],
    );

    return newJoinHome.rows[0];
  },
};

module.exports = joinHomeDataMapper;

/* UPDATE "user"
        (home_id, home_password, user_id) VALUES
        ($1, $2, $3) RETURNING home_id

        OU

    async insert(user) {
      debug('dans update');
      const newJoinHome = await client.query(
        `
          UPDATE "user"
          SET home_id WHERE user_id = $1
          RETURNING home_id
              `,
        [user.home_id],
      );
      return newJoinHome.rows[0];
    }, */
