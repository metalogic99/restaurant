// app/dashboard/layout.tsx
import { SocketProvider } from "@/components/providers/SocketProvider";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function layout({ children }: DashboardLayoutProps) {
  return (
    <>
      <SocketProvider>{children}</SocketProvider>
    </>
  );
}
