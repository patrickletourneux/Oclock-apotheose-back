const debug = require('debug')('reward datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Reward
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} reward - description for the reward
 * @property {string} title - title of the reward
 * @property {date} created_at - date of the creation of the reward
 * @property {number} home_id - id of the associate home
 */
/**
 * @typedef {object} CreateReward
 * @property {string} title - title of the reward
 * @property {string} reward - description for the reward
 * @property {number} home_id - id of the associate home
 */
/**
 * @typedef {object} UpdateReward
 * @property {string} title - title of the reward
 * @property {string} reward - description for the reward
 */

const rewardDataMapper = {
  /**
     * Ajoute un reward associé à une maison dans la base de donnée
     * @param {CreateReward} reward - Les données à insérer
     * @returns {Reward} - La categorie insérer
     */
  async insert(reward) {
    debug('dans insert');
    const newReward = await client.query(
      `
        INSERT INTO "reward"
        (title, reward, house_id) VALUES
        ($1, $2, $3) RETURNING *
            `,
      [reward.title, reward.reward, reward.house_id],
    );

    return newReward.rows[0];
  },

  /**
     * Modifie dans la base de données
     * @param {number} id - L'id du reward à modifier
     * @param {UpdateReward} reward - Les données à modifier
     * @returns {Reward} - Le reward modifié
     */
  async update(id, title, reward) {
    debug('dans update');
    // const fields = Object.keys(reward).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(reward);

    const savedReward = await client.query(
      `
        UPDATE "reward" SET
        title = new_title ($2),
        reward = new_reward ($3)
        WHERE id = ($1) RETURNING *
            `,
      [...values, id, title, reward],
    );
    return savedReward.rows[0];
  },
};

module.exports = rewardDataMapper;
