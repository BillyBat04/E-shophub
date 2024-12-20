import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa6";
import { Range } from 'react-range';
import ProductList1 from '../components/productlist';

const Listproduct = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [values, setValues] = useState([0, 100]);
    const banners = [
        { id: 1, img: "src/assets/banner1.jpg" },
        { id: 2, img: "src/assets/banner2.jpg" },
        { id: 3, img: "src/assets/banner3.jpg" },
    ];
    const brands = [
        { id: 1, name: "iPhone" },
        { id: 2, name: "Samsung" },
        { id: 3, name: "Vivo" },
        { id: 4, name: "Xiaomi" },
        { id: 5, name: "Oppo" },
        { id: 6, name: "Realmi" },
    ]
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="xl:pl-[15%] xl:pr-[15%]  w-screen h-screen">
            <div className="relative w-full h-full overflow-y-scroll overflow-x-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${banners.length * 100}%`,
                    }}
                >
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className="w-full h-[300px] flex-shrink-0"
                            style={{ width: "100%" }}
                        >
                            <img src={banner.img} alt={`Banner ${banner.id}`} className=' h-full
              object-contain'  />
                        </div>
                    ))}
                </div>
                <div className='p-3 w-full h-[12%] flex justify-between'>
                    <div className='flex w-[70%]'>
                        <button className='h-full w-24 rounded-md border border-customBlack justify-center flex items-center'>
                            <FaFilter className='mr-2' />
                            <span>Filter</span>
                        </button>
                        <div className='pl-3  h-full w-full flex flex-col justify-between'>
                            <div className='h-1/2 flex gap-2'>
                                {
                                    brands.map((brand) => (

                                        <button className='h-full w-20 rounded-md border border-customBlack justify-center flex items-center' key={brand.id}>
                                            {brand.name}
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="h-1/2 flex items-center space-x-6">
                                <span className='h-[80%] flex justify-center items-center w-20 text-white text-sm rounded-md bg-customBlack'>{values[0] * 50} $</span>
                                <div className="w-64 h-1 customShadow flex items-center rounded-full">
                                    <Range
                                        values={values}
                                        step={1}
                                        min={0}
                                        max={100}
                                        onChange={(newValues) => setValues(newValues)}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                className="w-full h-1 rounded-full"
                                                style={{
                                                    ...props.style,
                                                }}
                                            >
                                                <div
                                                    className="absolute h-full bg-black rounded-full"
                                                    style={{
                                                        left: `${(values[0] / 100) * 100}%`,
                                                        width: `${((values[1] - values[0]) / 100) * 100}%`,
                                                    }}
                                                />
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                className="w-4 h-4 bg-customBlack rounded-full flex justify-center items-center shadow-md"
                                                style={{
                                                    ...props.style,
                                                }}
                                            >
                                            </div>
                                        )}
                                    />
                                </div>
                                <span className='h-[80%] flex justify-center items-center w-20 text-white text-sm rounded-md bg-customBlack'>{values[1] * 50} $</span>

                            </div>
                        </div>
                    </div>
                    <div className='w-[30%] h-full flex flex-col items-end justify-center'>
                        <div className='w-[40%] justify-start'>
                            <span className='text-center font-medium'>Arrange</span>
                            <div className="mt-2 w-[100%]">
                                <select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    className="w-full h-7 border border-customBlack rounded-md"
                                >
                                    <option value="">Select Sorting Option</option>
                                    <option value="low-to-high">Price from low to high</option>
                                    <option value="high-to-low">Price from high to low</option>
                                    <option value="outstanding">Outstanding</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full'>
                    <ProductList1 />
                </div>
            </div>
        </div >
    );
};

export default Listproduct;
