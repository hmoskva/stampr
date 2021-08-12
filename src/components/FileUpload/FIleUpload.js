import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styles from "./FileUpload.module.scss";
import FileForm from "../FileForm/FileForm";

const FileUpload = ({ label, sublabel, accept }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [, setProgress] = useState(0);

  const inputRef = useRef(null);

  const renderBody = () => {
    if (uploading) {
      return <div>Uploading</div>;
    } else if (showForm) {
      return (
        <FileForm
          file={file}
          onStartUpload={() => setUploading(true)}
          onSuccess={() => {
            setShowForm(false);
            setUploading(false);
          }}
          setProgress={(e) => setProgress(e)}
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
    setFile(file);
    setShowForm(true);
  };

  return (
    <div className={`${styles.FileUpload} p-5`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center p-5 ${styles.DropContainer}`}
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
};

FileUpload.defaultProps = {
  label: "Drag & Drop files here to upload",
  sublabel: "Browse Files",
  accept: "application/pdf, application/msword, image/*, .doc, .docx",
  onChange: () => ({}),
};

export default FileUpload;
