import "../styles/globals.css";
import { Poppins, Lora } from "next/font/google";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import Contexts from "./Contexts";

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
    <Contexts>
      <html lang="en">
        <body
          className={`${primaryFont.variable} ${secondaryFont.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />
          <main className="flex-1 mt-16 pt-16">{children}</main>
          <Footer />
        </body>
    </html>
    </Contexts>
  );
}
