"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Dashboard from "@/app/dashboard/page";

const HomeView = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  return (
    <div>
      {user ? (
        <Dashboard />
      ) : (
        <Link href="/login" className="flex justify-center items-center bg-red-300">
          Ir al login
        </Link>
      )}
    </div>
  );
};

export default HomeView;
