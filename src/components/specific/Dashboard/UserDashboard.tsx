"use client"
import React from "react";
import { useUserContext } from "@/context/UserContext"
import DashboardSidebar from "@/components/header/Header"
import { useUser } from "@auth0/nextjs-auth0/client"
import ProfilePage from "@/components/specific/userData/UserData"
import styles from "./Dashboard.module.css"
import Cloudinary from "../Cloudinary/Cloudinary";

const UserDashboard = () => {
  const { userNormal, logoutUser } = useUserContext()
  const { user } = useUser()
  // const [isLoaded, setIsLoaded] = useState(false)


  const handleLogout = () => {
    logoutUser()
    window.location.href = "/api/auth/logout"
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        {user ? (
          <ProfilePage />
        ) : userNormal ? (
          <div className={styles.flexContainer}>
            <DashboardSidebar />
            <div className={styles.mainContent}>
              <h1 className={styles.welcomeTitle}>Welcome to Hogwarts, {userNormal.name}</h1>
              <div className={styles.userInfoContainer}>
                <h2 className={styles.userInfoTitle}>Your magical personal data</h2>
                <p className={styles.userInfoItem}>
                  Name: <span>{userNormal.name}</span>
                </p>
                <p className={styles.userInfoItem}>
                  Owl mail: <span>{userNormal.email}</span>
                </p>
                <p className={styles.userInfoItem}>
                  Address: <span>{userNormal.address}</span>
                </p>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Disappear (Log out)
              </button>
            </div>
            <Cloudinary />
          </div>
        ) : (
          <div>
            <h1 className={styles.welcomeTitle}>Your admission scroll was not found.</h1>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Return to the Hogwarts Express (Log in)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
