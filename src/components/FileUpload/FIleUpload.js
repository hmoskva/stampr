import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./FileUpload.module.scss";
import FileForm from "../FileForm/FileForm";
import ProgressRing from "../ProgressRing/ProgressRing";
import Icon from "../Icon/Icon";

const FILE_SIZE_LIMIT = 100;

const FileUpload = ({
  label,
  sublabel,
  accept,
  className,
  handleSuccess,
  onFileChange,
  canUpload = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const inputRef = useRef(null);
  const uploadTaskRef = useRef(null);

  useEffect(() => {
    if (!canUpload) {
      setShowForm(false);
    }
  }, [canUpload]);

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

  const renderBody = () => {
    if (uploading) {
      return (
        <div className="d-flex justify-content-between align-items-center w-100">
          <Icon icon="pause" onClick={handlePause} />
          <ProgressRing progress={isPaused ? "Paused" : progress} size={190} />
          <Icon icon="play" onClick={handlePlay} />
        </div>
      );
    } else if (showForm) {
      return (
        <FileForm
          file={file}
          canUpload={canUpload}
          onStartUpload={() => setUploading(true)}
          onSuccess={(payload) => {
            setShowForm(false);
            setUploading(false);
            handleSuccess(payload);
          }}
          setProgress={(e) => setProgress(e)}
          setUploadTask={(uploadTask) => (uploadTaskRef.current = uploadTask)}
        />
      );
    }
    return (
      <>
        <span className="d-block mb-5">{label}</span>
        <span onClick={handleInputClick}>{sublabel}</span>
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
    const fileSize = file.size / 1000;
    console.log(`fileSize`, fileSize);
    if (fileSize <= FILE_SIZE_LIMIT) {
      setFile(file);
      setShowForm(true);
      if (onFileChange) {
        onFileChange(fileSize);
      }
    } else {
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
  canUpload: PropTypes.bool,
};

FileUpload.defaultProps = {
  label: "Drag & Drop files here to upload",
  sublabel: "Browse Files",
  accept: "application/pdf, application/msword, image/*, .doc, .docx",
  onChange: () => ({}),
  handleSuccess: () => ({}),
};

export default FileUpload;
