import { auth, db } from "../config/firebase";
import { USERS } from "../config/firebase/collections";
export const register = ({ first_name, last_name, email, password }) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //* Send verification email
        //* Add user to database
        db.collection(USERS)
          .doc(userCredential.user.uid)
          .set({
            first_name,
            last_name,
            authProvider: "emailAndPassword",
            email,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        resolve(userCredential.user);
      })
      .catch((error) => {
        // return error
        reject(error);
      });
  });
};

export const firebaseLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // Signed in
        resolve(userCredentials.user);
        // ...
      })
      .catch((error) => {
        reject(error);
        // ..
      });
  });
};

export const verifyEmail = ({ url = "http://localhost:3000?" }) => {
  return new Promise((resolve, reject) => {
    auth.currentUser
      .sendEmailVerification({
        url,
      })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const logout = () => {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log("error :>> ", error);
    });
};
