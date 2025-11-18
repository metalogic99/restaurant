"use client";

import React from "react";
import { SocketProvider } from "../providers/SocketProvider";
import Providers from "./Providers";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login";

  return (
    <SocketProvider>
      <Providers>
        {!hideNavbar && <Navbar />}
        {children}
      </Providers>
    </SocketProvider>
  );
};

export default MainLayout;
