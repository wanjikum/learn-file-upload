import React from "react";
import styled from "styled-components";
import { Table } from "reactstrap";
import { FaTrashAlt, FaEye } from "react-icons/fa";

import { BLUE, CHERRY_RED } from "../../utils/colours";

const ViewIcon = styled(FaEye)`
  color: ${BLUE};
`;

const DeleteIcon = styled(FaTrashAlt)`
  color: ${CHERRY_RED};
`;

const TableContent = ({
  name,
  size,
  noOfFile,
  handleViewFile,
  handleDeleteIconClick,
}) => (
  <tr>
    <th scope="row">{noOfFile + 1}</th>
    <td>{name}</td>
    <td>{(size / 1024 / 1024).toFixed(2)}</td>
    <td onClick={handleViewFile}>
      <ViewIcon />
    </td>
    <td onClick={() => handleDeleteIconClick(noOfFile)}>
      <DeleteIcon />
    </td>
  </tr>
);

const DisplayFiles = ({ files, setUploadedFiles }) => {
  const handleRemoveFile = (noOfFile) => {
    files.splice(noOfFile, 1);
    setUploadedFiles([...files]);
  };

  const handleViewFile = (file) => (e) => {
    e.preventDefault();
    const blob = new Blob([file], { type: file.type });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, file.name);
    } else {
      const link = document.createElement("a");

      const userAgent = window.navigator.userAgent;
      const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
      const webkit = !!userAgent.match(/WebKit/i);
      const iOSSafari = iOS && webkit && !userAgent.match(/CriOS/i);
      const iOSChrome = iOS && !iOSSafari;
      const mac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const apple = iOS || iOSSafari || mac;

      if (apple) {
        const reader = new FileReader();
        reader.onload = () => {
          let url = reader.result;

          if (iOSChrome) {
            window.location.href = url;
          } else {
            url = url.replace(/^data:[^;]*;/, "data:attachment/file;");
            link.href = url;
            link.download = file.name || "unknown";

            const evt = new MouseEvent("click", {
              view: window,
              bubbles: false,
              cancelable: false,
            });
            link.dispatchEvent(evt);
          }
        };
        reader.readAsDataURL(blob);
      } else {
        const objectUrl = window.URL.createObjectURL(blob);
        link.href = objectUrl;
        link.target = "_blank";
        link.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(objectUrl);
        }, 0);
      }
      link.remove();
    }
  };

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>File Name</th>
          <th>Size(MB)</th>
          <th>View</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <TableContent
            name={file.name}
            size={file.size}
            key={index}
            noOfFile={index}
            handleDeleteIconClick={handleRemoveFile}
            handleViewFile={handleViewFile(file)}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default DisplayFiles;
