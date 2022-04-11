const debug = require('debug')('reward datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Reward
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} title - title of the reward
 * @property {string} description - description for the reward
 * @property {number} home_id - id of the associate home
 */
/**
 * @typedef {object} CreateReward
 * @property {string} title - title of the reward
 * @property {string} description - description for the reward
 * @property {number} home_id - id of the associate home
 */
/**
 * @typedef {object} UpdateReward
 * @property {string} title - title of the reward
 * @property {string} description - description for the reward
 */

const rewardDataMapper = {
  /**
     * Ajoute un reward associé à une maison dans la base de donnée
     * @param {CreateReward} reward - Les données à insérer
     * @returns {Reward} - Le reward insérée
     */
  async insert(reward) {
    debug('dans insert');
    const newReward = await client.query(
      `
        INSERT INTO "reward"
        (title, description, home_id) VALUES
        ($1, $2, $3) RETURNING *
            `,
      [reward.title, reward.description, reward.home_id],
    );

    return newReward.rows[0];
  },

  /**
     * Récupère par son id
     * @param {number} id - L'id du reward
     * @returns {(Reward|undefined)} -
     * Le reward souhaité ou undefined si aucun reward à cet id
     */
  async findOneByPk(id) {
    debug('dans findByPk');
    const result = await client.query('SELECT * FROM "reward" WHERE id = $1;', [id]);
    if (result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
  },
  // find by home id needed for ranking vue
  async findOneByHomeID(id) {
    debug('dans findByHomeId');
    const result = await client.query('SELECT * FROM "reward" WHERE home_id = $1;', [id]);
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
    * TODO delete reward link from home before, if home delete
     */
    const result = await client.query('DELETE FROM "reward" WHERE id = $1', [id]);
    // Soit il a supprimer un enregistrement et
    // le rowcount est égal à 1 (truthy)soit non et il est égal a 0 (falsy)
    // On cast le truthy/falsy en vrai booléen
    return !!result.rowCount;
  },

  /**
     * Modifie dans la base de données
     * @param {number} id - L'id du reward à modifier
     * @param {UpdateReward} reward - Les données à modifier
     * @returns {Reward} - Le reward modifié
     */
  async update(id, rewardInReqBody) {
    debug('dans update');
    const fields = Object.keys(rewardInReqBody).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(rewardInReqBody);

    const savedReward = await client.query(
      `
        UPDATE "reward" SET
          ${fields}
        WHERE id = $${fields.length + 1}
        RETURNING *
            `,
      [...values, id],
    );
    return savedReward.rows[0];
  },
};

module.exports = rewardDataMapper;

// api/v1/rewards/1
