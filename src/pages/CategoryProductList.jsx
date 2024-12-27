import { useState, useEffect } from 'react';
import ProductList1 from '../components/productlist';
import { CiFilter } from "react-icons/ci";
import Arrange from '../components/arrange';
import FilterPopup from '../components/filterpopup';

const CategoryProductList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const banners = [
        { id: 4, img: "/src/assets/banner1.jpg" },
        { id: 5, img: "/src/assets/banner2.jpg" },
        { id: 6, img: "/src/assets/banner3.jpg" },
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
            <div className="relative w-full h-full overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className="flex-shrink-0 w-full h-[250px]"
                        >
                            <img
                                src={banner.img}
                                alt={`Banner ${banner.id}`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="w-full p-5 mt-3 rounded-md bg-white shadow">
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
                        <FilterPopup isOpen={isOpen} togglePopup={togglePopup}/>

                    </div>
                </div>
                <div className="w-full -mt-10 bg-white rounded-md h-full">
                    <ProductList1 />
                </div>
            </div>
        </div>
    );
};

export default CategoryProductList;
