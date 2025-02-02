"use client";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavLinks() {
  const { userNormal } = useUserContext();
  const { user } = useUser();
  return (
    <>
      <Link
        href="/menu"
        className="text-gray-700 relative group hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        <span>Menu</span>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </Link>
      {userNormal && (
        <Link
          href="/profile"
          className="text-gray-700 relative group hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          <span>Profile</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      )}
      {user && (
        <Link
          href="/profile"
          className="text-gray-700 relative group hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          <span>Profile</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      )}
    </>
  );
}
