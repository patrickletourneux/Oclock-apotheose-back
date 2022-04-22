const debug = require('debug')('home datamapper');
const client = require('../config/db');

/**
 * @typedef {object} JoinHome
 * @property {string} home_password - password for the home
 * @property {number} user_id - user_id to join home
 */

/**
 * @typedef {object} Invitation
 * @property {number} home_id - Identifiant unique Pk de la home
 * @property {string} email - email to send invitation
 */

/**
 * @typedef {object} Home
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name - name for the home
 * @property {string} password - password for the home
 * @property {number} user_id - creator home_id
 */

/**
 * @typedef {object} CreateHome
 * @property {string} name - name for the home
 * @property {number} user_id - creator user_id
 */
/**
 * @typedef {object} UpdateHome
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
    const savedHome = await client.query(
      `
                INSERT INTO "home"
                (name, user_id) VALUES
                ($1, $2) RETURNING *
            `,
      [home.name, home.user_id],
    );

    return savedHome.rows[0];
  },
  /**
     * Récupère par son id
     * @param {number} id - L'id du home
     * @returns {(Home|undefined)} -
     * Le home souhaité ou undefined si aucun home à cet id
     */
  async findOneByPk(id) {
    debug('dans findOneByPk');
    const result = await client.query('SELECT * FROM "home" WHERE id = $1;', [id]);
    if (result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
  },
  /**
     * Récupère par son password
     * @param {string} password - password de la home
     * @returns {(Home|undefined)} -
     * Le home souhaité ou undefined si aucun home à cet id
     */
  async findOneByPassword(password) {
    debug('dans findOneByPassword');
    const result = await client.query('SELECT * FROM "home" WHERE password = $1;', [password]);
    if (result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
  },
  async findAll() {
    debug('dans findAll');
    const result = await client.query('SELECT home.id FROM "home" ;');
    if (result.rowCount === 0) {
      return undefined;
    }
    return result.rows;
  },
  /**
     * Supprime de la base de données
     * @param {number} id - L'id à supprimer
     * @returns {boolean} - Le résultat de la suppression
     */
  async delete(id) {
    debug('dans delete');
    const result = await client.query('DELETE FROM "home" WHERE id = $1', [id]);
    // Soit il a supprimer un enregistrement et
    // le rowcount est égal à 1 (truthy)soit non et il est égal a 0 (falsy)
    // On cast le truthy/falsy en vrai booléen
    return !!result.rowCount;
  },
  /**
     * Modifie dans la base de données
     * @param {number} id - L'id à modifier
     * @param {UpdateHome} home - Les données à modifier
     * @returns {Home} - Le home modifié
     */
  async update(id, homeInReqBody) {
    debug('dans update');
    const fields = Object.keys(homeInReqBody).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(homeInReqBody);

    const savedHome = await client.query(
      `
                UPDATE "home" SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
      [...values, id],
    );
    return savedHome.rows[0];
  },
};
