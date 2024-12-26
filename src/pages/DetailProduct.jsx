import { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import SimilarProduct from "../components/similarproduct";
import axiosInstance from "../config/api";
import { Link, useParams } from "react-router-dom";
import Thumbnail from "../components/thumbnail";
import '@splidejs/splide/dist/css/splide.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../components/cartcontext";
import formatNumber from "../helpers/formatNumber";
import ModalFeedback from "../components/modalfeedback";
function DetailProduct() {
  const params = useParams()
  const SKU = params.sku
  const {updateCartItemCount} = useCart()
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({})
  const [feedbackList, setFeedbackList] = useState([])
  const getProduct = useCallback(async () => {
    const response = await axiosInstance.get(`/product/${SKU}`)
    setProduct(response.data)
  }, [SKU])

  const getFeedbackList = useCallback(async () => {
    const displayedProduct = await axiosInstance.get(`/displayed-product/${SKU}`)
    const response = await axiosInstance.get(`/feedback/${displayedProduct.data[0].id}`)
    setFeedbackList(response.data)
  }, [SKU])

  useEffect(() => {
    getProduct()
    getFeedbackList()
  }, [getProduct, getFeedbackList])

  const filters = [
    'All',
    '5 Stars', 
    '4 Stars', 
    '3 Stars', 
    '2 Stars', 
    '1 Star'
  ];

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item[product.SKU]);

    if (productIndex !== -1) {
      cart[productIndex][product.SKU] += quantity;
    } else {
      cart.push({ [product.SKU]: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Add to shopping cart successfully!", {
      autoClose: 3000, 
      hideProgressBar: true,
    });
    if (cart.length) updateCartItemCount(cart.length)
  };

  const handleSubmit = () => {
    localStorage.removeItem('payment')
    const shoppingCart = JSON.parse(localStorage.getItem('payment')) || [];
    shoppingCart.push({[product.SKU] : quantity})
    localStorage.setItem('payment', JSON.stringify(shoppingCart));
  }

  const handleFilterClick = async (filter) => {
    setActiveFilter(filter);
    let rating = 0 
    switch(filter) {
      case '5 stars': {
        rating = 5
        break
      }
      case '4 stars': {
        rating = 4
        break
      }
      case '3 stars': {
        rating = 3
        break
      }
      case '2 stars': {
        rating = 2
        break
      }
      case '1 star': {
        rating = 1
        break
      }
      default: {
        break
      }
    }
    const displayedProduct = await axiosInstance.get(`/displayed-product/${SKU}`)
    if (rating === 0){
      const response = await axiosInstance.get(`/feedback/${displayedProduct.data[0].id}`)
      setFeedbackList(response.data)
      return
    }
    const response = await axiosInstance.get(`/feedback/rating/${rating}?productId=${displayedProduct.data[0].id}`)
    setFeedbackList(response.data)
  };

  const handleDecrement = () => {
    if (quantity > 1) {
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
            <FaStar className="text-customBlack"/>
            <FaStar className="text-customBlack"/>
            <FaStar className="text-customBlack"/>
            <FaStar className="text-customBlack"/>
            <FaStar className="text-customBlack"/>
            <p className="ml-2">Sold: 500</p>
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
        Quantity:
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
          <p className="my-2 text-xl">Sub-General</p>
          <p className="font-bold text-xl">{formatNumber(product.sellingPrice * quantity)} VNĐ</p>
          <Link to='/payment'><button onClick={() => handleSubmit()} className="w-full mt-2 py-2 bg-customBlack text-white rounded">
            Buy
          </button></Link>
          <button onClick={() => handleAddToCart()} className="my-4 w-full py-2 border border-[#0A68FF] text-[#0A68FF] rounded">
            Add to cart
          </button>
        </div>
      </div>
        <div className="w-[1400px] p-10 mx-auto">
            <p className="text-2xl font-bold">Relative</p>
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
        <div className="w-[1400px] m-10 p-6 bg-white rounded-md">
            <p className="text-2xl font-bold">Rating</p>
            <p className="text-xl">Overview</p>
            <div className="flex flex-wrap justify-center flex-col mt-2">
                <div className="flex items-center">
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <p className='ml-4'>2</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-customBlack"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <FaStar className="text-[#c0c0c0]"/>
                  <p className='ml-4'>0</p>
                </div>
            </div>
            <div className="my-4">
              <p>Filter: </p>
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
              {feedbackList.map((item, index) => {
                return (
                  <div key={index} className="flex items-center mt-8 p-2 border border-[#FFF5EE] shadow-md rounded-md">
                    <div className="flex items-center">
                      <img className="w-[50px] h-[50px]" src={item.customer.user.image} alt="Customer" />
                      <div className="ml-6">
                        <p className="">{item.customer.fullName}</p>
                        <p className="text-sm text-gray-500 mt-2">Time: {new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="ml-8">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className={`text-3xl ${
                              star <= item.rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      <p>{item.content}</p>
                    </div>
                  </div>

                )
              })}
              <div className="mt-4">
                <ModalFeedback SKU = {SKU}/>
              </div>
            </div>
        </div>
        <div className="relative z-[9999]"><ToastContainer position="top-right" /></div>
    </div>
  );
}

export default DetailProduct;
