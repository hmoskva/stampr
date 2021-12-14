import { db } from "../config/firebase";
import { STAMPS } from "../config/firebase/collections";
import { applyUserFilter } from "../config/firebase/helpers";

export const saveStamp = (payload) => {
  return db.collection(STAMPS).doc(payload.uid).set(payload);
};

export const getStamps = async (userId) => {
  let query = db.collection(STAMPS);
  applyUserFilter(userId, query);
  return query.get();
};
