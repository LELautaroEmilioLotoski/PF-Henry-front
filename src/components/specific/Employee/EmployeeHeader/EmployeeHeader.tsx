import { Home, ClipboardList, Users, Settings, UserCheck, Box, Clipboard } from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";


export default function EmployeeHeader() {
  return (
    <aside className="w-64 bg-blue-100 p-6 hidden md:block h-screen shadow-lg">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h2 className="text-lg font-semibold text-gray-800">The Three Broomsticks</h2>
      </div>

      {/* Navegación */}
      <nav className="space-y-3">
        <NavItem href="/employee/dashboard" icon={Home} label="Inicio" />
        <NavItem href="/employee/reservations" icon={Clipboard} label="Reservas" />
        <NavItem href="/employee/orders" icon={ClipboardList} label="Órdenes" />
        <NavItem href="/employee/users" icon={Users} label="Usuarios" />
      </nav>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: ElementType;
  label: string;
}
// Componente reutilizable para cada opción del menú
function NavItem({ href, icon: Icon, label }: NavItemProps) {
  return (
    <Link href={href} className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-200 hover:text-blue-800 rounded-lg transition">
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
