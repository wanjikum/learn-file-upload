import React, { useState } from "react";
import styled from "styled-components";
import { FormGroup } from "reactstrap";
import DisplayErrors from "./display-errors";

import {
  LIGHT_GREY,
  CHERRY_RED,
  SILVER_GREY,
  BLUE,
  SOLITUDE_GREY,
} from "../../utils/colours";
import media from "../../utils/media";

const UPLOAD_ICON_PATH =
  "M27.25,6.16a10,10,0,0,0-18.5,0A10,10,0,0,0,0,16v.28A10,10,0,0,0,10,26H26.28a10,10,0,0,0,1-19.84ZM26.25,24H19V17l2.28,2.26a.84.84,0,1,0,1.19-1.19L18,13.59l-4.49,4.47a.84.84,0,1,0,1.19,1.19L17,17v7H10a7.94,7.94,0,0,1-8-7.71V16a8,8,0,0,1,7-7.9L10.16,8l.44-1.08a8,8,0,0,1,14.8,0L25.84,8,27,8.14A8,8,0,0,1,26.25,24Z";
const ERROR_ICON_PATH = `M20.75,12.25a.88.88,0,0,1,0,1.22L19.22,15l1.53,1.53a.86.86,0,0,1-1.22,1.22L18,16.22l-1.53,1.53a.86.86,0,0,1-1.22-1.22L16.78,15l-1.53-1.53a.86.86,0,1,1,1.22-1.22L18,13.78l1.53-1.53A.88.88,0,0,1,20.75,12.25ZM18,2a8,8,0,0,0-7.4,4.92L10.16,8,9,8.14A8,8,0,0,0,2,16v.25A8,8,0,0,0,10,24l1.33,0v0H26.23A8,8,0,0,0,27,8.14L25.84,8,25.4,6.93A8,8,0,0,0,18,2Zm0-2a10,10,0,0,1,9.25,6.16,10,10,0,0,1-1,19.84H10A10,10,0,0,1,0,16.32V16A10,10,0,0,1,8.75,6.16,10,10,0,0,1,18,0Z`;

const INLINE_LIGHT_GREY = encodeURIComponent(LIGHT_GREY);
const INLINE_CHERRY_RED = encodeURIComponent(CHERRY_RED);

const FileInput = styled.input`
  display: none;
`;

const SUploadIcon = styled.div`
  width: 4rem;
  height: 4rem;
  content: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="${({
    error,
  }) =>
    error
      ? INLINE_CHERRY_RED
      : INLINE_LIGHT_GREY}" viewBox="0 0 36 26" ><path d="${({ error }) =>
  error ? ERROR_ICON_PATH : UPLOAD_ICON_PATH}" /></svg>');
`;

const UploadContainer = styled.div`
  align-items: center;
  justify-content: center;
  border: 1px dashed ${(props) => (props.error ? CHERRY_RED : SILVER_GREY)};
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 0;
  padding: 2rem 1.5rem;
  position: relative;
  cursor: pointer;
  background: ${SOLITUDE_GREY};
  height: 9.25rem;
  width: 100%;

  ${media.small`
    width: 70%;;
  `};

  &:hover {
    border: 1px dashed ${(props) => (props.error ? CHERRY_RED : BLUE)};
  }
`;

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const handleClick = () => document.getElementById("fileUploads").click();
const ALLOWED_FILE_TYPES = ["jpg", "jpeg", "pdf", "png", "gif"];

const FileUploader = ({ uploadedFiles, setUploadedFiles }) => {
  const [errorMessages, setErrorMessages] = useState([]);

  const hasCorrectFileType = (fileName) =>
    ALLOWED_FILE_TYPES.includes(`${fileName.toLowerCase().split(".").pop()}`);

  const handleChange = (event) => {
    const files = event.target.files;
    if (hasCorrectFileType(files[0].name)) {
      setErrorMessages([]);
      setUploadedFiles([...event.target.files, ...uploadedFiles]);
    } else {
      !hasCorrectFileType(files[0].name) &&
        setErrorMessages([
          ...errorMessages,
          `Upload failed. Your document "${
            files[0].name
          }" needs to be in ${ALLOWED_FILE_TYPES.join(
            ", "
          ).toUpperCase()} format.`,
        ]);
    }
  };

  return (
    <FormGroup>
      <FileUploadWrapper>
        <FileInput
          type="file"
          name="fileUploads"
          id="fileUploads"
          onChange={handleChange}
        />
        <UploadContainer onClick={handleClick} error={errorMessages.length}>
          <SUploadIcon />
        </UploadContainer>
        <DisplayErrors errorMessages={errorMessages} />
      </FileUploadWrapper>
    </FormGroup>
  );
};

export default FileUploader;
