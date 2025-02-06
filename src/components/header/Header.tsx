import { Home, Utensils, FileText, Book, BookOpenText } from "lucide-react"
import Link from "next/link"
import styles from "./Header.module.css"

export default function DashboardSidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link href="/Takeaway" className={styles.navLink}>
          <Home />
          <span className={styles.navLinkText}>Create Order</span>
        </Link>
        <Link href="/getBooking" className={styles.navLink}>
          <Utensils />
          <span className={styles.navLinkText}>My Bookings</span>
        </Link>
        <Link href="/review" className={styles.navLink}>
          <FileText />
          <span className={styles.navLinkText}>Create Review</span>
        </Link>
        <Link href="/myReviews" className={styles.navLink}>
          <BookOpenText />
          <span className={styles.navLinkText}>My Reviews</span>
        </Link>
        <Link href="/orders" className={styles.navLink}>
          <Book />
          <span className={styles.navLinkText}>My Orders</span>
        </Link>
      </nav>
    </aside>
  )
}


