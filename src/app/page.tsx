"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import HomeView from "@/views/HomeView/HomeView";
import DashboardView from "@/views/DashboardView/DashboardView";
 
const Home = () => {
  const { user, isLoading } = useUser();
 
  if (isLoading) return null;
  return (
    <div>
      {user ? (
        <DashboardView/>
      ) : (
        <HomeView/>
      )}
    </div>
  );
};
 
export default Home;
