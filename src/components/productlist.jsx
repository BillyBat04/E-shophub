/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/api';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const ProductCard = ({ displayedProduct }) => {
    return (
        <Link to={`/detail-product/${displayedProduct.product.SKU}`}>
            <motion.div
                className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex flex-col items-center h-full border border-gray-200"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <div className="relative mb-4">
                    <img
                        src={displayedProduct.product.image}
                        alt={displayedProduct.product.productName}
                        className="w-[200px] h-[200px] object-contain"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-base font-semibold">{displayedProduct.product.productName}</h2>
                    <p className="text-gray-500 text-sm">{displayedProduct.product.brand}</p>
                    <p className="text-[#FF424E] text-lg font-bold">{displayedProduct.sellingPrice}</p>
                </div>
                <div className="flex gap-2 mt-4">
                    {/* Mô phỏng các lựa chọn màu sắc */}
                    {displayedProduct.product.colors?.map((color, index) => (
                        <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            </motion.div>
        </Link>
    );
};

const ProductList1 = ({list, category}) => {
    const [productList, setProductList] = useState([])
    const getList = useCallback(async () => {
        const response = await axiosInstance.get('/displayed-product')
        setProductList(response.data)
    }, [])
    
    useEffect(() => {
        if (category) setProductList(list) 
        else getList()
    }, [getList, list, category])
    return (
        <div className="flex flex-wrap gap-4 mt-[5%] p-4">
            {productList?.length > 0 && productList.map((product, index) => (
                <div className="w-1/5 group flex" key={index}>
                    <div className="product-card transition-transform transform group-hover:scale-110">
                        <ProductCard  displayedProduct={product} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList1;
