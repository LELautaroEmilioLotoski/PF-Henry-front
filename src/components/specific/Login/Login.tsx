"use client";
// import { useUser } from "@auth0/nextjs-auth0/client";

// export default function LoginPage() {
//   const { isLoading } = useUser();

//   if (isLoading) return null;
//   return (
//     <div>
//       <h2 className="flex justify-center items-center">
//         Inicia sesión para continuar
//       </h2>
//       <a href="/api/auth/login" className="flex justify-center items-center p-52">Login</a>
//     </div>
//   );
// }

import { useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { login } from "@/helpers/auth.helper";
import { AuthResponse } from "@/interfaces/Types";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserContext();
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(response);
      

      if (response) {
        const authData: AuthResponse = {
          data: {
            token: response.data.token,
            user: response.data.user,
          },
          loggin: response.loggin,
        };
        setUser(authData);
        router.push("/");
        
        
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.log("Login Error:", error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
        {error && <p>{error}</p>}
      </form>
      <div>
        <a
          href="/api/auth/login"
          className="flex justify-center items-center p-52"
        >
          auth0
        </a>
      </div>
    </>
  );
};

export default Login;

