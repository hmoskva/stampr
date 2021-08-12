import firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const uploadFile = async ({
  file = "",
  dataUrl = "",
  fileName = "",
  storageDirectory = "files",
  progressHookFn = null,
  errorHookFn = null,
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
