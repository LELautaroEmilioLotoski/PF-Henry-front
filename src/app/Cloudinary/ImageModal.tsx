import React from 'react';
import styles from "@/app/Cloudinary/Cloudinary.module.css";

interface ImageModalProps {
  fileUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ fileUrl, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <img src={fileUrl} alt="Imagen subida" className={styles.largeImage} />
      </div>
    </div>
  );
};

export default ImageModal;


