import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
                <img src={product.mainImage} alt={product.name} className=" w-[140px] h-[150px] object-contain" />
            </div>
            <div className="flex justify-center gap-1 my-1">
                {product.colors.map((color, i) => (
                    <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${color.bgColor}`}
                    />
                ))}
            </div>
            <h2 className="text-base font-semibold">{product.name}</h2>
            <p className="text-lg font-bold text-gray-700 mb-2">{product.price}</p>
            <div className="flex gap-4">
                <Link to='/pdescript'>
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
    const products = [
        {
            name: "iPhone 16 Pro Max",
            price: "34.990.000",
            mainImage: "src/assets/16prm.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
        {
            name: "iPhone 16 Pro",
            price: "28.990.000",
            mainImage: "src/assets/16pr.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
        {
            name: "iPhone 16",
            price: "23.990.000",
            mainImage: "src/assets/16.svg",
            colors: [
                { bgColor: "bg-blue-400" },
                { bgColor: "bg-pink-400" },
                { bgColor: "bg-purple-400" }
            ]
        },
        {
            name: "iPhone 16 Pro Max",
            price: "34.990.000",
            mainImage: "src/assets/16prm.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
        {
            name: "iPhone 16 Pro",
            price: "28.990.000",
            mainImage: "src/assets/16pr.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
        {
            name: "iPhone 16",
            price: "23.990.000",
            mainImage: "src/assets/16.svg",
            colors: [
                { bgColor: "bg-blue-400" },
                { bgColor: "bg-pink-400" },
                { bgColor: "bg-purple-400" }
            ]
        },
        {
            name: "iPhone 16 Pro",
            price: "28.990.000",
            mainImage: "src/assets/16pr.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
        {
            name: "iPhone 16",
            price: "23.990.000",
            mainImage: "src/assets/16.svg",
            colors: [
                { bgColor: "bg-blue-400" },
                { bgColor: "bg-pink-400" },
                { bgColor: "bg-purple-400" }
            ]
        }
    ];

    return (
        <div className="flex flex-wrap gap-4 justify-center mt-[5%]">
            {products.map((product, index) => (
                <div className="w-1/5 group" key={index}>
                    <div className="product-card transition-transform transform group-hover:scale-110 group-hover:shadow-lg">
                        <ProductCard product={product} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList1;
