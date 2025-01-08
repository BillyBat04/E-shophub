/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/api';
import formatNumber from '../helpers/formatNumber';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const ProductCard = ({ displayedProduct }) => {
    return (
        <Link to={`/detail-product/${displayedProduct.product.SKU}`}>
            <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <div className="bg-white shadow-lg rounded-lg p-4 w-[250px] h-[350px]">
                    <div className="relative">
                    <img src={displayedProduct.product.image} alt={displayedProduct.product.productName} className="w-full h-40 object-cover rounded" />
                    </div>
                    <h3 className="text-sm font-semibold mt-4">{displayedProduct.product.productName}</h3>
                    <p className="text-xs text-gray-500">{displayedProduct.product.cpu} | {displayedProduct.product.ram}GB | {displayedProduct.product.hardDrive}GB</p>
                    <div className="flex items-center mt-2">
                    <span className="text-red-500 font-bold">{formatNumber(displayedProduct.product.sellingPrice)}</span>
                    <span className="text-gray-400 text-sm line-through ml-2">{formatNumber(displayedProduct.product.sellingPrice + 1000000)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                    <span className="text-yellow-500 text-sm">
                        {'★'.repeat(3)}{'☆'.repeat(5 - 3)}
                    </span>
                    </div>
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
