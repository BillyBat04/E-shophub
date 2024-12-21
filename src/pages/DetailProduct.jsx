import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import SimilarProduct from "../components/similarproduct";
function DetailProduct() {
  // Danh sách hình ảnh sản phẩm
  const images = [
    "https://salt.tikicdn.com/cache/750x750/ts/product/27/04/0f/455b9d3e001963e89cabc903afe9f1d1.jpg.webp",
    "https://salt.tikicdn.com/cache/750x750/ts/product/9c/e2/01/a467970d437ce3980cd6c045cc97fb9c.jpg.webp",
    "https://salt.tikicdn.com/cache/750x750/ts/product/af/b9/89/30ca40cd9286b72b1860d48c093e9646.jpg.webp",
  ];

  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const colors = ['red', 'blue', 'green'];
  // Handle increment
  const increment = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };

  const filters = [
    'Tất cả', 
    'Mới nhất', 
    'Lọc theo 5 sao', 
    '4 sao', 
    '3 sao', 
    '2 sao', 
    '1 sao'
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Cập nhật filter đang được chọn
  };

  // Handle decrement
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Hàm thay đổi hình ảnh khi nhấn nút next/prev
  const changeImage = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === "prev") {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="bg-customGray1">
        <div className="flex justify-between p-8 w-[1400px] mx-auto">
        {/* Cột 1: Hình ảnh sản phẩm */}
        <div className="flex-1 p-4 bg-white rounded-md mr-4">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt="Sản phẩm"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Cột 2: Thông tin sản phẩm */}
        <div className="flex-1 p-4 mr-4 bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">Điện thoại Samsung Galaxy Z Fold6 (12GB/ 256GB) - Hàng Chính Hãng</h2>
          <div className="flex items-center">
            <p className="mr-2">5.0</p>
            <FaStar className="text-[#ffd700]"/>
            <FaStar className="text-[#ffd700]"/>
            <FaStar className="text-[#ffd700]"/>
            <FaStar className="text-[#ffd700]"/>
            <FaStar className="text-[#ffd700]"/>
            <p className="ml-2">Đã bán: 500</p>
          </div>
          <p className="text-2xl font-bold mt-4">
            43.990.000₫
          </p>
          <p className="mt-4 customGray3">
          The Samsung Galaxy Z Fold6 features a 7.6-inch Dynamic AMOLED 2X foldable display and a 6.2-inch outer screen for seamless multitasking. Powered by a Snapdragon processor, 12GB of RAM, and 256GB of storage, it offers powerful performance and ample space. The versatile triple-camera setup ensures excellent photography. With 5G connectivity, a durable foldable design, and a long-lasting battery, the Z Fold6 is a premium choice for users seeking innovation and style. This is an official genuine product, delivering top-tier performance and design.
          </p>
            <p className="font-bold text-md my-4">Màu:</p>
            <div className="flex space-x-4">
      {colors.map(color => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)} // Set the selected color
          className={`px-4 py-2 rounded-lg font-semibold ${
            selectedColor === color
              ? `bg-${color}-500 text-white` // Selected: color background, white text
              : `border-2 border-${color}-500 text-${color}-500 hover:bg-${color}-100` // Unselected: border is the color, text color matches, hover effect
          }`}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)} {/* Capitalize the first letter */}
        </button>
      ))}
    </div>
        </div>

        {/* Cột 3: Giá tiền, số lượng, button thanh toán */}
        <div className="flex-1 p-4 ml-4 bg-white rounded-md mx-auto">
          <label htmlFor="quantity" className="block mb-2 font-bold text-2xl">Số lượng:</label>
          <div className="flex items-center mb-4">
            <button 
              onClick={decrement} 
              className="w-8 h-8 bg-gray-200 rounded-full text-xl"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              min="1"
              max="100"
              className="text-center w-16 py-1 border border-gray-300 rounded mx-2"
              readOnly
            />
            <button 
              onClick={increment} 
              className="w-8 h-8 bg-gray-200 rounded-full text-xl text-center"
            >
              +
            </button>
          </div>
          <p className="my-2 font-bold text-2xl">Tạm tính</p>
          <p className="font-bold text-xl">{43000000 * quantity} VNĐ</p>
          <button className="w-full mt-2 py-2 bg-[#FF424E] text-white rounded">
            Mua ngay
          </button>
          <button className="my-4 w-full py-2 border border-[#0A68FF] text-[#0A68FF] rounded">
            Thêm vào giỏ
          </button>
        </div>
      </div>
        <div className="w-[1400px] mx-auto">
            <p className="text-2xl font-bold">Sản phẩm tương tự</p>
            <div className="flex flex-wrap justify-center">
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
              <SimilarProduct/>
            </div>
        </div>
        <div className="w-[1400px] mx-auto p-4 bg-white rounded-md">
            <p className="text-2xl font-bold">Khách hàng đánh giá</p>
            <p className="text-xl">Tổng quan</p>
            <div className="flex flex-wrap justify-center flex-col mt-2">
                <div className="flex items-center">
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <p className='ml-4'>2</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-[#ffd700]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
            </div>
            <div className="my-4">
              <p>Lọc theo: </p>
              <div className="mt-4">
                <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: '0', margin: '0' }}>
                  {filters.map((filter) => (
                    <li
                      key={filter}
                      onClick={() => handleFilterClick(filter)} // Gọi hàm khi nhấp
                      style={{
                        padding: '10px 20px',
                        backgroundColor: activeFilter === filter ? '#007bff' : '#f0f0f0', // Nổi bật mục được chọn
                        color: activeFilter === filter ? 'white' : 'black',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                        transform: activeFilter === filter ? 'scale(1.1)' : 'scale(1)', // Tăng kích thước mục khi active
                      }}
                    >
                      {filter}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center mt-8 p-2 border border-black rounded-md">
                <div className="flex items-center">
                  <img className="w-[50px] h-[50px]" src = 'https://cdn-icons-png.freepik.com/512/147/147142.png'/>
                  <p className="ml-2">Nguyễn Phi Học</p>
                </div>
                <div className="ml-8">
                  <div className="flex items-center">
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <p className='ml-4'>Cực kì hài lòng</p>
                  </div>
                  <p>Giao hàng nhanh, giá thành tốt sản phẩm khuyến mại kèm theo chính hãng đúng như xam kết</p>
                </div>
              </div>
              <div className="flex items-center mt-8 p-2 border border-black rounded-md">
                <div className="flex items-center">
                  <img className="w-[50px] h-[50px]" src = 'https://cdn-icons-png.freepik.com/512/147/147142.png'/>
                  <p className="ml-2">Nguyễn Phi Học</p>
                </div>
                <div className="ml-8">
                  <div className="flex items-center">
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <p className='ml-4'>Cực kì hài lòng</p>
                  </div>
                  <p>Giao hàng nhanh, giá thành tốt sản phẩm khuyến mại kèm theo chính hãng đúng như xam kết</p>
                </div>
              </div>
              <div className="flex items-center mt-8 p-2 border border-black rounded-md">
                <div className="flex items-center">
                  <img className="w-[50px] h-[50px]" src = 'https://cdn-icons-png.freepik.com/512/147/147142.png'/>
                  <p className="ml-2">Nguyễn Phi Học</p>
                </div>
                <div className="ml-8">
                  <div className="flex items-center">
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <p className='ml-4'>Cực kì hài lòng</p>
                  </div>
                  <p>Giao hàng nhanh, giá thành tốt sản phẩm khuyến mại kèm theo chính hãng đúng như xam kết</p>
                </div>
              </div>
              <div className="flex items-center mt-8 p-2 border border-black rounded-md">
                <div className="flex items-center">
                  <img className="w-[50px] h-[50px]" src = 'https://cdn-icons-png.freepik.com/512/147/147142.png'/>
                  <p className="ml-2">Nguyễn Phi Học</p>
                </div>
                <div className="ml-8">
                  <div className="flex items-center">
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <p className='ml-4'>Cực kì hài lòng</p>
                  </div>
                  <p>Giao hàng nhanh, giá thành tốt sản phẩm khuyến mại kèm theo chính hãng đúng như xam kết</p>
                </div>
              </div>
              <div className="flex items-center mt-8 p-2 border border-black rounded-md">
                <div className="flex items-center">
                  <img className="w-[50px] h-[50px]" src = 'https://cdn-icons-png.freepik.com/512/147/147142.png'/>
                  <p className="ml-2">Nguyễn Phi Học</p>
                </div>
                <div className="ml-8">
                  <div className="flex items-center">
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <FaStar className="text-[#ffd700]"/>
                    <p className='ml-4'>Cực kì hài lòng</p>
                  </div>
                  <p>Giao hàng nhanh, giá thành tốt sản phẩm khuyến mại kèm theo chính hãng đúng như xam kết</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default DetailProduct;
