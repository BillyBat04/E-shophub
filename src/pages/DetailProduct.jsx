import { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import SimilarProduct from "../components/similarproduct";
import axiosInstance from "../config/api";
import { Link, useParams } from "react-router-dom";
import Thumbnail from "../components/thumbnail";
import '@splidejs/splide/dist/css/splide.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DetailProduct() {
  const params = useParams()
  const SKU = params.sku

  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({})
  const getProduct = useCallback(async () => {
    const response = await axiosInstance.get(`/product/${SKU}`)
    setProduct(response.data)
  }, [SKU])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  const filters = [
    'Tất cả', 
    'Mới nhất', 
    'Lọc theo 5 sao', 
    '4 sao', 
    '3 sao', 
    '2 sao', 
    '1 sao'
  ];

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item[product.SKU]);

    if (productIndex !== -1) {
      cart[productIndex][product.SKU] += 1;
    } else {
      cart.push({ [product.SKU]: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Thêm vào giỏ hàng thành công!", {
      autoClose: 3000, 
      hideProgressBar: true,
    });
  };

  const handleSubmit = () => {
    localStorage.removeItem('payment')
    const shoppingCart = JSON.parse(localStorage.getItem('payment')) || [];
    shoppingCart.push({[product.SKU] : quantity})
    localStorage.setItem('payment', JSON.stringify(shoppingCart));
    console.log(shoppingCart)
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Cập nhật filter đang được chọn
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1); // Decrement the quantity
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1); // Increment the quantity
  };

  return (
    <div className="bg-customGray1">
        <div className="flex justify-between p-8 w-[1400px] mx-auto">
        {/* Cột 1: Hình ảnh sản phẩm */}
        <div className="flex-1 p-4 bg-white rounded-md mr-4 w-[300px]">
          <div>
            <Thumbnail product={product}/>
          </div>
        </div>

        {/* Cột 2: Thông tin sản phẩm */}
        <div className="flex-1 p-4 mr-4 bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">{product.productName}</h2>
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
            {product.sellingPrice}
          </p>
          <p className="mt-4 customGray3">
          {product.description}
          </p>
            <div className="flex space-x-4">
    </div>
        </div>

        {/* Cột 3: Giá tiền, số lượng, button thanh toán */}
        <div className="flex-1 p-4 ml-4 bg-white rounded-md mx-auto">
        <form className="max-w-xs">
      <label htmlFor="quantity-input" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
        Số lượng:
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={handleDecrement}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="999"
          required
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </form>
          <p className="my-2 text-xl">Tạm tính</p>
          <p className="font-bold text-xl">{43000000 * quantity} VNĐ</p>
          <Link to='/payment'><button onClick={() => handleSubmit()} className="w-full mt-2 py-2 bg-[#FF424E] text-white rounded">
            Mua ngay
          </button></Link>
          <button onClick={() => handleAddToCart()} className="my-4 w-full py-2 border border-[#0A68FF] text-[#0A68FF] rounded">
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
        <div className="relative z-[9999]"><ToastContainer position="top-right" /></div>
    </div>
  );
}

export default DetailProduct;
