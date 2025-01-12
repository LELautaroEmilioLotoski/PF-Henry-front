"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Dashboard from "./Dashboard/page";
import './globals.css';


const Home = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  return (
    <div>
      {user ? (
       <Dashboard/>
      ) : (
        <div>
          <div className="bg-slate-400 flex justify-center items-center">
            <h1>Este es un home</h1>
          </div>
            <Link href="/Login" className="flex justify-center items-center p-52 ">Ir al login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
