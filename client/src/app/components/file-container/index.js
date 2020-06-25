import React, { Fragment, useState } from "react";
import { Alert, Button } from "reactstrap";
import axios from "axios";

import FileUploader from "./file-uploader";
import DisplayFiles from "./display-files";
import ProgressBar from "./progress-bar";

const FileContainer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = async (event) => {
    const data = new FormData();
    try {
      setHasError(false);
      if (!uploadedFiles.length) return;

      uploadedFiles.forEach((_, index) =>
        data.append("file", uploadedFiles[index])
      );

      const response = await axios.post("http://localhost:8000/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      });

      console.log("response>>", response);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <Fragment>
      <FileUploader
        setUploadedFiles={setUploadedFiles}
        uploadedFiles={uploadedFiles}
      />
      {uploadedFiles.length ? (
        <Fragment>
          <DisplayFiles
            files={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
          <ProgressBar progress={progress} />
          <Button color="secondary" size="lg" block onClick={handleClick}>
            Upload Files
          </Button>
        </Fragment>
      ) : (
        <Alert color="secondary">No Files available</Alert>
      )}
    </Fragment>
  );
};

export default FileContainer;
