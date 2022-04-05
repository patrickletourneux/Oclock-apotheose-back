const debug = require('debug')('home datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Home
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name - name for the home
 * @property {string} password - password for the home
 * @property {number} user_id - creator user_id
 * @property {number} max_user- maximum number of users
 * @property {date} created_at - date of the creation of the user
 */

/**
 * @typedef {object} CreateHome
 * @property {string} name - name for the home
 * @property {number} user_id - creator user_id
 */

module.exports = {
  /**
     * Ajoute une maison à la base de donnée
     * @param {CreateHome} home - Les données à insérer
     * @returns {Home} - La categorie insérer
     */
  async insert(home) {
    debug('dans insert');
    const savedUser = await client.query(
      `
                INSERT INTO "home"
                (name, user_id) VALUES
                ($1, $2) RETURNING *
            `,
      [home.name, home.user_id],
    );

    return savedUser.rows[0];
  },
}