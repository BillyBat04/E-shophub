import { useState } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Phone");

  const shopSelections = {
    Phone: [
      "iPhone 16",
      "iPhone 16 Pro",
      "iPhone 16 Pro Max",
      "Samsung Galaxy Z-Fold 6",
      "Samsung Galaxy S24 Ultra",
      "Accessories",
    ],
    Tablet: ["iPad Pro", "Samsung Tab S9", "Microsoft Surface Go", "Xiaomi Pad 6", "Accessories"],
    Laptop: [
      "MacBook Pro M3",
      "Dell XPS 13",
      "HP Spectre x360",
      "Lenovo ThinkPad",
      "Accessories",
    ],
    Watch: [
      "Apple Watch Series 9",
      "Samsung Galaxy Watch 6",
      "Garmin Forerunner",
      "Fitbit Versa",
      "Accessories",
    ],
    Accessories: [
      "AirPods Pro",
      "Samsung Buds 2",
      "Logitech MX Master 3",
      "Razer Headphones",
      "Phone Cases",
    ],
  };

  return (
    <div className="w-full h-[35px] z-50 flex justify-center bg-gray-900">
  <div
    className="relative w-full h-full justify-center flex items-center"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    <div className="flex space-x-16 items-center">
      {Object.keys(shopSelections).map((category) => (
        <button
          key={category}
          className="flex flex-row items-center px-4 py-2 group relative overflow-hidden rounded-lg"
          onMouseEnter={() => setActiveCategory(category)}
        >
          <div className="absolute inset-0 w-full h-full bg-gray-700 opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-lg"></div>
          <img
            src={`/src/assets/${category.toLowerCase()}.png`}
            className="hidden sm:block w-6 h-6 mr-2 z-10 group-hover:scale-125 transition-transform duration-300"
          />
          <label className="text-white z-10 group-hover:text-gray-300 transition-colors duration-300 font-medium">
            {category}
          </label>
        </button>
      ))}
    </div>

    {/* Dropdown Menu */}
    {isOpen && (
      <div
        className="absolute left-0 top-full bg-gray-800 text-white p-8 w-full grid grid-cols-3 gap-8 shadow-xl rounded-b-lg
          transition-all duration-300"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div>
          <h3 className="text-gray-400 mb-3 font-semibold text-lg">
            Best Seller for {activeCategory}
          </h3>
          <ul className="space-y-3">
            {shopSelections[activeCategory].map((item, index) => (
              <li
                key={index}
                className="hover:text-gray-300 cursor-pointer transition-colors duration-200 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands Section */}
        <div>
          <h3 className="text-gray-400 mb-3 font-semibold text-lg">
            Top Brands
          </h3>
          <ul className="grid grid-flow-row grid-cols-2 gap-4">
            {["Apple", "Samsung", "Xiaomi", "Google", "Oppo"].map((brand, i) => (
              <li
                key={i}
                className="hover:text-gray-300 cursor-pointer transition-colors duration-200 text-sm"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default DropdownMenu;
