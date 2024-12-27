import { useState } from "react";

function FilterPopup({ isOpen, togglePopup }) {
    const [selectedRating, setSelectedRating] = useState(""); // For rating section
    const [selectedPrice, setSelectedPrice] = useState(""); // For price section
    const [selectedBrand, setSelectedBrand] = useState(""); // For brand section
    const [priceRange, setPriceRange] = useState({ from: "", to: "" }); // For price input fields

    const handleRatingChange = (stars) => {
        setSelectedRating(stars); // Set the number of stars as the selected rating
        console.log(`Selected Rating: ${stars}`); // Optional: Log or use this value elsewhere
    };
    

    const handlePriceChange = (value) => {
        setSelectedPrice(value);
    };

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
    };

    const handlePriceInputChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) { // Allow only numbers
            setPriceRange((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDeletePriceInputs = () => {
        setPriceRange({ from: "", to: "" });
    };

    const handleDeleteAll = () => {
        setSelectedRating("");
        setSelectedPrice("");
        setSelectedBrand("");
        setPriceRange({ from: "", to: "" });
    };
    

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-[90%] max-w-xl p-6 shadow-lg relative">
                    <button
                        onClick={togglePopup}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                    <h2 className="text-lg font-bold mb-4">All filters</h2>

                    {/* Rating Section */}
                    <div className="mb-6 border-b-[1px] border-gray-200 pb-4">
                        <h3 className="font-medium mb-2">Rating</h3>
                        <div className="flex items-center space-x-4">
                            {[4, 5].map((stars) => (
                                <button
                                    key={stars}
                                    onClick={() => handleRatingChange(stars)}
                                    className={`px-3 py-1 border rounded-full transition-all duration-200 ${selectedRating === stars
                                        ? "bg-customBlack text-white"
                                        : "hover:bg-gray-200"
                                        }`}
                                >
                                    {"★".repeat(stars)} từ {stars} sao
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Price Section */}
                    <div className="mb-6 border-b-[1px] border-gray-200 pb-4">
                        <h3 className="font-medium mb-2">Price</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Dưới 3.000.000",
                                "3.000.000 → 4.000.000",
                                "4.000.000 → 13.500.000",
                                "Trên 2.000.000",
                            ].map((price, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePriceChange(price)}
                                    className={`px-3 py-1 border rounded-full transition-all duration-200 ${selectedPrice === price
                                        ? "bg-customBlack text-white"
                                        : "hover:bg-gray-200"
                                        }`}
                                >
                                    {price}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                type="text"
                                name="from"
                                value={priceRange.from}
                                placeholder="From"
                                onChange={handlePriceInputChange}
                                className="border rounded p-2 w-1/2 mr-2 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="to"
                                value={priceRange.to}
                                placeholder="To"
                                onChange={handlePriceInputChange}
                                className="border rounded p-2 w-1/2 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <button
                                onClick={handleDeletePriceInputs}
                                className="text-blue-500 ml-2 hover:text-blue-600 active:text-blue-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Brand Section */}
                    <div className="mb-6 border-b-[1px] border-gray-200 pb-4">
                        <h3 className="font-medium mb-2">Brand</h3>
                        <div className="flex items-center space-x-4">
                            {["Samsung", "Xiaomi"].map((brand, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleBrandChange(brand)}
                                    className={`px-3 py-1 border rounded-full transition-all duration-200 ${selectedBrand === brand
                                        ? "bg-customBlack text-white"
                                        : "hover:bg-gray-200"
                                        }`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleDeleteAll}
                            className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
                        >
                            Delete all
                        </button>
                        <button
                            className="px-4 py-2 bg-customBlack text-white rounded hover:bg-opacity-90 active:bg-opacity-80 transition-all duration-200"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default FilterPopup;
