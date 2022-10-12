import admin from "firebase-admin";
import userNumberFieldsToOverwrite from "../constants/userNuberFieldsToOverwrite";

/**
 * Build add/update user object. If any field of type number is passed function
 * checks if it is included by constant array of user fields. If so it
 * overwrites it with firestore increment function. Available for both positive
 * and negative numbers (in case of negative numbers will be executed
 * decrementing operation)
 *
 * @param {{id: string; [k: string]: any}} body
 * @returns {{id: string; [k: string]: any}}
 */
export default (body) => {
  const mappedBody = {...body};

  for (const [key, value] of Object.entries(mappedBody)) {
    if (typeof value === "number") {
      mappedBody[key] = userNumberFieldsToOverwrite.includes(key)
        ? value
        : admin.firestore.FieldValue.increment(value);
    }
  }

  return mappedBody;
};
