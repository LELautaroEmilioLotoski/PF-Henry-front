"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import DashboardSidebar from "@/components/specific/Dashboard/header/Header";
import { signUpWithAuth0, signInWithAuth0 } from "@/helpers/auth.helper";
import Cookies from "js-cookie";
import Cloudinary from "../Cloudinary/Cloudinary";
import styles from "@/components/specific/userData/UserData.module.css"

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user) return;

    const registerUserIfNeeded = async () => {
      try {
        const backendToken = Cookies.get("token");

        if (!backendToken) {
          const userData = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            isComplete: false,
          };

          await signUpWithAuth0(userData);
          console.log("User registered successfully");
        }
      } catch (err) {
        console.error("Error registering user:", err);
      }
    };

    registerUserIfNeeded();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const sendTokenToBackend = async () => {
      try {
        const userData = { auth0Id: user.sub, name: user.name, email: user.email };
        const backendUser = await signInWithAuth0(userData);
        localStorage.setItem("user", JSON.stringify(backendUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    };

    sendTokenToBackend();
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile")
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userDataLocalStorage = localStorage.getItem("user");
  const userData = userDataLocalStorage ? JSON.parse(userDataLocalStorage) : null;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.flexContainer}>
          <DashboardSidebar />
          <div className={styles.mainContent}>
            <h2 className={styles.title}>Your Personal Data</h2>
            <div className={styles.userInfo}>
              <p className={styles.userInfoItem}>
                <span className={styles.userInfoLabel}>Name:</span>
                <span className={styles.userInfoValue}>{userData?.name || "Not available"}</span>
              </p>
              <p className={styles.userInfoItem}>
                <span className={styles.userInfoLabel}>Email:</span>
                <span className={styles.userInfoValue}>{userData?.email || "Not available"}</span>
              </p>
            </div>
            <div className={styles.uploadContainer}>
              <h3 className={styles.uploadTitle}>Upload Image</h3>
              {userData ? <Cloudinary /> : <h2>Cloudinary not found</h2>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
