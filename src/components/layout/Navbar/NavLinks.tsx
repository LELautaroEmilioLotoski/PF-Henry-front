"use client";

import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { decodeJwt } from 'jose';

export default function NavLinks() {
  const { userNormal } = useUserContext();
  const { user } = useUser();
  const [profileLink, setProfileLink] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
  
    if (token) {
      try {
        const decodedToken = decodeJwt(token);
        const roles = decodedToken?.roles;
  
        if (roles && Array.isArray(roles)) {
          if (roles.includes("worker")) {
            setProfileLink("/employee/dashboard");
          } else if (roles.includes("admin")) {
            setProfileLink("/admin/dashboard");
          } else {
            setProfileLink("/profile");
          }
        } else {
          setProfileLink("/profile");
        }
      } catch {
        setProfileLink("/profile");
      }
    } else {
      setProfileLink("/profile");
    }
  }, [user, userNormal]);

  return (
    <>
      <Link
        href="/menu"
        className="text-gray-700 relative group hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        <span>Menu</span>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </Link>
      
      {(userNormal || user) && profileLink && (
        <Link
          href={profileLink}
          className="text-gray-700 relative group hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          <span>Profile</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      )}
    </>
  );
}