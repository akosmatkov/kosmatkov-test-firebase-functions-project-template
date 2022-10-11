import {logger, https} from "firebase-functions/v1";
import admin from '../firebase.admin';

/**
 * @param {string} req.query.id - Id of user, query parameter,
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<User>}
 */
exports.getUserById = https.onRequest(async (req, res) => {
  logger.log('getUserById');

  try {
    const { id } = req.query;

    const user = (await admin.firestore().collection('users').doc(id).get()).data();

    if (!user) {
      res.status(404).json('User not found');
    }

    res.json(user);
  } catch (error) {
    logger.error(error);
  }
});

/**
 * @param {User} req.body - Query parameter, insert/update body
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<User>}
 */
exports.updateUser = https.onRequest(async (req, res) => {
  logger.log('updateUser');

  try {
    const { body } = req;

    const user = await admin.firestore().collection('users').doc(body.id).set(body, { merge: true });

    res.json(user);
  } catch (error) {
    logger.error(error);
  }
});
