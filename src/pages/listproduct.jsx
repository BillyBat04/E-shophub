import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';

import Arrange from '../components/arrange';
import ProductList1 from '../components/productlist';

const Listproduct = () => {
    const location = useLocation();
    const isCatePage = location.pathname !== "/listproduct";

    // Render child routes (e.g., /listproduct/:id) if it's not the main /listproduct page
    if (isCatePage && location.pathname.startsWith("/listproduct")) {
        return <Outlet />;
    }

    const banners = [
        { id: 1, img: "src/assets/banner1.jpg" },
        { id: 2, img: "src/assets/banner2.jpg" },
        { id: 3, img: "src/assets/banner3.jpg" },
    ];
    const cates = [
        { id: 1, name: "Phone", img: "src/assets/ph.png" },
        { id: 2, name: "Laptop", img: "src/assets/lap.png" },
        { id: 3, name: "Tablet", img: "src/assets/tab.png" },
        { id: 4, name: "Earpods", img: "src/assets/ears.png" },
        { id: 5, name: "Accessories", img: "src/assets/access.png" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="xl:pl-[15%] bg-slate-100 xl:pr-[15%] h-screen overflow-x-hidden ">
            <div className="relative w-full h-full ">
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
                            <img
                                src={banner.img}
                                alt={`Banner ${banner.id}`}
                                className="h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
                <div className="p-5 w-full m-2 h-[20%] rounded-md bg-white items-center flex justify-between">
                    <div className="flex   flex-col w-[70%]">
                        <span className="font-medium pr-3 pb-2">Explore by category</span>
                        <div className="flex gap-8">
                            {cates.map((cate) => (
                                <Link
                                    to={cate.name}
                                    className="flex flex-col gap-1 items-center"
                                    key={cate.id}
                                >
                                    <div className="w-16 flex justify-center items-center h-16 bg-slate-200 rounded-full">
                                        <img src={cate.img} className="w-10 h-10" alt={cate.name} />
                                    </div>
                                    <span className="font-normal text-sm">{cate.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-[30%] h-full flex flex-col items-end justify-start">
                        <div className="w-full justify-end flex items-center">
                            <span className="font-medium pr-3">Arrange</span>
                            <div className="flex justify-end">
                                <Arrange />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-white m-2 w-full overflow-hidden">
                    <ProductList1 />
                </div>
            </div>
        </div>
    );
};

export default Listproduct;
