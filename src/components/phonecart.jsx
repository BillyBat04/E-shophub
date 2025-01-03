import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const PhoneCard = ({ product }) => {
    return (
        <motion.div
            className="w-full h-[90%] p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="relative mb-4">
                <img src={product.mainImage} alt={product.name} className="w-[150px] h-[250px] object-contain" />
            </div>
            <div className="flex justify-center gap-1 my-3">
                {product.colors.map((color, i) => (
                    <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${color.bgColor}`}
                    />
                ))}
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg font-bold text-gray-700 mb-6">{product.price}</p>
            <div className="flex gap-4">
                <button className="h-[40px] w-[100px] bg-black text-white rounded-full text-[12px]">
                    Xem chi tiết
                </button>
            </div>
        </motion.div>
    );
};

const PhoneList = () => {
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
        }
    ];

    return (
        <div className="flex gap-8 justify-center mt-[5%]">
            {products.map((product, index) => (
                <PhoneCard key={index} product={product} />
            ))}
        </div>
    );
};

export default PhoneList;
