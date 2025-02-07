"use client"
import { useUserContext } from "@/context/UserContext"
import DashboardSidebar from "@/components/header/Header"
import { useUser } from "@auth0/nextjs-auth0/client"
import FileUploadComponent from "@/app/Cloudinary/page"
import ProfilePage from "@/components/specific/userData/UserData"
import styles from "./Dashboard.module.css"
import { useEffect, useState } from "react"

const UserDashboard = () => {
  const { userNormal, logoutUser } = useUserContext()
  const { user } = useUser()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLogout = () => {
    logoutUser()
    window.location.href = "/api/auth/logout"
  }

  return (
    <div className={`${styles.dashboardContainer} ${isLoaded ? styles.fadeIn : ""}`}>
  <div className={`${styles.dashboardContent} ${isLoaded ? styles.scaleIn : ""}`}>
    {user ? (
      <ProfilePage />
    ) : userNormal ? (
      <div className={styles.flexContainer}>
        <DashboardSidebar />
        <div className={styles.mainContent}>
          <h1 className={`${styles.welcomeTitle} ${isLoaded ? styles.slideInFromLeft : ""}`}>
            Welcome to Hogwarts, {userNormal.name}
          </h1>
          <div className={`${styles.userInfoContainer} ${isLoaded ? styles.slideInFromRight : ""}`}>
            <h2 className={styles.userInfoTitle}>Your Magical Personal Data</h2>
            <p className={styles.userInfoItem}>
              Name: <span>{userNormal.name}</span>
            </p>
            <p className={styles.userInfoItem}>
              Owl Post: <span>{userNormal.email}</span>
            </p>
            <p className={styles.userInfoItem}>
              Address: <span>{userNormal.address}</span>
            </p>
          </div>
        </div>
        <FileUploadComponent userprops={userNormal} />
      </div>
    ) : (
      <div className={`${styles.noUserContainer} ${isLoaded ? styles.fadeIn : ""}`}>
        <h1 className={styles.welcomeTitle}>Your acceptance letter was not found.</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Return to the Hogwarts Express (Log In)
        </button>
      </div>
    )}
  </div>
</div>
  )
}

export default UserDashboard



