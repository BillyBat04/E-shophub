import { useState, useEffect, useCallback } from 'react';
import { GrNext } from "react-icons/gr";
import PhoneList from '../components/phonecart';
import LaptopList from '../components/laptopcart';
import AccessoryCard from '../components/accessorycart';
import ChatModal from '../components/chatmodal';
import { FooterWithSitemap } from '../components/footer';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/api';
import "core-js/stable/atob";

const products = [
  {
    id: 1,
    name: "Samsung Galaxy A14",
    price: "4.490.000",
    specs: "4GB/128GB",
    image: 'src/assets/black.jpg'
  },
  {
    id: 2,
    name: "Samsung Galaxy A15",
    price: "5.490.000",
    specs: "6GB/128GB",
    image: 'src/assets/black.jpg'
  },
  {
    id: 3,
    name: "Samsung Galaxy A14",
    price: "4.490.000",
    specs: "4GB/128GB",
    image: 'src/assets/violet.jpg'
  },
  {
    id: 4,
    name: "Samsung Galaxy A15",
    price: "5.490.000",
    specs: "6GB/128GB",
    image: 'src/assets/pink.jpg'
  },
];

const product = [
  {
    name: "MacBook Air 13' và 15'",
    price: "Từ 24.990.000",
    color: "#000000",
    mainImage: "src/assets/airpod.svg"
  },
  {
    name: "MacBook Air 14' và 16'",
    price: "39.990.000",
    color: "#F9DEC9",
    mainImage: "src/assets/apm.svg"
  },
];

const Mainpage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    decode();
    // const interval = setInterval(() => {
    //   setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    // }, 2000);

    // return () => clearInterval(interval);
  }, [decode]);

  var decode = useCallback(async () => {
    const response = await axiosInstance.get('/user/cookie');
    const login = await axiosInstance.post('/user/login', {
      email: response.data.email,
      password: response.data.email,
    });
    console.log(response);

    if (login.status === 200) {
      localStorage.setItem("user", JSON.stringify(login.data.account));
    }
  }, []);

  return (
    <div>
      <div className="xl:pl-[15%] xl:pr-[15%] w-screen h-screen overflow-y-scroll">
        <section className="w-full h-[95%] flex flex-col">
          <div className="relative w-full h-[95%]">
            <div className='absolute inset-0 w-full h-[60%] bg-black'></div>
            <div className='lg:mt-[5%] h-[70%] absolute inset-0 overflow-hidden md:h-[80%] w-full flex flex-row justify-center items-center'>
              <div
                className="transition-transform flex flex-row duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${products.length * 100}%`
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-full h-full flex justify-center items-center"
                  >
                    <div className="w-[70%] h-[100%] flex justify-between items-center">
                      <img
                        src={product.image}
                        className="h-[60%] w-[40%] rounded-3xl shadow-xl"
                      />
                      <div className="ml-[9%] flex flex-col items-center mb-28 w-[60%] text-white font-roboto">
                        <label className="font-semibold sm:text-[40px] xl:text-[35px] text-[20px]">
                          {product.name}
                        </label>
                        <label className="font-bold text-[40px]">
                          {product.price}
                        </label>
                        <label className="font-semibold text-[20px]">
                          {product.specs}
                        </label>
                        <div className="mt-5 flex flex-row">
                          <button className="sm:w-[120px] text-xs h-[40px] w-[80px] bg-black text-white rounded-full text-[15px] border border-white">
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full h-[95%] flex items-center justify-center bg-customGray1">
          <div className='w-[80%] h-[80%] flex flex-col'>
            <div className='flex flex-row justify-between items-end w-full h-[5%]'>
              <label className='font-semibold text-[40px]'>Điện thoại mới.</label>
              <Link to="/listproduct/Phone">
                <button className='mb-2 flex flex-row items-center'>
                  <label className='cursor-pointer'>Khám phá thêm</label>
                  <GrNext className='ml-1' /> </button>
              </Link>
            </div>
            <div className='h-[95%] w-full '>
              <PhoneList />
            </div>
          </div>
        </section>

        <section className="w-full h-[95%] flex items-center justify-center bg-customGray2">
          <div className='w-[80%] h-[80%] flex flex-col'>
            <div className='flex flex-row justify-between items-end w-full h-[10%]'>
              <label className='font-semibold text-white text-[40px]'>Laptop mới.</label>
              <Link to="/listproduct/Laptop">
                <button className='mb-2 text-white flex flex-row items-center'>
                  <label className='cursor-pointer'>Khám phá thêm</label>
                  <GrNext className='ml-1' /> </button>
              </Link>
            </div>
            <div className='h-[95%] w-full '>
              <LaptopList />
            </div>
          </div>
        </section>

        <section className='w-full h-full flex items-center justify-center'>
          <div className='w-[80%] h-[100%] flex flex-col'>
            <div className='flex flex-row justify-between items-end w-full h-[20%]'>
              <label className='font-semibold text-[40px]'>Phụ kiện mới.</label>
              <Link to="/listproduct/Accessories">
                <button className='mb-2 flex flex-row items-center'>
                  <label className='cursor-pointer'>Khám phá thêm</label>
                  <GrNext className='ml-1' /> </button>
              </Link>
            </div>
            <div className='h-[80%] w-full grid grid-cols-2'>
              <div className='h-full w-full '>
                <div className='relative h-full w-full flex items-end'>
                  <div className='w-[75%] h-[65%] max-w-[300px] flex flex-col justify-center items-center bg-white shadow-2xl'>
                    <h2 className="mt-[40%] text-xl font-semibold">Apple Watch</h2>
                    <p className="text-lg font-bold text-gray-700 mb-6">10.000.000</p>
                    <div className="flex gap-4">
                      <button className="h-[40px] w-[100px] bg-black text-white rounded-full text-[12px]">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-center items-center mb-[230px] max-w-[300px] absolute w-[75%] aspect-square bg-customViolet rounded-full'>
                    <img src="src/assets/watch.svg"
                      className='w-[80%] h-[80%] mt-10' />
                  </div>
                </div>
              </div>
              <div className='grid grid-rows-2'>
                <AccessoryCard product={product[0]} />
                <AccessoryCard product={product[1]} />
              </div>
            </div>
          </div>
        </section>
        <ChatModal />
      </div>
      <FooterWithSitemap />
    </div>
  );
};

export default Mainpage;
