import FooterLoggedOut from "@/components/guest/FooterLoggedOut";
import NavbarLoggedOut from "@/components/shared/NavbarLoggedOut";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <NavbarLoggedOut />
      {children}
      <FooterLoggedOut />
    </>
  );
};

export default layout;
