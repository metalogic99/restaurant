"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navbarItems = [
  { name: "Home", to: "/guest" },
  { name: "Reservation", to: "/guest/reservation" },
  { name: "About Us", to: "/guest/#about" },
  { name: "Contact Us", to: "/guest/#contact" },
];

const NavbarLoggedOut = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="w-screen">
      <div className="max-w-7xl mx-auto">
        <nav className="w-full flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-4">
            <Image height={50} width={50} alt="mint logo" src="/logo.png" />
          </div>

          <ul className="hidden md:flex items-center gap-8">
            {navbarItems.map((item, indx) => (
              <LiItem key={indx} to={item.to}>
                {item.name}
              </LiItem>
            ))}
          </ul>
          <button className="md:hidden text-3xl" onClick={() => setOpen(true)}>
            <div className="flex flex-col justify-center gap-1">
              <span className="w-6 h-1 bg-forestGreen rounded-sm"></span>
              <span className="w-4 h-1 bg-forestGreen rounded-sm"></span>
              <span className="w-2 h-1 bg-forestGreen rounded-sm"></span>
            </div>
          </button>
        </nav>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <Image height={40} width={40} alt="logo" src="/logo.png" />
          <button className="text-3xl" onClick={closeMenu}>
            <X />
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-8 mt-8">
          {navbarItems.map((item, indx) => (
            <li key={indx} onClick={closeMenu}>
              <Link
                href={item.to}
                className="block text-lg font-medium hover:text-forestGreenLight transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default NavbarLoggedOut;

const LiItem = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <li>
      <Link
        href={to}
        className="relative cursor-pointer hover:text-forestGreenLight 
          after:content-[''] after:absolute after:left-1/2 after:-bottom-1
          after:h-[2px] after:bg-forestGreenLight after:w-0
          after:transition-all after:duration-300 after:-translate-x-1/2
          hover:after:w-full"
      >
        {children}
      </Link>
    </li>
  );
};
