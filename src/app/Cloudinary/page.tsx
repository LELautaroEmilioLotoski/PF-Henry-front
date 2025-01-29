"use client"

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/Cloudinary/Cloudinary.module.css';
import { CircleUserRoundIcon } from 'lucide-react';
import ImageModal from './ImageModal';


const FileUploadComponent = ({ userprops }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(userprops?.image_url || ''); // Initialize with empty string or user's image URL
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem(`profileImageUrl_${userprops?.email}`);
    if (storedImageUrl) {
      setFileUrl(storedImageUrl);
    }
  }, [userprops?.email]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
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

      const response = await axios.post(`http://localhost:3000/users/${userprops?.email}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Archivo subido correctamente.');

      localStorage.setItem(`profileImageUrl_${userprops?.email}`, response.data.img);
      setFileUrl(response.data.img);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo. Por favor, inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.ImageProfile}>
      <h1>Imagen de Perfil</h1>
      <div className={styles.profilePicContainer} onClick={handleImageClick}>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={styles.fileInput}
        />
        {fileUrl ? (
          <img src={fileUrl} alt="Imagen subida" className={styles.profilePic} />
        ) : (
          <CircleUserRoundIcon className={styles.icon} />
        )}
      </div>
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Actualizar Imagen'}
      </button>

      {showModal && (
        <ImageModal
          fileUrl={fileUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FileUploadComponent;







