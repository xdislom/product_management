import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopAdmin — O'zbekistonning Top Do'koni",
  description: "Eng sifatli elektronika, kiyim-kechak va maishiy texnikalarni arzon narxlarda xarid qiling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <QueryProvider>
          <AntdRegistry>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
            <Footer />
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
