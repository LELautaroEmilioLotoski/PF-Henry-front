import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
        <Navbar/>
          {children}
        <Footer/>
        </body>
      </UserProvider>
    </html>
  );
}
