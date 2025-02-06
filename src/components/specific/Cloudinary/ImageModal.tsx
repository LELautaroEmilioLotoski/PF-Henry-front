// import React from 'react';
// import styles from "@/app/Cloudinary/Cloudinary.module.css";

// interface ImageModalProps {
//   fileUrl: string;
//   onClose: () => void;
//   onOpenFileInput: () => void;
//   onFileUpload: () => void;
//   uploading: boolean;
// }

// const ImageModal: React.FC<ImageModalProps> = ({ fileUrl, onClose, onOpenFileInput, onFileUpload, uploading }) => {
//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <span className={styles.close} onClick={onClose}>&times;</span>
//         <img src={fileUrl} alt="Imagen subida" className={styles.largeImage} />
//         <button onClick={onOpenFileInput} className={styles.changeButton}>Cambiar Imagen</button>
//         <button onClick={onFileUpload} disabled={uploading} className={styles.uploadButton}>
//           {uploading ? 'Subiendo...' : 'Actualizar Imagen'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageModal;








import React from 'react';
import styles from "@/app/Cloudinary/Cloudinary.module.css";

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
        <button onClick={onOpenFileInput} className={styles.changeButton}>Cambiar Imagen</button>
        <button onClick={onFileUpload} disabled={uploading} className={styles.uploadButton}>
          {uploading ? 'Subiendo...' : 'Actualizar Imagen'}
        </button>
      </div>
    </div>
  );
};

export default ImageModal;

