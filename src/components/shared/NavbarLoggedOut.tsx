"use client";

import Image from "next/image";
import Link from "next/link";

const navbarItems = [
  { name: "Home", to: "/guest" },
  { name: "Reservation", to: "/guest/reservation" },
  { name: "About Us", to: "/guest/#about" },
  { name: "Contact Us", to: "/guest/#footer" },
];

const NavbarLoggedOut = () => {
  return (
    <div className="w-screen">
      <div className="max-w-7xl mx-auto ">
        <nav className="w-full flex justify-between items-center px-10 py-5 shadow-s">
          <div>
            <Image height={50} width={50} alt="mint logo" src="/logo.png" />
          </div>
          <ul className="flex gap-8">
            {navbarItems.map((item, indx) => (
              <LiItem key={indx} to={item.to}>
                {item.name}
              </LiItem>
            ))}
          </ul>
        </nav>
      </div>
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
    <Link href={to}>
      <li
        className="relative cursor-pointer hover:text-forestGreenLight 
  after:content-[''] after:absolute after:left-1/2 after:bottom-0
  after:h-[2px] after:bg-forestGreenLight after:w-0
  after:transition-all after:duration-300 after:-translate-x-1/2
  hover:after:w-full"
      >
        {children}
      </li>
    </Link>
  );
};
