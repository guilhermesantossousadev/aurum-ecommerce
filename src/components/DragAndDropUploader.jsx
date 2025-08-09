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
    // Concatenar arquivos novos aos já selecionados
    // Opcional: evitar arquivos duplicados pelo nome e tamanho
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

      onFilesUploaded(allFiles); // Atualizar callback com a lista completa
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
    e.target.value = null; // limpar o input para permitir re-upload do mesmo arquivo se quiser
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
