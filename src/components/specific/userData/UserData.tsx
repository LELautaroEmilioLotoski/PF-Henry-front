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

  return (
    <div>
      <h1>Bienvenido, {user?.name}</h1>
    </div>
  );
};

export default ProfilePage;
