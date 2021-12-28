import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./FileUpload.module.scss";
import FileForm from "../FileForm/FileForm";
import ProgressRing from "../ProgressRing/ProgressRing";
import Icon from "../Icon/Icon";
import fileSize from "../../utils/fileSize";
import Button from "../Button/Button";

const FILE_SIZE_LIMIT = 10000;

const FileUpload = ({
  label,
  sublabel,
  accept,
  className,
  handleSuccess,
  onFileChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({});
  const [doc, setDoc] = useState({});
  const [stamp, setStamp] = useState({});
  // const [isDocUploaded, setIsDocUploaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displayLabel = doc.documentId ? "Upload Stamp" : "Upload Document";

  const inputRef = useRef(null);
  const uploadTaskRef = useRef(null);

  const handlePause = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.pause();
      setIsPaused(true);
    }
  };
  const handlePlay = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleUploadSuccess = (payload) => {
    console.log("FILEFORMSUCCESS");
    if (!doc.documentId) {
      setDoc(payload);
      setUploading(false);
      setShowForm(false);
      // handleSuccess({ ...payload, documentUrl: payload.url });
    } else {
      console.log("payload :>> ", payload);
      setStamp(payload);
      setUploading(false);
      handleSuccess({ ...doc, documentUrl: doc.url, stampUrl: payload.url });
    }
  };

  const renderBody = () => {
    if (uploading) {
      return (
        <div className="d-flex justify-content-between align-items-center w-100">
          <Icon icon="pause" onClick={handlePause} />
          <ProgressRing progress={isPaused ? "Paused" : progress} size={200} />
          <Icon icon="play" onClick={handlePlay} />
        </div>
      );
    } else if (showForm) {
      return (
        <FileForm
          file={file}
          btnLabel={"Upload"}
          onStartUpload={() => setUploading(true)}
          onSuccess={(payload) => handleUploadSuccess(payload)}
          setProgress={(e) => setProgress(e)}
          setUploadTask={(uploadTask) => (uploadTaskRef.current = uploadTask)}
        />
      );
    }
    return (
      <>
        <span className="d-block mb-5">{label}</span>
        <Button
          className="mt-4 fw-little"
          label={displayLabel}
          handleClick={handleInputClick}
        />
        {/* <span onClick={handleInputClick}>{displayLabel}</span> */}
      </>
    );
  };

  const handleInputClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    const size = fileSize(file.size);

    if (size <= FILE_SIZE_LIMIT) {
      console.log(`fileSizeeee`, size);
      setFile(file);
      setShowForm(true);
      if (onFileChange && !doc.documentId) {
        onFileChange(size);
      }
    } else {
      // todo toast
      alert("File too large");
    }
  };

  return (
    <div className={`${styles.FileUpload} ${className} p-5`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center p-5 ${styles.DropContainer} `}
      >
        {renderBody()}
      </div>

      <input
        className="d-none"
        type="file"
        ref={inputRef}
        accept={accept}
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  handleSuccess: PropTypes.func,
  onFileChange: PropTypes.func,
  className: PropTypes.string,
};

FileUpload.defaultProps = {
  label: "Drag & Drop files here to upload",
  sublabel: "Browse Files",
  accept: "application/pdf, application/msword, image/*, .doc, .docx",
  onChange: () => ({}),
  handleSuccess: () => ({}),
};

export default FileUpload;
