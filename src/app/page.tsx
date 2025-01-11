"use client";
import Link from "next/link";
import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Este es un home</h1>
      <Link href="/Login">Login</Link>
    </div>
  )
}

export default Home