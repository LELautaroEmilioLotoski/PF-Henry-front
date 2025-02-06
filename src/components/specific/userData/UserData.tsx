"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import DashboardSidebar from "@/components/header/Header";
import FileUploadComponent from "@/app/Cloudinary/page";
import { signUpWithAuth0, signInWithAuth0 } from "@/helpers/auth.helper";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user) return;

    const registerUserIfNeeded = async () => {
      try {
        const backendToken = Cookies.get("token");

        if (!backendToken) {
          const userData = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            isComplete: false,
          };

          await signUpWithAuth0(userData);
          console.log("Usuario registrado con éxito");
        }
      } catch (err) {
        console.error("Error al registrar usuario:", err);
      }
    };

    registerUserIfNeeded();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const sendTokenToBackend = async () => {
      try {
        const userData = { auth0Id: user.sub, name: user.name, email: user.email };
        const backendUser = await signInWithAuth0(userData);
        localStorage.setItem("user", JSON.stringify(backendUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al enviar los datos al backend:", error);
      }
    };

    sendTokenToBackend();
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userDataLocalStorage = localStorage.getItem("user");
  const userData = userDataLocalStorage ? JSON.parse(userDataLocalStorage) : null;

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="bg-gray-50 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tus datos personales</h2>
        <p className="text-lg font-medium text-gray-600">
          Name: <span className="text-gray-800">{userData?.name || "No disponible"}</span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Email: <span className="text-gray-800">{userData?.email || "No disponible"}</span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Address: <span className="text-gray-800">{userData?.address || "No disponible"}</span>
        </p>
      </div>
      <FileUploadComponent userprops={{ email: userData?.email, image_url: userData?.picture }} />
    </div>
  );
};

export default ProfilePage;