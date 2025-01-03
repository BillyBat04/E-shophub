import { useState, useEffect, useCallback } from 'react';
import ProductList1 from '../components/productlist';
import { CiFilter } from "react-icons/ci";
import Arrange from '../components/arrange';
import FilterPopup from '../components/filterpopup';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../config/api';

const CategoryProductList = () => {
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation()
    const [list, setList] = useState(null)
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

    const handleSingleFilterClick = (key, value) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
        window.location.reload()
    };

    const getList = useCallback(async () => {
        const response = await axiosInstance.get(`/displayed-product/search/filter/${category}/${location.search}`)
        setList(response.data)
    }, [category,location.search])

    useEffect(() => {
        getList()
    }, [getList])

    const isHighlighted = (key, value) => {
        return searchParams.get(key) === value;
    };

    return (
        <div className="xl:pl-[15%] min-h-screen bg-slate-100 xl:pr-[15%] w-screen overflow-x-hidden ">
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
                        {/* Bộ lọc Brand */}
                        <div className="flex items-center gap-2 border-r-2 border-gray-300">
                            <span className="font-medium">Brand</span>
                            {['Apple', 'Samsung', 'Xiaomi', 'Oppo'].map((brand) => (
                                <button
                                    key={brand}
                                    onClick={() => handleSingleFilterClick('brand', brand)}
                                    className={`px-3 py-1 border rounded-full transition duration-200 ${
                                        isHighlighted('brand', brand)
                                            ? 'bg-gray-200 border-gray-400'
                                            : 'hover:bg-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>

                        {/* Bộ lọc ROM */}
                        <div className="flex items-center gap-2 border-r-2 border-gray-300">
                            <span className="font-medium">ROM</span>
                            {['128GB', '64GB', '256GB'].map((rom) => (
                                <Link
                                    key={rom}
                                    onClick={() => handleSingleFilterClick('rom', rom)}
                                    className={`px-3 py-1 border rounded-full transition duration-200 ${
                                        isHighlighted('rom', rom)
                                            ? 'bg-gray-200 border-gray-400'
                                            : 'hover:bg-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    {rom}
                                </Link>
                            ))}
                        </div>

                        {/* Bộ lọc Camera */}
                        <div className="flex items-center gap-2 border-r-2 border-gray-300">
                            <span className="font-medium">Camera sau</span>
                            {['Trên 16MP', 'Từ 11MP đến 15MP'].map((camera) => (
                                <button
                                    key={camera}
                                    onClick={() => handleSingleFilterClick('camera', camera)}
                                    className={`px-3 py-1 border rounded-full transition duration-200 ${
                                        isHighlighted('camera', camera)
                                            ? 'bg-gray-200 border-gray-400'
                                            : 'hover:bg-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    {camera}
                                </button>
                            ))}
                        </div>

                        <button onClick={togglePopup} className="px-4 py-1 border rounded-lg flex items-center gap-1">
                            <CiFilter /> All
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                            <span>Arrange</span>
                            <Arrange />
                        </div>
                        <FilterPopup isOpen={isOpen} togglePopup={togglePopup} />
                    </div>
                </div>
                <div className="w-full -mt-10 bg-white rounded-md h-full">
                    <ProductList1 list = {list} category/>
                </div>
            </div>
        </div>
    );
};

export default CategoryProductList;
