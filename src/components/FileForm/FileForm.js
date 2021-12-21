import PropTypes from "prop-types";
import styles from "./FileForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import { uploadFile } from "../../config/firebase/helpers";
import fileSize from "../../utils/fileSize";
import { useSelector } from "react-redux";

const FileForm = ({
  file,
  onStartUpload,
  onSuccess,
  setProgress,
  setUploadTask,
}) => {
  const [name, setName] = useState(file.name);
  const canUpload = useSelector((state) => state.user.canUpload);

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
          documentId: new Date().getTime(),
          url: uploadedUrl,
          name,
          size: fileSize(file.size),
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
          <span className={styles.FormSubtitle}>{fileSize(file.size)} KB</span>
        </div>
      </div>
      <form className="d-flex flex-column">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
        <Button
          className="mt-4 fw-little"
          label="Upload This File"
          disabled={!canUpload}
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
