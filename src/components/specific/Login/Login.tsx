"use client";

import type React from "react";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./Login.module.css";
import { Eye, EyeOff } from "lucide-react";
import { validateLoginForm } from "@/helpers/validate";

interface ILoginProps {
  email: string;
  password: string;
}

interface ILoginErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [values, setValues] = useState<ILoginProps>({ email: "", password: "" });
  const [errors, setErrors] = useState<ILoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    setErrors(validateLoginForm({ ...values, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await login(values);

      if (response?.data?.token && response?.data?.user) {
        const { token, user } = response.data;
        Cookies.set("token", token, { expires: 7 });
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "worker") {
          router.push("/employee/dashboard");
        } else if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/profile");
        }
      } else {
        setServerError("Invalid credentials");
      }
    } catch (error) {
      setServerError("Magic error. Fix your wand and try again!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2 className={styles.formTitle}>Hogwarts Magic Portal</h2>

        {/* EMAIL */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Owl Mail 🦉</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="harry.potter@hogwarts.edu"
            value={values.email}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Magic Password 🔮</label>
          <div className={styles.passwordField}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              className={styles.inputField}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
        </div>
        {serverError && <p className={styles.errorMessage}>{serverError}</p>}
        <button type="submit" className={styles.button} disabled={Object.keys(errors).length > 0}>
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
  );
};

export default Login;
