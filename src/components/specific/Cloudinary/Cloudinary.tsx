// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import styles from "@/components/specific/Cloudinary/Cloudinary.module.css";
// import { CircleUserRoundIcon } from "lucide-react";
// import { uploadFile } from "@/helpers/auth.helper";
// import Cookies from "js-cookie";

// const Cloudinary = () => {
//   const user = localStorage.getItem("user");
//   const tokenCookie = Cookies.get("token");
//   if (!user || !tokenCookie) return null;
//   const userData = JSON.parse(user);
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileUrl, setFileUrl] = useState(
//     userData?.image_url ||
//       "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
//   );
//   const [showModal, setShowModal] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (userData?.email) {
//       const storedImageUrl = localStorage.getItem(
//         `profileImageUrl_${userData?.email}`
//       );
//       if (storedImageUrl) {
//         setFileUrl(storedImageUrl);
//       }
//     }
//   }, [userData?.email]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0] || null;
//     setFile(selectedFile);
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFileUrl(e.target?.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       alert("Por favor, selecciona un archivo.");
//       return;
//     }
//     try {
//       setUploading(true);
//       const response = await uploadFile(file, userData?.email);
//       console.log(response);
      
//       alert("Archivo subido correctamente.");
//       localStorage.setItem(
//         `profileImageUrl_${userData?.email}`,
//         response.img
//       );
//       setFileUrl(response.img);
//     } catch (error) {
//       alert("Error al subir el archivo. Por favor, inténtalo de nuevo.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleImageClick = (event: React.MouseEvent) => {
//     event.stopPropagation();
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);
//   const handleOpenFileInput = () => fileInputRef.current?.click();

//   return (
//     <div className={styles.ImageProfile}>
//       <h1 className={styles.title}>Imagen de Perfil</h1>
//       <div className={styles.profilePicContainer} onClick={handleImageClick}>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           ref={fileInputRef}
//           className={styles.fileInput}
//         />
//         <div className={styles.iconContainer}>
//           {fileUrl ? (
//             <img
//               src={fileUrl}
//               alt="Imagen subida"
//               className={styles.profilePic}
//               onClick={handleImageClick}
//             />
//           ) : (
//             <CircleUserRoundIcon className={styles.icon} />
//           )}
//         </div>
//       </div>
//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <span className={styles.close} onClick={handleCloseModal}>
//               &times;
//             </span>
//             <img
//               src={fileUrl}
//               alt="Vista previa"
//               className={styles.modalImage}
//             />
//             <button onClick={handleOpenFileInput} disabled={uploading}>
//               Seleccionar otra imagen
//             </button>
//             <button onClick={handleFileUpload} disabled={uploading}>
//               {uploading ? "Subiendo..." : "Subir imagen"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cloudinary;

"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/components/specific/Cloudinary/Cloudinary.module.css";
import { CircleUserRoundIcon } from "lucide-react";
import { uploadFile } from "@/helpers/auth.helper";

const Cloudinary = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(
    "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  );
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Seteamos isMounted cuando el componente se ha montado (solo en cliente)
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      const storedImageUrl = localStorage.getItem(
        `profileImageUrl_${parsedUser.email}`
      );
      if (storedImageUrl) {
        setFileUrl(storedImageUrl);
      } else if (parsedUser.image_url) {
        setFileUrl(parsedUser.image_url);
      }
    }
  }, []);

  // Hasta que el componente esté montado, no renderizamos nada
  if (!isMounted) {
    return null;
  }

  // Opcional: si no hay userData, también podrías retornar null
  if (!userData) {
    return null;
  }

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
      alert("Por favor, selecciona un archivo.");
      return;
    }
    try {
      setUploading(true);
      const response = await uploadFile(file, userData.email);
      alert("Archivo subido correctamente.");
      localStorage.setItem(`profileImageUrl_${userData.email}`, response.img);
      setFileUrl(response.img);
    } catch (error) {
      alert("Error al subir el archivo. Por favor, inténtalo de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleOpenFileInput = () => fileInputRef.current?.click();

  return (
    <div className={styles.ImageProfile}>
      <h1 className={styles.title}>Imagen de Perfil</h1>
      <div className={styles.profilePicContainer} onClick={handleImageClick}>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={styles.fileInput}
        />
        <div className={styles.iconContainer}>
          {fileUrl ? (
            <img
              src={fileUrl}
              alt="Imagen subida"
              className={styles.profilePic}
              onClick={handleImageClick}
            />
          ) : (
            <CircleUserRoundIcon className={styles.icon} />
          )}
        </div>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <img src={fileUrl} alt="Vista previa" className={styles.modalImage} />
            <button onClick={handleOpenFileInput} disabled={uploading}>
              Seleccionar otra imagen
            </button>
            <button onClick={handleFileUpload} disabled={uploading}>
              {uploading ? "Subiendo..." : "Subir imagen"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cloudinary;

