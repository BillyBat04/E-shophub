import React from 'react';
import { motion } from 'framer-motion';
import customerProductView from "../SampleData/customerProductView.json";
import { Link } from 'react-router-dom';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const ProductCard = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`}>
                <motion.div
                    className=" p-6 bg-white rounded-2xl customShadow flex flex-col items-center"
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="relative">
                        <img src={product.image} alt={product.name} className=" w-[140px] h-[150px] object-contain" />
                    </div>
                    <h2 className="text-base font-semibold">{product.name}</h2>
                    <p className="text-[#808089]">SAMSUNG</p>
                    <p className="text-[#FF424E] text-lg font-bold mb-2">{product.price}</p>
                    <div className="flex gap-4">
                        <button className="p-2 bg-black text-white rounded-full text-[14px] font-bold px-8">
                            Add to cart
                        </button>
                    </div>
                </motion.div>
        </Link>
    );
};

const ProductList1 = () => {
    return (
        <div className="flex flex-wrap gap-4 justify-center mt-[5%]">
            {customerProductView.map((product, index) => (
                <div className="w-1/5 group" key={index}>
                    <div className="product-card transition-transform transform group-hover:scale-110 ">
                        <ProductCard product={product} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList1;
