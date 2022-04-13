const debug = require('debug')('done_task datamapper');
const client = require('../config/db');

/**
 * @typedef {object} DoneTask
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name - title of the home_task
 * @property {number} value - description for the home_task
 * @property {number} home_id - id of the associate home
 * @property {number} user_id - id of the associate user
 * @property {date} created_at - date of the creation of the done_task
 */
/**
 * @typedef {object} CreateDoneTask
 * @property {string} name - title of the home_task
 * @property {number} value - description for the home_task
 * @property {number} home_id - id of the associate home
 * @property {number} user_id - id of the associate user
 */

const doneTaskDataMapper = {
  /**
     * Ajoute une done_task associé à une maison et à un user dans la base de donnée
     * @param {CreateDoneTask} done_task - Les données à insérer
     * @returns {DoneTask} - La done_task insérée
     */
  async insert(doneTask) {
    debug('dans insert');
    const newDoneTask = await client.query(
      `
        INSERT INTO "done_task"
        (name, value, home_id, user_id) VALUES
        ($1, $2, $3, $4) RETURNING *
            `,
      [doneTask.name, doneTask.value, doneTask.home_id, doneTask.user_id],
    );

    return newDoneTask.rows[0];
  },

  /**
     * Récupère par son id
     * @param {number} id - L'id de la done_task
     * @returns {(DoneTask|undefined)} -
     * La done_task souhaitée ou undefined si aucune done_task à cet id
     */
  async findOneByPk(id) {
    debug('dans findByPk');
    const result = await client.query('SELECT * FROM "done_task" WHERE id = $1;', [id]);
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
    const result = await client.query('DELETE FROM "done_task" WHERE id = $1', [id]);
    // Soit il a supprimé un enregistrement et
    // le rowcount est égal à 1 (truthy) soit non et il est égal a 0 (falsy)
    // On cast le truthy/falsy en vrai booléen
    return !!result.rowCount;
  },

};

module.exports = doneTaskDataMapper;
