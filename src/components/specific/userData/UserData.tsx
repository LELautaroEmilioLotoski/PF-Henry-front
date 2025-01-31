import FileUploadComponent from "@/app/Cloudinary/page";
import DashboardSidebar from "@/components/header/Header";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const backendToken = localStorage.getItem("backendToken")

  useEffect(() => {
    const registerUserIfNeeded = async () => {
      try {
        if (!user) return null;

        if(!backendToken){
          const userData = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            isComplete: false,
          };
  
          const response = await fetch(
            "http://localhost:3000/auth/signupWithAuth0",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );
  
          if (response.status === 400) {
            console.log("El usuario ya está registrado en el backend.");
          } else if (response.ok) {
            const data = await response.json();
            console.log("Usuario registrado con éxito:", data);
          } else {
            throw new Error("Error desconocido al registrar al usuario.");
          }
        }
      } catch (err) {
        console.error("Error al registrar usuario:", err);
      }
    };

    if (user) {
      registerUserIfNeeded();
    }
  }, [user]);

  useEffect(() => {
    const sendTokenToBackend = async () => {
      try {
        if (!user) return;

        const userData = {
          auth0Id: user.sub,
          name: user.name,
          email: user.email,
        };

        const backendResponse = await fetch(
          "http://localhost:3000/auth/signInWithAuth0",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        const backendData = await backendResponse.json();        
        const backendToken = await backendData.token;
        const userLoggedWithAuth0 = backendData.user;

        if (backendData) {
          localStorage.setItem("user", JSON.stringify(userLoggedWithAuth0));
          localStorage.setItem("backendToken", JSON.stringify(backendToken));
        }

      } catch (error) {
        console.error("Error al enviar los datos al backend:", error);
      }
    };

    if (user) {
      sendTokenToBackend();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/api/auth/logout";
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="bg-gray-50 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tus datos personales
        </h2>
        <p className="text-lg font-medium text-gray-600">
          Name: <span className="text-gray-800">{user?.name}</span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Email: <span className="text-gray-800">{user?.email}</span>
        </p>
      </div>
      <FileUploadComponent userprops = {user}/>
    </div>
  );
};

export default ProfilePage;
