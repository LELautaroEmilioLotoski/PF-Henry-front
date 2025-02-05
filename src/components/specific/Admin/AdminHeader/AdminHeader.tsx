import { Utensils, Users, FileText, UserPen } from 'lucide-react'
import Link from 'next/link'

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block h-[100%]">
      <nav className="space-y-2">
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Utensils className="mr-2 h-4 w-4" />
          Menu
        </button>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Clients
        </button>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Employee
        </button>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Orders
        </button>
        <Link href="/admin/createEmployee" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <UserPen className="mr-2 h-4 w-4" />
          Create Employee
        </Link>
        <Link href="/admin/createMenuItem" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <UserPen className="mr-2 h-4 w-4" />
          Create Product
        </Link>
        <Link href="/admin/editMenuItem" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <UserPen className="mr-2 h-4 w-4" />
          Edit Product
        </Link>
        <Link href="/admin/editCombo" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <UserPen className="mr-2 h-4 w-4" />
          Edit Combo
        </Link>
      </nav>
    </aside>
  )
}

