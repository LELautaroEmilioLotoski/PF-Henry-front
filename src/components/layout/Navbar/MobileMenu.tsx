"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100/50 rounded-md transition-colors">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] sm:w-[300px]">
        {/* Título accesible para lectores de pantalla */}
        <div className="sr-only">
          <h2 id="menu-title">Menu</h2>
        </div>

        {/* Descripción accesible para lectores de pantalla */}
        <div className="sr-only">
          <p id="menu-description">
            Menu with navigation links and authentication options.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <NavLinks />
          <div className="flex flex-col gap-2">
            <AuthButtons />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


