import React from "react";

const CommonSection = ({ children }: { children: React.ReactNode }) => {
  return <section className="max-w-7xl mx-auto mt-8">{children}</section>;
};

export default CommonSection;
