import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Xenius Tolderlund | Portfolio",
  description:
    "Portfolio for Xenius Tolderlund – nyuddannet frontend-udvikler.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
