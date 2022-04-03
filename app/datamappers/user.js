const debug = require('debug')('user datamapper');
const client = require('../config/db');

/**
 * @typedef {object} User
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} pseudonym - pseudonym for the user
 * @property {string} password - password for the user acount
 * @property {string} avatar_img - filename of the avatar image
 * @property {string} house_id - id of the house of the user
 * @property {date} created_at - date of the creation of the user
 */

/**
 * @typedef {object} InputUser
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} pseudonym - pseudonym for the user
 * @property {string} password - password for the user acount
 */

module.exports = {
  /**
     * Récupère user par son email
     * @param {string} email - email du user
     * @returns {(User|undefined)} -
     * Le user souhaité ou undefined si aucun user à cet email
     */
  async findOneByEmail(email) {
    debug('dans findOneByEmail');
    const result = await client.query('SELECT * FROM "user" WHERE email = $1;', [email]);
    debug(result.rows);
    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
  /**
     * Récupère par sont id
     * @param {number} id - L'id du user
     * @returns {(User|undefined)} -
     * Le user souhaité ou undefined si aucun user à cet id
     */
  async findByPk(id) {
    debug('dans findByPk');
    const result = await client.query('SELECT * FROM "user" WHERE id = $1;', [id]);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },

  /**
     * Ajoute dans la base de données
     * @param {InputUser} user - Les données à insérer
     * @returns {User} - La categorie insérer
     */
  async insert(user) {
    debug('dans insert');
    const savedUser = await client.query(
      `
                INSERT INTO "user"
                (email, password, pseudonym) VALUES
                ($1, $2, $3) RETURNING *
            `,
      [user.email, user.password, user.pseudonym],
    );

    return savedUser.rows[0];
  },
  /** TO DO la suite
     *
    */
  /**
     * Modifie dans la base de données
     * @param {number} id - L'id à modifier
     * @param {User} user - Les données à modifier
     * @returns {User} - Le user modifié
     */
  async update(id, category) {
    const fields = Object.keys(category).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(category);

    const savedCategory = await client.query(
      `
                UPDATE category SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
      [...values, id],
    );

    return savedCategory.rows[0];
  },

  /**
     * Supprime de la base de données
     * @param {number} id - L'id à supprimer
     * @returns {boolean} - Le résultat de la suppression
     */
  async delete(id) {
    const result = await client.query('DELETE FROM category WHERE id = $1', [id]);
    // Soit il a supprimer un enregistrement et
    // le rowcount est égal à 1 (truthy)soit non et il est égal a 0 (falsy)
    // On cast le truthy/falsy en vrai booléen
    return !!result.rowCount;
  },
};
