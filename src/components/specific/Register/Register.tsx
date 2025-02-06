"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/helpers/auth.helper"
import { validateRegisterForm } from "@/helpers/validate"
import type { IRegisterErrors, IRegisterProps } from "@/interfaces/Types"
import styles from "@/components/specific/Register/Register.module.css"
import { Eye, EyeOff } from "lucide-react"
import type React from "react" // Added import for React

const Register = () => {
  const router = useRouter()
  const initialState: IRegisterProps = {
    id: "",
    role: "",
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    address: "",
    image_url:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
  }

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState)
  const [errors, setErrors] = useState<IRegisterErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDataUser((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setErrors({})

    const validationErrors = validateRegisterForm(dataUser)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    console.log("Submitting registration data:", dataUser)

    try {
      const res = await register(dataUser)
      console.log(dataUser)

      console.log("Registration response:", res)

      if (res.message === "Registro exitoso") {
        router.push("/login")
      } else {
        setErrors({
          name: res.message,
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({})
    }

    setIsLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2 className={styles.formTitle}>Portal Mágico de Hogwarts - Registro</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nombre del Mago 🧙
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={dataUser.name}
            onChange={handleChange}
            className={styles.inputField}
            disabled={isLoading}
            placeholder="Harry Potter"
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo de lechuza 🦉
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={dataUser.email}
            onChange={handleChange}
            className={styles.inputField}
            disabled={isLoading}
            placeholder="harry.potter@hogwarts.edu"
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
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
              value={dataUser.password}
              onChange={handleChange}
              className={styles.inputField}
              disabled={isLoading}
              placeholder="••••••••"
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggle}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ConfirmPassword" className={styles.label}>
            Confirmar Contraseña mágica 🔮
          </label>
          <div className={styles.passwordField}>
            <input
              id="ConfirmPassword"
              name="ConfirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={dataUser.ConfirmPassword}
              onChange={handleChange}
              className={styles.inputField}
              disabled={isLoading}
              placeholder="••••••••"
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className={styles.passwordToggle}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.ConfirmPassword && <span className={styles.errorMessage}>{errors.ConfirmPassword}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Dirección de la Lechuza 🏠
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={dataUser.address}
            onChange={handleChange}
            className={styles.inputField}
            disabled={isLoading}
            placeholder="4 Privet Drive, Little Whinging"
          />
          {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Lanzando hechizo..." : "Encantar Registro 🪄"}
        </button>
      </form>
    </div>
  )
}

export default Register


