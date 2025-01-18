"use client";

import Link from "next/link";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useUserContext } from "@/context/UserContext";

export default function AuthButtons() {
  const { userNormal, logoutUser } = useUserContext();

  return (
    <>
      {userNormal ? (
        <button
          onClick={logoutUser}
          className="flex items-center px-4 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      ) : (
        <>
          <Link 
            href="/login" 
            className="flex items-center px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
          <Link 
            href="/register" 
            className="flex items-center px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </Link>
        </>
      )}
    </>
  );
}