import { useState, useEffect, useCallback } from 'react';
import ProductList1 from '../components/productlist';
import { CiFilter } from "react-icons/ci";
import Arrange from '../components/arrange';
import FilterPopup from '../components/filterpopup';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../config/api';
import FeaturedProducts from '../components/featuredProducts';
import FilterBar from '../components/filterBar';
import FallingHoaMai from '../components/HoaMai';

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
                <FeaturedProducts/>
                <div className="w-full p-5 mt-3 rounded-md bg-white shadow">
                    <h1 className="text-xl font-bold mb-4">All products</h1>
                    <FilterBar/>

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
