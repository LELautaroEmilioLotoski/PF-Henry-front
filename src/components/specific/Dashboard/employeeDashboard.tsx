"use client"

import { useUserContext } from "@/context/UserContext"
import EmployeeHeader from "@/components/employee/employeeHeader/employeeHeader"
import FileUploadComponent from "@/app/Cloudinary/page"
import styles from "./Dashboard.module.css"

const EmployeeDashboard = () => {
  const { userNormal, logoutUser } = useUserContext()

  const handleLogout = () => {
    logoutUser()
    window.location.href = "/api/auth/logout"
  }

  if (!userNormal) {
    return <div className={styles.dashboardContainer}>Accio datos de usuario...</div>
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.flexContainer}>
        <EmployeeHeader />
        <div className={styles.mainContent}>
          <div className={styles.dashboardContent}>
            <div className={styles.flexContainer}>
              <div className={styles.uploadContainer}>
                <FileUploadComponent userprops={userNormal} />
              </div>
              <div>
                <h1 className={styles.welcomeTitle}>Bienvenido al Ministerio de Magia, {userNormal.name}</h1>
                <div className={styles.userInfoContainer}>
                  <h2 className={styles.userInfoTitle}>Tus datos mágicos</h2>
                  <p className={styles.userInfoItem}>
                    <strong>Nombre:</strong> {userNormal.name}
                  </p>
                  <p className={styles.userInfoItem}>
                    <strong>Correo lechuza:</strong> {userNormal.email}
                  </p>
                  <p className={styles.userInfoItem}>
                    <strong>Dirección:</strong> {userNormal.address || "No registrada"}
                  </p>
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Desaparecer (Cerrar sesión)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard


