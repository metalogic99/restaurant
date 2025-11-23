import NavbarLoggedOut from "@/components/shared/NavbarLoggedOut";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <NavbarLoggedOut />
      {children}
    </>
  );
};

export default layout;
