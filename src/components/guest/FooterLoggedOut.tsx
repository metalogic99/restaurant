import Image from "next/image";
import CommonSectionGuest from "./CommonSectionGuest";
import LocationIcon from "./Location";
import PhoneIcon from "./PhoneIcon";

export default function FooterLoggedOut() {
  return (
    <CommonSectionGuest>
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-1 bg-mintGreen mt-12"></div>

        <div className="w-full py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="/logoLetter.png"
              width={120}
              height={80}
              alt="Mint Restro Logo"
              className="object-contain"
            />
          </div>

          <div
            id="contact"
            className="flex flex-col  gap-6 md:gap-3 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <LocationIcon />
              <p>Babarmal, Kathmandu</p>
            </div>

            <div className="flex items-center gap-2">
              <PhoneIcon />
              <p>+977 9851353599</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 whitespace-nowrap text-center md:text-right">
            Copyright © 2025 • All Rights Reserved
          </p>
        </div>
      </footer>
    </CommonSectionGuest>
  );
}
