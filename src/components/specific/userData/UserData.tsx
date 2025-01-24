import DashboardSidebar from "@/components/header/Header";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    const sendUserDataToBackend = async () => {
      if (user) {
        try {
          const userData = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
          };

          console.log("Sending data:", userData);

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

          //   if (!response.ok) {
          //     console.log(response);

          //     throw new Error("Error al enviar datos al backend");
          //   }

          const data = await response.json();
          console.log("Datos guardados:", data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    if (user) {
      sendUserDataToBackend();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

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
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
