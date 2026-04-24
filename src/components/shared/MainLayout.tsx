"use client";

import React from "react";
import Providers from "./Providers";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default MainLayout;
