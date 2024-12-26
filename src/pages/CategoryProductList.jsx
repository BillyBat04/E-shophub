import { useState, useEffect } from 'react';
import ProductList1 from '../components/productlist';
import { CiFilter } from "react-icons/ci";
import Arrange from '../components/arrange';

const CategoryProductList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const banners = [
        { id: 4, img: "src/assets/banner1.jpg" },
        { id: 5, img: "src/assets/banner2.jpg" },
        { id: 6, img: "src/assets/banne3.jpg" },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [banners.length]);


    return (
        <div className="xl:pl-[15%] bg-slate-100 xl:pr-[15%] h-screen w-screen overflow-x-hidden ">
            <div className="relative w-full h-full ">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${banners.length * 100}%`,
                    }}
                >
                    {banners.map((ban) => (
                        <div
                            key={ban.id}
                            className="w-full h-[300px] flex-shrink-0"
                            style={{ width: "100%" }}
                        >
                            <img
                                src={ban.img}
                                alt={`Banner ${ban.id}`}
                                className="h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
                <div className="w-full p-5 m-2 rounded-md bg-white shadow">
                    <h1 className="text-xl font-bold mb-4">All products</h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 border-r-2 border-gray-300">
                            <span className="font-medium">Brand</span>
                            <button className="px-3 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">
                                Samsung
                            </button>
                            <button className="px-3 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">
                                Xiaomi
                            </button>
                            <button className="px-3 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">
                                OPPO
                            </button>
                            <button className="px-3 py-1 mr-4 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">
                                Vivo
                            </button>
                        </div>

                        <div className="flex items-center gap-2 border-r-2 border-gray-300">
                            <span className="font-medium">ROM</span>
                            <button className="px-3 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">128GB</button>
                            <button className="px-3 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">64GB</button>
                            <button className="px-3 py-1 mr-4 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">256GB</button>

                        </div>

                        <div className="flex items-center gap-2 border-r-2 border-gray-300">
                            <span className="font-medium">Camera sau</span>
                            <button className="px-3 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">Trên 16MP</button>
                            <button className="px-3 mr-4 py-1 border rounded-full hover:bg-gray-200 hover:border-gray-400 transition duration-200">Từ 11MP đến 15MP</button>

                        </div>

                        <button onClick={togglePopup} className="px-4 py-1 border rounded-lg flex items-center gap-1">
                            <CiFilter /> All
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span className="text-red-500">NOW Giao siêu tốc 2H</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span className="text-red-500">TOP DEAL 25.12</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Siêu rẻ</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span className="text-green-500">FREESHIP XTRA</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>★ từ 4 sao</span>
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Arrange</span>
                            <Arrange />
                        </div>
                        {isOpen && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white rounded-lg w-[90%] max-w-xl p-6 shadow-lg relative">
                                    <button
                                        onClick={togglePopup}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                                    >
                                        ✕
                                    </button>
                                    <h2 className="text-lg font-bold mb-4">All filters</h2>

                                    <div className="mb-6 border-b-[1px] border-gray-200 pb-4">
                                        <h3 className="font-medium mb-2">Rating</h3>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                <span className="flex items-center">
                                                    ★★★★★ từ 4 sao
                                                </span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                <span className="flex items-center">
                                                    ★★★★★ từ 5 sao
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-6 border-b-[1px] border-gray-200 pb-4">
                                        <h3 className="font-medium mb-2">Price</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <button className="px-3 py-1 border rounded-full">
                                                Dưới 3.000.000
                                            </button>
                                            <button className="px-3 py-1 border rounded-full">
                                                3.000.000 → 4.000.000
                                            </button>
                                            <button className="px-3 py-1 border rounded-full">
                                                4.000.000 → 13.500.000
                                            </button>
                                            <button className="px-3 py-1 border rounded-full">
                                                Trên 2.000.000
                                            </button>
                                        </div>
                                        <div className="flex items-center mt-4 ">
                                            <input
                                                type="text"
                                                placeholder="From"
                                                className="border rounded p-2 w-1/2 mr-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="To"
                                                className="border rounded p-2 w-1/2"
                                            />
                                            <button className="text-blue-500 ml-2">Delete</button>
                                        </div>
                                    </div>

                                    <div className="mb-6 border-b-[1px] border-gray-200 pb-4">
                                        <h3 className="font-medium mb-2">Brand</h3>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Samsung
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Xiaomi
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <button
                                            className="px-4 py-2 border border-gray-300 rounded text-gray-600"
                                            onClick={togglePopup}
                                        >
                                            Delete all
                                        </button>
                                        <button className="px-4 py-2 bg-customBlack text-white rounded">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full -mt-10 m-2 bg-white rounded-md h-full">
                    <ProductList1 />
                </div>
            </div>
        </div>
    );
};

export default CategoryProductList;
