import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// const history = window.history;
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

//* Watch user event
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     console.log("user :>> ", user);
//     localStorage.setItem("user", user);
//   } else {
//     // User is signed out
//     localStorage.setItem("user", {});
//   }
// });

export const uploadFile = async ({
  file = "",
  dataUrl = "",
  fileName = "",
  storageDirectory = "files",
  progressHookFn = null,
  errorHookFn = null,
  setUploadTask = null,
}) => {
  try {
    const storage = firebase.storage();
    let uploadTask;
    if (!dataUrl) {
      const filename = `${fileName || file.name}_${new Date().getTime()}`;
      uploadTask = storage
        .ref()
        .child(`/${storageDirectory}/${filename}/`)
        .put(file);
    } else {
      uploadTask = storage
        .ref()
        .child(`/${storageDirectory}/${fileName}/`)
        .putString(dataUrl, "data_url");
    }
    if (setUploadTask) {
      setUploadTask(uploadTask);
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.ceil(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        switch (snapshot.state) {
          case "running":
            if (progressHookFn) {
              progressHookFn(progress);
            }
            break;
          default:
            break;
        }
      },
      (error) => {
        if (errorHookFn) {
          errorHookFn(error);
        }
        Promise.reject(error);
      },
      () => {
        if (progressHookFn) {
          progressHookFn(100);
        }
      }
    );
    await uploadTask;
    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = ({ first_name, last_name, email, password }) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // resolve(userCredential.user);
        //* Send verification email
        // verifyEmail(url:"");
        //* Add user to database
        db.collection("users")
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

export const login = ({ email, password }) => {
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

export { db, auth, provider };
export default firebase;
