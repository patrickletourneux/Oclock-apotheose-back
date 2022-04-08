const debug = require('debug')('home_task datamapper');
const client = require('../config/db');

/**
 * @typedef {object} HomeTask
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name - title of the home_task
 * @property {number} value - description for the home_task
 * @property {number} home_id - id of the associate home
 * @property {date} created_at - date of the creation of the home_task
 */
/**
 * @typedef {object} CreateHomeTask
 * @property {string} name - title of the home_task
 * @property {number} value - description for the home_task
 * @property {number} home_id - id of the associate home
 */

const homeTaskDataMapper = {
  /**
     * Ajoute une home_task associé à une maison dans la base de donnée
     * @param {CreateHomeTask} home_task - Les données à insérer
     * @returns {HomeTask} - La home_task insérée
     */
  async insert(homeTask) {
    debug('dans insert');
    const newHomeTask = await client.query(
      `
        INSERT INTO "home_task"
        (name, value, home_id) VALUES
        ($1, $2, $3) RETURNING *
            `,
      [homeTask.name, homeTask.value, homeTask.home_id],
    );

    return newHomeTask.rows[0];
  },

  /**
     * Récupère par son id
     * @param {number} id - L'id de la home_task
     * @returns {(HomeTask|undefined)} -
     * La home_task souhaitée ou undefined si aucune home_task à cet id
     */
  async findOneByPk(id) {
    debug('dans findByPk');
    const result = await client.query('SELECT * FROM "home_task" WHERE id = $1;', [id]);
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
    * TODO delete reward link from home before, if home delete ?
     */
    const result = await client.query('DELETE FROM "home_task" WHERE id = $1', [id]);
    // Soit il a supprimé un enregistrement et
    // le rowcount est égal à 1 (truthy) soit non et il est égal a 0 (falsy)
    // On cast le truthy/falsy en vrai booléen
    return !!result.rowCount;
  },

};

module.exports = homeTaskDataMapper;
