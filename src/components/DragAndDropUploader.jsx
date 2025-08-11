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

  const addFiles = (newFiles) => {
    setSelectedFiles((prevFiles) => {
      const allFiles = [...prevFiles];

      newFiles.forEach((newFile) => {
        const duplicate = allFiles.some(
          (file) => file.name === newFile.name && file.size === newFile.size
        );
        if (!duplicate) {
          allFiles.push(newFile);
        }
      });

      onFilesUploaded(allFiles);
      return allFiles;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
    e.target.value = null; // permite reupload do mesmo arquivo
  };

  // Remove um arquivo da lista pelo índice
  const removeFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, i) => i !== indexToRemove);
      onFilesUploaded(newFiles);
      return newFiles;
    });
  };

  return (
    <div
      className={`uploader-container ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      style={{ cursor: "pointer" }}
    >
      <p>
        Arraste e solte as imagens aqui <br /> ou clique para selecionar
      </p>

      {/* input oculto */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
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
        <ul className="file-list" style={{ listStyle: "none" }}>
          {selectedFiles.map((file, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              • {file.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                style={{
                  marginLeft: "auto",
                  background: "transparent",
                  border: "none",
                  color: "red",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                aria-label={`Remover ${file.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DragAndDropUploader;
