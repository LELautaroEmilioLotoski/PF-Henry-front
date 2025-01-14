import "../styles/globals.css";
import { Poppins, Lora } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";

const primaryFont = Poppins({
  subsets: ["latin"],
  variable: "--primary-font",
  weight: ["400", "700"],
});
const secondaryFont = Lora({
  subsets: ["latin"],
  variable: "--secondary-font",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${primaryFont.variable} ${secondaryFont.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
