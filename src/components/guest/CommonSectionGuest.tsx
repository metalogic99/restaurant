import React from "react";

const CommonSectionGuest = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="max-w-7xl mx-auto overflow-x-hidden">
      {children}
    </section>
  );
};

export default CommonSectionGuest;
