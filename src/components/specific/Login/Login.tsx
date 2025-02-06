"use client"

import type React from "react"
import { useState } from "react"
import { useUserContext } from "@/context/UserContext"
import { login } from "@/helpers/auth.helper"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import styles from "./Login.module.css"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useUserContext()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });

    try {
      const response = await login({ email, password })

      console.log("Response from server:", response.data);

      if (response && response.data.token && response.data.user) {
        const token = response.data.token;
        const user = response.data.user;

        Cookies.set("token", token, { expires: 7 });
        console.log("Token stored in cookies:", Cookies.get("token"));

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User stored in localStorage:", localStorage.getItem("user"));

        console.log("User Role:", user.role);

        if (user.role === "worker") {
          console.log("Redirecting to /employee/dashboard");
          router.push("/employee/dashboard");
        } else if (user.role === "admin") {
          console.log("Redirecting to /admin/dashboard");
          router.push("/admin/dashboard");
        } else {
          console.log("Redirecting to /profile");
          router.push("/profile");
        }
      } else {
        console.log("Login failed: Invalid credentials");
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Login Error:", error)
      setError("Error mágico. ¡Repara tu varita e intenta de nuevo!")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2 className={styles.formTitle}>Portal Mágico de Hogwarts</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo de lechuza 🦉
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="harry.potter@hogwarts.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña mágica 🔮
          </label>
          <div className={styles.passwordField}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggle}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.button}>
          Alohomora 🗝️
        </button>

        <button
          type="button"
          onClick={() => (window.location.href = "/api/auth/login")}
          className={`${styles.button} ${styles.auth0Button}`}
        >
          Accio Auth0 🪄
        </button>
      </form>
    </div>
  )
}

export default Login








