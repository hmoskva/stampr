import PropTypes from "prop-types";
import styles from "./FileForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import { uploadFile } from "../../utils/firebase";

const FileForm = ({
  file,
  onStartUpload,
  onSuccess,
  setProgress,
  setUploadTask,
}) => {
  const [name, setName] = useState(file.name);

  const handleUpload = async () => {
    try {
      if (!file) return;
      if (onStartUpload) {
        onStartUpload();
      }
      const uploadedUrl = await uploadFile({
        file,
        fileName: name,
        storageDirectory: "toptal",
        progressHookFn: setProgress,
        setUploadTask,
      });
      if (onSuccess) {
        onSuccess({
          url: uploadedUrl,
          name,
          size: file.size / 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-100">
      <div className={`d-flex mb-3 w-100 align-items-center`}>
        <img
          className={styles.Image}
          src="https://image.shutterstock.com/image-vector/folder-icon-symbol-flat-style-260nw-1475533136.jpg"
        />
        <div className="d-flex flex-column">
          <span className={styles.FormTitle}>{name}</span>
          <span className={styles.FormSubtitle}>{file.size / 1000} KB</span>
        </div>
      </div>
      <form className="d-flex flex-column">
        <Input value={name} onChange={setName} />
        <Button
          className="mt-4 fw-little"
          label="Upload This File"
          handleClick={handleUpload}
        />
      </form>
    </div>
  );
};

FileForm.propTypes = {
  file: PropTypes.object,
  onStartUpload: PropTypes.func,
  onSuccess: PropTypes.func,
  setProgress: PropTypes.func,
  setUploadTask: PropTypes.func,
};

export default FileForm;
