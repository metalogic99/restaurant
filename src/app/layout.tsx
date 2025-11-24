import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Prociono, RocknRoll_One } from "next/font/google";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins",
});
const rocknRoll = RocknRoll_One({
  subsets: ["latin"],
  weight: ["400"], // choose what you need
  variable: "--font-rocknrollOne",
});

const prociono = Prociono({
  subsets: ["latin"],
  weight: ["400"], // choose what you need
  variable: "--font-prociono",
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
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${prociono.variable} ${rocknRoll.variable} antialiased`}
      >
        <UserProvider user={user}>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
