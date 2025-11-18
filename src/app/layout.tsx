import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// import Providers from "@/components/shared/Providers";
import { Toaster } from "@/components/ui/sonner";

import MainLayout from "@/components/shared/MainLayout";
import { UserProvider } from "@/components/providers/RoleProvider";
import { getUser } from "@/utils/getUser";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mint Restro",
  description: "Mintro Restaurant Pos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider user={user}>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
