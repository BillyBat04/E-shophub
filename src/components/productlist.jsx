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
                    className="p-6 bg-white rounded-2xl customShadow flex flex-col items-center h-full"
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="relative flex-shrink-0">
                        <img src={displayedProduct.product.image} alt={displayedProduct.product.productName} className="w-[140px] h-[150px] object-contain" />
                    </div>
                    <h2 className="text-base font-semibold text-center ">{displayedProduct.product.productName}</h2>
                    <p className="text-[#808089]">{displayedProduct.product.brand}</p>
                    <p className="text-[#FF424E] text-lg font-bold mb-2">{displayedProduct.sellingPrice}</p>
                    <div className="flex gap-4 mt-auto">
                        <button className="p-2 bg-black text-white rounded-full text-[14px] font-bold px-8">
                            Add to cart
                        </button>
                    </div>
                </motion.div>

        </Link>
    );
};

const ProductList1 = () => {
    const [productList, setProductList] = useState([])
    const getList = useCallback(async () => {
            const response = await axiosInstance.get('/displayed-product')
            setProductList(response.data)
        }, [])
    
    useEffect(() => {
        getList()
    }, [getList])
    return (
        <div className="flex flex-wrap gap-4 justify-center mt-[5%]">
            {productList.map((product, index) => (
                <div className="w-1/5 group flex" key={index}>
                    <div className="product-card transition-transform transform group-hover:scale-110">
                        <ProductCard displayedProduct={product} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList1;
