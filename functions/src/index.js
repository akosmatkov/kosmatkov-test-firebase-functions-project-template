import {logger, https} from "firebase-functions/v1";
import buildUserAddUpdateBody from "./utils/buildUserAddUpdateBody";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

/**
 * @param {{id: string}} data
 * @returns {Promise<
 *   | {id: string; [k: string]: any}
 *   | import("firebase-functions/v1/https").HttpsError
 * >}
 */
const getUserByIdHandler = async (data) => {
  logger.log("getUserById");

  try {
    const {id} = data;

    const user = (await db.collection("users").doc(id).get()).data();

    if (!user) {
      return new https.HttpsError("not-found", "User not found");
    }

    return Object.assign(user);
  } catch (error) {
    logger.error(error);

    return new https.HttpsError("internal", "Internal server error");
  }
};

/**
 * @param {{id: string; [k: string]: any}} data
 * @returns {Promise<
 *   | {id: string; [k: string]: any}
 *   | import("firebase-functions/v1/https").HttpsError
 * >}
 */
const updateUserHandler = async (data) => {
  logger.log("updateUser");

  try {
    const updateBody = buildUserAddUpdateBody(data);

    await db
      .collection("users")
      .doc(updateBody.id)
      .set(updateBody, {merge: true});

    const user = (await db.collection("users").doc(updateBody.id).get()).data();

    if (!user) {
      return new https.HttpsError("not-found", "User not found");
    }

    return Object.assign(user);
  } catch (error) {
    logger.error(error);

    throw new https.HttpsError("internal", "Internal server error");
  }
};

exports.getUserById = https.onCall(getUserByIdHandler);
exports.updateUser = https.onCall(updateUserHandler);
