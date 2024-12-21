import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import customerProductView from "../SampleData/customerProductView.json";

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const ProductCard = ({ product }) => {
    return (
        <motion.div
            className="w-[200px] h-[300px] p-6 bg-white rounded-2xl customShadow flex flex-col items-center text-center"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="relative">
                <img src={product.image} alt={product.name} className=" w-[140px] h-[150px] object-contain" />
            </div>
            <h2 className="text-base font-semibold">{product.name}</h2>
            <p className="text-lg font-bold text-gray-700 mb-2">{product.price}</p>
            <div className="flex gap-4">
                <Link to={product.id}>
                    <button className="mr-2 h-[30px] w-[70px] bg-white text-black rounded-full text-[7px] customShadow">
                        Learn more
                    </button>
                </Link>
                <button className="h-[30px] w-[70px] bg-black text-white rounded-full text-[7px]">
                    Buy
                </button>
            </div>
        </motion.div>
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
