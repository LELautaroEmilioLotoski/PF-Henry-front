"use client";

import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });

    try {
      const response = await login({ email, password });

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
      console.error("Login Error:", error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 space-y-6 max-w-sm mx-auto">
      <div>
        <label htmlFor="email" className="text-body mb-1 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
      </div>

      <div>
        <label htmlFor="password" className="text-body mb-1 block">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <button type="submit" className="button-primary">
        Iniciar sesión
      </button>

      <button
        type="button"
        onClick={() => (window.location.href = "/api/auth/login")}
        className="button-primary"
      >
        Iniciar sesión con Auth0
      </button>
    </form>
  );
};

export default Login;