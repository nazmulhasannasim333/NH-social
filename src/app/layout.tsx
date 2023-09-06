import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import AuthProvider from "../utils/AuthProvider";
import Providers from "../utils/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NH Social || Home",
  description: "NH Social App",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
