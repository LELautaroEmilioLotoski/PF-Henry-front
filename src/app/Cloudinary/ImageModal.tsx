import React from 'react';
import styles from "@/app/Cloudinary/ImageModal.module.css";

interface ImageModalProps {
  fileUrl: string;
  onClose: () => void;
  onOpenFileInput: () => void;
  onFileUpload: () => void;
  uploading: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ fileUrl, onClose, onOpenFileInput, onFileUpload, uploading }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <img src={fileUrl} alt="Imagen subida" className={styles.largeImage} />
        <div className={styles.buttonContainer}>
          <button onClick={onOpenFileInput} className={styles.changeButton}>Change Image</button>
          <button onClick={onFileUpload} disabled={uploading} className={styles.uploadButton}>
            {uploading ? 'Subiendo...' : 'Actualizar Imagen'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;










