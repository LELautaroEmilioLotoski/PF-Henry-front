"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/components/specific/Cloudinary/Cloudinary.module.css";
import { CircleUserRoundIcon } from "lucide-react";
import { uploadFile } from "@/helpers/user.helper";
import { IUser } from "@/interfaces/Types";

const Cloudinary = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(
    "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  );
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set isMounted when the component has mounted (client-side only)
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

  if (!isMounted) {
    return null;
  }

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
      alert("Please select a file.");
      return;
    }
    try {
      setUploading(true);
      const response = await uploadFile(file, userData.email);
      alert("File uploaded successfully.");
      localStorage.setItem(`profileImageUrl_${userData.email}`, response.img);
      setFileUrl(response.img);
    } catch (error) {
      console.error("Error uploading file:", error); // Use the variable to avoid warning
      alert("Error uploading the file. Please try again.");
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
              alt="Uploaded image"
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
            <img
              src={fileUrl}
              alt="Preview"
              className={styles.modalImage}
            />
            <div className="flex p-2 gap-5 justify-center">
              <div className="pt-2">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleOpenFileInput}
                  disabled={uploading}
                >
                  Select another image
                </button>
              </div>
              <div className="pt-2">
                <button
                  className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleFileUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload image"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cloudinary;
