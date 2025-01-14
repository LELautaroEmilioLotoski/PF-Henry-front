"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Search, UserPlus } from "lucide-react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="text-xl font-bold">The Three Broomsticks</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div
              className={`transition-all duration-300 ${
                showSearch ? "w-64" : "w-0"
              }`}
            >
              <input
                type="search"
                placeholder="Buscar..."
                className={`absolute right-0 top-0 w-full rounded-md border border-gray-300 px-3 py-2 ${
                  showSearch ? "opacity-100" : "invisible opacity-0"
                }`}
              />
            </div>
            <button
              className="relative z-10 p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            <Link href="/login">
              <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </button>
            </Link>
          </div>

          <div className="sm:hidden">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
