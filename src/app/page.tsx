"use client";
import React from "react";
import "@/styles/globals.css";
import HomeView from "@/views/HomeView/HomeView";
import { DobbyAssistant } from "@/components/specific/Chatbot/Chatbot";
 
const Home = () => {
  return (
    <div> 
      <HomeView/>
      <DobbyAssistant />
    </div>
  );
};
 
export default Home;
