import { Home, ClipboardList, Users, Clipboard } from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { decodeJwt } from 'jose';

export default function EmployeeHeader() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = decodeJwt(token);
        const roles = decodedToken?.roles;

        if (roles && Array.isArray(roles)) {
          if (roles.includes("worker")) {
            setUserRole("worker");
          } else if (roles.includes("admin")) {
            setUserRole("admin");
          }
        }
      } catch {
        setUserRole(null);
      }
    }
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block h-screen">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-amber-500 rounded-lg mr-3 flex items-center justify-center">
          <span className="text-white font-bold">TB</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">The Three Broomsticks</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        <NavItem 
          href={userRole === "admin" ? "/admin/dashboard" : "/employee/dashboard"} 
          icon={Home} 
          label="Dashboard" 
        />
        
        {/* Mostrar los siguientes enlaces tanto para admin como para worker */}
        {(userRole === "admin" || userRole === "worker") && (
          <>
            <NavItem href="/employee/users" icon={Users} label="Clients" />
            <NavItem href="/employee/reservations" icon={Clipboard} label="Reservations" />
            <NavItem href="/employee/orders" icon={ClipboardList} label="Orders" />
          </>
        )}

        {/* Enlaces solo visibles para admin */}
        {userRole === "admin" && (
          <>
            <NavItem href="/admin/getAllUsers" icon={Users} label="Users" />
            <NavItem href="/admin/createEmployee" icon={Clipboard} label="Create Employee" />
            <NavItem href="/admin/createMenuItem" icon={Clipboard} label="Create Product" />
            <NavItem href="/admin/editMenuItem" icon={Clipboard} label="Edit Product" />
            <NavItem href="/admin/editCombo" icon={Clipboard} label="Edit Combo" />
          </>
        )}
      </nav>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: ElementType;
  label: string;
}

function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const isActive = typeof window !== "undefined" && window.location.pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
        ${isActive ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
    >
      <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-amber-600" : "text-gray-400"}`} />
      <span>{label}</span>
    </Link>
  );
}