import { useState, useEffect, useCallback } from 'react';
import ProductList1 from '../components/productlist';
import Arrange from '../components/arrange';
import FilterPopup from '../components/filterpopup';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../config/api';
import FeaturedProducts from '../components/featuredProducts';
import FilterBar from '../components/filterBar';
import BrandButtons from '../components/brands';

const CategoryProductList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { category } = useParams();
    const location = useLocation()
    const [list, setList] = useState(null)
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    console.log(location.search)

    const getList = useCallback(async () => {
        const response = await axiosInstance.get(`/displayed-product/search/filter/${category}/${location.search}`)
        setList(response.data)
    }, [category,location.search])

    useEffect(() => {
        getList()
    }, [getList])


    return (
        <div className="xl:pl-[15%] min-h-screen bg-slate-100 xl:pr-[15%] w-screen overflow-x-hidden ">
            <div className="relative w-full h-full overflow-hidden">
                <BrandButtons/>
                <FeaturedProducts/>
                <div className="w-full p-5 mt-3 rounded-md bg-white shadow">
                    <h1 className="text-xl font-bold mb-4">All products</h1>
                    <FilterBar/>

                    <div className="flex justify-end items-center mt-4">
                        <div className="flex items-center gap-2">
                            <span>Arrange</span>
                            <Arrange setList = {setList} />
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
