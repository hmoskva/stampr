import { storage } from ".";

export const applyUserFilter = (userId, query, key = "userId") => {
  if (userId) {
    query.where(key, "==", userId);
  }
};

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
