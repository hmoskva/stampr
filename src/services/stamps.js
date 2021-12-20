import { db } from "../config/firebase";
import { STAMPS } from "../config/firebase/collections";
import { applyUserFilter } from "../config/firebase/helpers";

export const saveStamp = (payload) => {
  return db.collection(STAMPS).doc(payload.uid).set(payload);
};

export const getStamps = async (userId, key = "userId") => {
  let query = db.collection(STAMPS);
  applyUserFilter(userId, query, key);
  const res = [];
  await query
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => res.push(doc.data()))
    );
  return res;
};

export const getStorageUsage = async (userId) => {
  const stamps = await getStamps(userId, "token");
  console.log(`stamps`, stamps);
  return stamps.reduce((total, curr) => total + curr.size, 0);
};
