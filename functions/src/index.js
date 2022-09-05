import {logger, https} from "firebase-functions/v1";

/**
 * @param {import("firebase-functions/v1/https").Request} request
 * @param {import("express").Response} response
 * @returns {void}
 */
const getHelloHandler = (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
};

export const helloWorld = https.onRequest(getHelloHandler);
