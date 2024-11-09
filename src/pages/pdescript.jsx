import React, { useState } from 'react';
import { IoAddOutline } from "react-icons/io5";
import ReviewItem from '../components/reviewitem';
import { MdNavigateNext } from "react-icons/md";
import PhoneList from '../components/phonecart';

const Pdescript = () => {
    const reviews = [
        {
            reviewer: {
                name: 'Le Bao Minh',
                avatar: 'https://via.placeholder.com/40',
            },
            rating: 5,
            date: '10/10/2024',
            reviewText: 'Such a great smartphone!',
            images: [
                'https://via.placeholder.com/80',
                'https://via.placeholder.com/80',
            ],
        },
        {
            reviewer: {
                name: 'Nguyen Van A',
                avatar: 'https://via.placeholder.com/40',
            },
            rating: 4,
            date: '09/10/2024',
            reviewText: 'Amazing features!',
            images: [
                'https://via.placeholder.com/80',
                'https://via.placeholder.com/80',
            ],
        },
        // Add more reviews as needed
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedMemory, setSelectedMemory] = useState("512GB");

    const [activeIndex, setActiveIndex] = useState(null);

    const features = [
        { id: 1, src: "src/assets/f1.png", description: "Bấm để khởi chạy ứng dụng Camera." },
        { id: 2, src: "src/assets/f2.png", description: "Bấm và giữ để bắt đầu quay video." },
        { id: 3, src: "src/assets/f3.png", description: "Ấn nhẹ một lần để chụp ảnh." },
        { id: 4, src: "src/assets/f4.png", description: "Chụp ảnh chất lượng cao." }
    ];
    const handleNextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div className="h-screen w-screen">
            <div className='w-full h-[5%] flex justify-center bg-customGray'>
            </div>
            <div className="xl:pl-[15%] xl:pr-[15%]">
                <div className="grid grid-cols-5 mt-10">
                    <div className="col-span-2 flex justify-center items-center rounded-r-[50px] w-[95%] bg-black">
                        <img src="src/assets/16pr.svg" alt="Apple iPhone 16 Pro" className="w-80 ml-[15%] h-auto rounded-lg " />
                    </div>
                    <div className="mt-8 col-span-3 flex flex-col justify-center items-center">
                        <div className='h-full w-auto '>
                            <h1 className="text-5xl font-bold">Apple iPhone 16 Pro</h1>
                            <ul className="mt-4 text-gray-700 space-y-1">
                                <li>Operating system: iOS 18</li>
                                <li>CPU: A18 Pro</li>
                                <li>Screen: OLED</li>
                                <li>Rear Camera: Main 48 MP & Auxiliary 48 MP, 12 MP</li>
                                <li>Front Camera: 12 MP</li>
                                <li>RAM: 8GB | ROM: 512GB</li>
                            </ul>
                            <div className="flex items-start space-x-4 mt-4">
                                {["128GB", "256GB", "512GB", "1TB"].map((memory) => (
                                    <button
                                        key={memory}
                                        onClick={() => setSelectedMemory(memory)}
                                        className={`px-4 py-2 border rounded-lg transition-transform duration-200 ${selectedMemory === memory ? "bg-black text-white scale-125" : "bg-gray-200 scale-100"
                                            }`}
                                    >
                                        {memory}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-4 mt-7">
                                <div className="text-2xl flex justify-center items-center bg-black text-white rounded-full w-[300px] h-[50px] font-bold">4,490,000 VND</div>
                                <button className='w-[50px] h-[50px] flex justify-center items-center rounded-full border-black border'>
                                    <IoAddOutline className='w-[40px] h-[40px]' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl mt-10 font-semibold ">Features</h2>
                <div className="mt-5 overflow-x-scroll h-[400px]  w-[100%]">
                    <div className="w-[1500px] flex scroll-smooth ">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                className={`mr-4 mt-5 w-[350px] h-[350px] flex flex-col justify-center items-center snap-start transition-transform duration-300 ${activeIndex === index ? "transform scale-110" : ""
                                    }`}
                            >
                                <img src={feature.src} alt={`Camera Feature ${index + 1}`} className="w-full h-full rounded-xl" />
                                <p className="text-customOrange font-bold mt-2">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-3 w-full">
                    <h2 className="text-3xl font-semibold mb-4">Review</h2>
                    <div className="flex flex-row ">
                        <div className=" flex flex-col h-auto w-[60%] border border-black rounded-xl space-x-4">
                            <div className="mt-7 flex h-[50px] w-full items-center justify-center">
                                <div className='h-[70px] w-[70px] bg-black rounded-full flex flex-row justify-center items-center'>
                                    <div className="text-2xl text-white font-bold">4.9</div>
                                </div>
                                <span className="ml-5 text-2xl">15 Reviews</span>
                            </div>
                            <ReviewItem
                                reviewer={reviews[currentIndex].reviewer}
                                rating={reviews[currentIndex].rating}
                                date={reviews[currentIndex].date}
                                reviewText={reviews[currentIndex].reviewText}
                                images={reviews[currentIndex].images}
                            />
                            <button onClick={handleNextReview} className="mt-4 mb-5 rounded-full self-center p-2 bg-black text-white">
                                <MdNavigateNext />
                            </button>
                        </div>
                        <div className="space-y-4 ml-5 mt-4 w-[40%]">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center w-full">
                                    <span className="w-8">{rating}</span>
                                    <div className="w-[65%] bg-gray-300 h-5 rounded-lg overflow-hidden">
                                        <div className="bg-black rounded-lg h-full" style={{ width: `${rating * 20}%` }}></div>
                                    </div>
                                    <span className="ml-2">{15 - (5 - rating) * 3} Reviews</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className='mt-10 w-full h-[700px] bg-customGray2'>
                    <div className='p-10'>
                        <h2 className="p-5 text-3xl text-white font-semibold">Relative</h2>
                        <PhoneList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pdescript;
