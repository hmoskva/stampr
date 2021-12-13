const extractUserInfo = (user) => {
  const { uid, displayName, email, photoURL } = user || {};
  return { uid, displayName, email, photoURL };
};

export default extractUserInfo;
