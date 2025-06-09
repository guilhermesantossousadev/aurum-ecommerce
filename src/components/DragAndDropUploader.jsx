import React, { useState, useRef } from "react";
import "../styles/components/DragAndDropUploader.css";

function DragAndDropUploader({ onFilesUploaded }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    onFilesUploaded(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    onFilesUploaded(files);
  };

  return (
    <div
      className={`uploader-container ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <p>
        Arraste e solte as imagens aqui <br /> ou clique para selecionar
      </p>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        className="file-input"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="upload-button"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current.click();
        }}
      >
        Selecionar Imagens
      </button>
      {selectedFiles.length > 0 && (
        <ul className="file-list">
          {selectedFiles.map((file, index) => (
            <li key={index}>• {file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DragAndDropUploader;
