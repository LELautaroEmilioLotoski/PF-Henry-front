import {
  Home,
  Utensils,
  FileText,
  Book,
  BookOpenText,
} from "lucide-react";
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
          Create Order
        </Link>
        <Link
          href="/orders"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <Book />
          My Orders
        </Link>
        <Link
          href="/createBooking"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <Utensils className="mr-2 h-4 w-4" />
          Create Reservation
        </Link>
        <Link
          href="/getBooking"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <Utensils className="mr-2 h-4 w-4" />
          My Reservations
        </Link>
        <Link
          href="/review"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          Write Review
        </Link>
        <Link
          href="/myReviews"
          className="flex align-middle items-center gap-8 p-2 w-full justify-start"
        >
          <BookOpenText />
          My Reviews
        </Link>
      </nav>
    </aside>
  );
}


