import { React, useState } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="w-full h-[35px] z-50 flex justify-center bg-customGray">
      <div className="w-auto h-full flex items-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}>
        {/* Button Group */}
        <div className="flex space-x-16 items-center">
          <button className="flex flex-row items-center">
            <img
              src="src/assets/mobile.png"
              className="hidden sm:block w-5 h-5"
            />
            <label className="text-white">Phone</label>
          </button>
          <button className="flex flex-row items-center">
            <img
              src="src/assets/tablet.png"
              className="hidden sm:block w-[18px] h-[18px] mr-1"
            />
            <label className="text-white">Tablet</label>
          </button>
          <button className="flex flex-row items-center">
            <img
              src="src/assets/laptop.png"
              className="hidden sm:block w-6 h-6 mr-1"
            />
            <label className="text-white">Laptop</label>
          </button>
          <button className="flex flex-row items-center">
            <img
              src="src/assets/smartwatch.png"
              className="hidden sm:block w-5 h-5 mr-1"
            />
            <label className="text-white">Watch</label>
          </button>
          <button className="flex flex-row items-center">
            <img
              src="src/assets/headphone.png"
              className="hidden sm:block w-[18px] h-[18px] mr-1"
            />
            <label className="text-white">Accessories</label>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="mt-5 absolute left-0 top-16 bg-customBlack text-white p-6 w-full grid grid-cols-3 gap-8
                    transition-opacity duration-300 opacity-100"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            {/* Shop Section */}
            <div>
              <h3 className="text-gray-400 mb-2">Best seller</h3>
              <ul className="space-y-3">
                <li className="hover:text-gray-300 cursor-pointer">
                  iPhone 16
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  iPhone 16 Pro
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  iPhone 16 Pro Max
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Samsung Galaxy Z-Fold 6
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Samsung Galaxy S24 Ultra
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Accessories
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-gray-400 mb-2">Brands</h3>
              <ul className="grid grid-flow-row grid-cols-2 gap-3">
                <li className="hover:text-gray-300 cursor-pointer">
                  Apple iPhone
                </li>
                <li className="hover:text-gray-300 cursor-pointer">Samsung</li>
                <li className="hover:text-gray-300 cursor-pointer">Xiaomi</li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Google Pixel
                </li>
                <li className="hover:text-gray-300 cursor-pointer">Oppo</li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Apple iPhone
                </li>
                <li className="hover:text-gray-300 cursor-pointer">Samsung</li>
                <li className="hover:text-gray-300 cursor-pointer">Xiaomi</li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Google Pixel
                </li>
                <li className="hover:text-gray-300 cursor-pointer">Oppo</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
