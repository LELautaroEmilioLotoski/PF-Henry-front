"use client"
import { useUserContext } from "@/context/UserContext"
import DashboardSidebar from "@/components/header/Header"
import { useUser } from "@auth0/nextjs-auth0/client"
import FileUploadComponent from "@/app/Cloudinary/page"
import ProfilePage from "@/app/profile/page"
import styles from "./Dashboard.module.css"

const UserDashboard = () => {
  const { userNormal, logoutUser } = useUserContext()
  const { user } = useUser()

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
              <h1 className={styles.welcomeTitle}>Bienvenido a Hogwarts, {userNormal.name}</h1>
              <div className={styles.userInfoContainer}>
                <h2 className={styles.userInfoTitle}>Tus datos mágicos personales</h2>
                <p className={styles.userInfoItem}>
                  Nombre: <span>{userNormal.name}</span>
                </p>
                <p className={styles.userInfoItem}>
                  Correo lechuza: <span>{userNormal.email}</span>
                </p>
                <p className={styles.userInfoItem}>
                  Dirección: <span>{userNormal.address}</span>
                </p>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Desaparecer (Cerrar sesión)
              </button>
            </div>
            <FileUploadComponent userprops={userNormal} />
          </div>
        ) : (
          <div>
            <h1 className={styles.welcomeTitle}>No se encontró tu pergamino de ingreso.</h1>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Volver al Expreso de Hogwarts (Iniciar sesión)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard


