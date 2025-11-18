"use client";
import React, { createContext, useContext, ReactNode } from "react";

interface UserCtxProps {
  user: any;
}

const UserCtx = createContext<UserCtxProps | undefined>(undefined);

const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: any;
}) => {
  return <UserCtx.Provider value={{ user }}>{children}</UserCtx.Provider>;
};

const useUser = (): UserCtxProps => {
  const context = useContext(UserCtx);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
