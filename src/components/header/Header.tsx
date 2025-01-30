import { Home, Utensils, Users, FileText, Book } from "lucide-react";
import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block h-[100%]">
      <nav className="space-y-2">
        <Link
          href="/Takeaway"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <Home className="mr-2 h-4 w-4" />
          Crear pedido
        </Link>
        <Link
          href="/getBooking"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <Utensils className="mr-2 h-4 w-4" />
          Mis reservas
        </Link>
        <button className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Editar perfil
        </button>
        <Link href="/review" className="flex align-middle items-center gap-8 p-2 w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Crear reseña
        </Link>
        <Link
          href="/orders"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <Book />
          Mis ordenes
        </Link>
      </nav>
    </aside>
  );
}
