import {logger, https} from "firebase-functions/v1";
import admin from '../firebase.admin';

/**
 * @param {string} id - Query parameter, id of user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Record<string, any>>}
 */
exports.getUserById = https.onRequest(async (req, res) => {
  logger.log('getUserById');

  try {
    const { id } = req.query;

    const user = await admin.firestore().collection('users').doc(id).get();

    if (!user) {
      res.status(404).json('User not found');
    }

    res.json(user);
  } catch (error) {
    logger.error(error);
  }
});

/**
 * @param {Record<string, any>} body - Query parameter, insert/update body
 * @param {string} body.id - Id of user. If user with such id exists it will be updated, otherwise - updated
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Record<string, any>>}
 */
exports.updateUser = https.onRequest(async (req, res) => {
  logger.log('updateUser');

  try {
    const { body } = req;

    const user = await admin.firestore().collection('users').doc(body.id).set(body);

    res.json(user);
  } catch (error) {
    logger.error(error);
  }
});
