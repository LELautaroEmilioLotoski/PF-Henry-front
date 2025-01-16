"use client"
import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo.');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3000/files/uploadImage/id', formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      console.log(response);
      

      setFileUrl(response.data.url); 
      alert('Archivo subido correctamente.');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo. Por favor, inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Subir Archivo</h1>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Subir Archivo'}
      </button>

      {fileUrl && (
        <div>
          <h2>URL de la imagen:</h2>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Ver imagen
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;