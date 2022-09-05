import {logger, https} from "firebase-functions/v1";

/**
 * @param {unknown} data
 * @param {import("firebase-functions/v1/https").CallableContext} context
 * @returns {string}
 */
const getHelloHandler = (data, context) => {
  logger.info("Hello logs!", {structuredData: true});
  return "Hello from Firebase!";
};

export const helloWorld = https.onCall(getHelloHandler);
