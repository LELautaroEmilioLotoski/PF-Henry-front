"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import DashboardSidebar from "@/components/header/Header";
import { signUpWithAuth0, signInWithAuth0 } from "@/helpers/auth.helper";
import Cookies from "js-cookie";
import Cloudinary from "../Cloudinary/Cloudinary";

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
          console.log("User registered successfully");
        }
      } catch (err) {
        console.error("Error registering user:", err);
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
        console.error("Error sending data to backend:", error);
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
    return <div>Loading...</div>;
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your personal data
        </h2>
        <p className="text-lg font-medium text-gray-600">
          Name:{" "}
          <span className="text-gray-800">
            {userData?.name || "Not available"}
          </span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Email:{" "}
          <span className="text-gray-800">
            {userData?.email || "Not available"}
          </span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Address:{" "}
          <span className="text-gray-800">
            {userData?.address || "Not available"}
          </span>
        </p>
      </div>
      {userData ? <Cloudinary /> : <h2>Cloudinary not found</h2>}
    </div>
  );
};

export default ProfilePage;
