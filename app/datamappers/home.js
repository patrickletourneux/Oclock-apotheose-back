const debug = require('debug')('home datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Home
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name - name for the home
 * @property {string} password - password for the home
 * @property {number} user_id - creator home_id
 * @property {date} created_at - date of the creation of the home
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
    debug('dans findByPk');
    const result = await client.query('SELECT * FROM "home" WHERE id = $1;', [id]);
    if (result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
  },
  /**
     * Supprime de la base de données
     * @param {number} id - L'id à supprimer
     * @returns {boolean} - Le résultat de la suppression
     */
  async delete(id) {
    debug('dans delete');
    /**
    * TODO delete home task link to home before
     */
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
