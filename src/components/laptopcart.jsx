import React from 'react';

const LaptopCard = ({ product }) => {
    return (
        <div className="w-[450px]  h-[400px] p-6 bg-customWhite rounded-3xl shadow-lg flex flex-col items-center text-center">
            <div className="relative mb-4">
                <img src={product.mainImage} alt={product.name} className="w-[300px] h-[200px] object-contain" />
            </div>
            <div className="flex justify-center gap-1">
                {product.colors.map((color, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full ${color.bgColor}`}
                    />
                ))}
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg font-bold text-gray-700 mb-6">{product.price}</p>
            <div className="flex gap-4">
                <button className="mr-2 h-[40px] w-[100px] bg-white text-black rounded-full text-[12px] shadow-lg ">
                    Learn more
                </button>
                <button className="h-[40px] w-[100px] bg-black text-white rounded-full text-[12px] ">
                    Buy
                </button>
            </div>
        </div>
    );
};

const LaptopList = () => {
    const products = [
        {
            name: "MacBook Air 13' và 15'",
            price: "Từ 24.990.000",
            mainImage: "src/assets/air.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
        {
            name: "MacBook Air 14' và 16'",
            price: "39.990.000",
            mainImage: "src/assets/pro.svg",
            colors: [
                { bgColor: "bg-gray-400" },
                { bgColor: "bg-beige-400" },
                { bgColor: "bg-slate-300" }
            ]
        },
    ];

    return (
        <div className="flex gap-8 justify-center mt-[5%]">
            {products.map((product, index) => (
                <LaptopCard key={index} product={product} />
            ))}
        </div>
    );
};

export default LaptopList;
