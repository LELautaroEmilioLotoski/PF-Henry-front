
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import DashboardSidebar from "@/components/header/Header"
import FileUploadComponent from "@/app/Cloudinary/page"
import Cookies from "js-cookie"
import styles from "./UserData.module.css"

const ProfilePage = () => {
  const router = useRouter()
  const { user, isLoading, error } = useUser()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (!user) return

    const registerUserIfNeeded = async () => {
      try {
        const backendToken = Cookies.get("token")

        if (!backendToken) {
          const userData = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            isComplete: false,
          }

          const response = await fetch("http://localhost:3000/auth/signupWithAuth0", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          })

          if (response.ok) {
            console.log("User registered successfully")
          } else if (response.status === 400) {
            console.log("User is already registered.")
          } else {
            throw new Error("Error registering user.")
          }
        }
      } catch (err) {
        console.error("Error registering user:", err)
      }
    }

    registerUserIfNeeded()
  }, [user])

  useEffect(() => {
    if (!user) return

    const sendTokenToBackend = async () => {
      try {
        const userData = { auth0Id: user.sub, name: user.name, email: user.email }
        const response = await fetch("http://localhost:3000/auth/signInWithAuth0", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        })

        if (response.ok) {
          const backendData = await response.json()
          localStorage.setItem("user", JSON.stringify(backendData.user))
          Cookies.set("token", backendData.token)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Error sending data to backend:", error)
      }
    }

    sendTokenToBackend()
  }, [user])

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile")
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <div className={styles.loadingText}>Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <div className={styles.errorText}>Error: {error.message}</div>
        </div>
      </div>
    )
  }

  const userDataLocalStorage = localStorage.getItem("user")
  const userData = userDataLocalStorage ? JSON.parse(userDataLocalStorage) : null

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
              <p className={styles.userInfoItem}>
                <span className={styles.userInfoLabel}>Address:</span>
                <span className={styles.userInfoValue}>{userData?.address || "Not available"}</span>
              </p>
            </div>
            <div className={styles.uploadContainer}>
              <h3 className={styles.uploadTitle}>Upload Image</h3>
              <FileUploadComponent userprops={{ email: userData?.email, image_url: userData?.picture }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage








