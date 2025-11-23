"use client";

import React from "react";
import { SocketProvider } from "../providers/SocketProvider";
import Providers from "./Providers";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <Providers>{children}</Providers>
    </SocketProvider>
  );
};

export default MainLayout;
