import { Home, Utensils, Users, FileText, Settings, User, UserPen } from 'lucide-react'
import Link from 'next/link'

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block h-[100%]">
      <nav className="space-y-2">
        <Link href="/admin/inicio" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Inicio
        </Link>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Utensils className="mr-2 h-4 w-4" />
          Menú
        </button>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Clientes
        </button>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Pedidos
        </button>
        <Link href="/admin/employee" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <UserPen className="mr-2 h-4 w-4" />
          Empleados
        </Link>
      </nav>
    </aside>
  )
}

