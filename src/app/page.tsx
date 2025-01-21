"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import HomeView from "@/views/HomeView/HomeView";
import DashboardView from "@/views/DashboardView/DashboardView";
 
const Home = () => {
  return (
    <div> 
      <HomeView/>
    </div>
  );
};
 
export default Home;
