import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from "@/components/Navbar";

import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Management App | Pro",
  description: "Advanced E-commerce and Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AntdRegistry>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-10">
              {children}
            </main>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
