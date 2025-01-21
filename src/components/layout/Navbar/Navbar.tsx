import Link from "next/link";
import NavLinks from "@/components/layout/Navbar/NavLinks";
import AuthButtons from "@/components/layout/Navbar/AuthButtons";
import MobileMenu from "@/components/layout/Navbar/MobileMenu";

export default function Navbar() {
  return (
    <nav className="top-0 z-50 w-full bg-white/50 backdrop-blur-sm border-b border-gray-200/20 shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600/80 backdrop-blur-sm" />
            <span className="text-xl font-bold">The Three Broomsticks</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center ml-auto space-x-6">
          <NavLinks />
          <AuthButtons />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}