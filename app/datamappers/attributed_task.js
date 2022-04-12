const debug = require('debug')('attributed_task datamapper');
const client = require('../config/db');

/**
 * @typedef {object} AttributedTask
 * @property {number} id - Identifiant unique Pk de la table
 * @property {number} user_id - id of the associate user
 * @property {number} home_task_id - id of the associate home_task
 */
/**
 * @typedef {object} CreateAttributedTask
 * @property {number} user_id - id of the associate user
 * @property {number} home_task_id - id of the associate home_task
 */

const attributedTaskDataMapper = {
  /**
     * Ajoute une attributed_task associé à une maison et à un user dans la base de donnée
     * @param {CreateAttributedTask} attributed_task - Les données à insérer
     * @returns {AttributedTask} - La attributed_task insérée
     */
  async insert(attributedTask) {
    debug('dans insert');
    const newattributedTask = await client.query(
      `
        INSERT INTO "attributed_task"
        (user_id, home_task_id) VALUES
        ($1, $2) RETURNING *
            `,
      [attributedTask.user_id, attributedTask.home_task_id],
    );

    return newattributedTask.rows[0];
  },

  /**
     * Récupère par son id
     * @param {number} id - L'id de la attributed_task
     * @returns {(AttributedTask|undefined)} -
     * La attributed_task souhaitée ou undefined si aucune attributed_task à cet id
     */
  async findOneByPk(id) {
    debug('dans findByPk');
    const result = await client.query('SELECT * FROM "attributed_task" WHERE id = $1;', [id]);
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
    const result = await client.query('DELETE FROM "attributed_task" WHERE id = $1', [id]);
    // Soit il a supprimé un enregistrement et
    // le rowcount est égal à 1 (truthy) soit non et il est égal a 0 (falsy)
    // On cast le truthy/falsy en vrai booléen
    return !!result.rowCount;
  },

};

module.exports = attributedTaskDataMapper;
