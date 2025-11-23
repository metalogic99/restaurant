import Image from "next/image";
import CommonSectionGuest from "./CommonSectionGuest";

export default function FooterLoggedOut() {
  return (
    <CommonSectionGuest>
      <footer>
        <div className="w-full h-1 bg-mintGreen mt-12"></div>
        <div className="w-full p-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logoLetter.png" // change this to your actual logo
              width={120}
              height={80}
              alt="Mint Restro Logo"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-orange-500">📍</span>
              <p>Babarmal, Kathmandu</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">📞</span>
              <p>+977 9851353599</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 whitespace-nowrap">
            Copyright © 2025 • All Rights Reserved
          </p>
        </div>
      </footer>
    </CommonSectionGuest>
  );
}
