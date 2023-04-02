import React, { useState } from "react";
import "./MultipleFileSelector.css";

const MultipleFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFiles([...event.dataTransfer.files]);
    }
  };

  const removeFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const renderFileNames = () => {
    return selectedFiles.map((file, index) => (
      <li key={index}>
        {file.name}
        <button onClick={() => removeFile(index)}>Remove</button>
      </li>
    ));
  };

  function clearAll() {
    setSelectedFiles([]);
  }

  function uploadAll() {
    //
  }

  return (
    <div
      className={`file-upload-container ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <p>Drag and drop files here or click to select files</p>
      <ul>
        {renderFileNames()}
      </ul>
      {selectedFiles.length && <button onClick={clearAll}>Clear all</button>}
      {selectedFiles.length && <button onClick={uploadAll}>Upload all</button>}
    </div>
  );
};

export default MultipleFileUpload;
