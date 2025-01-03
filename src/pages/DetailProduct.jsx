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
  const [category, setCategory] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [feedbackList, setFeedbackList] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const getProduct = useCallback(async () => {
    const response = await axiosInstance.get(`/product/${SKU}`)
    if (response.status === 200) {
      setProduct(response.data)
      setCategory(response.data.category.categoryName)
    }
  }, [SKU])

  const getFeedbackList = useCallback(async () => {
    const displayedProduct = await axiosInstance.get(`/displayed-product/${SKU}`)
    const response = await axiosInstance.get(`/feedback/${displayedProduct.data[0].id}`)
    setFeedbackList(response.data)
  }, [SKU])

  const getRelatedProducts = useCallback(async () => {
    const response = await axiosInstance.get(`/displayed-product/search/filter/${category}`)
    response.data = response.data.filter((item) => item.product.SKU !== product.SKU);
    console.log(response.data)
    setRelatedProducts(response.data);
  }, [category, product.SKU])

  const getAvgRating = useCallback(async () => {
    const response = await axiosInstance.get(`/feedback/avg-rating/${SKU}`)
    setAvgRating(response.data)
  }, [SKU])

  useEffect(() => {
    getProduct()
    getFeedbackList()
    getAvgRating()
    getRelatedProducts()
  }, [getProduct, getFeedbackList, getAvgRating, getRelatedProducts])

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
    <div className="bg-gradient-to-r from-gray-100 to-gray-200">
  <div className="flex flex-col lg:flex-row justify-between p-8 max-w-[1400px] mx-auto gap-6">
    {/* Column 1: Product Image */}
    <div className="flex-1 p-6 bg-white rounded-md shadow-lg w-1/3">
      <Thumbnail product={product} />
    </div>

    {/* Column 2: Product Info */}
    <div className="flex-1 p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{product.productName}</h2>
      <div className="flex items-center mb-4">
        <p className="text-lg text-gray-600 mr-2">{avgRating}</p>
        {avgRating > 0 ? (
          [...Array(avgRating)].map((_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))
        ) : (
          <FaStar className="text-gray-400" />
        )}
        <p className="ml-4 text-gray-600">Đã bán: 10 sản phẩm</p>
      </div>
      <p className="text-3xl font-extrabold text-blue-600">{formatNumber(product?.sellingPrice || 0)}đ</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
    </div>

    {/* Column 3: Price, Quantity, Actions */}
    <div className="flex-1 p-6 bg-white rounded-md shadow-lg">
      <form>
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Quantity:
        </label>
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={handleDecrement}
            className="p-3 bg-gray-200 rounded-l-lg focus:ring focus:ring-gray-300"
          >
            -
          </button>
          <input
            type="text"
            id="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-16 text-center border border-gray-300"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="p-3 bg-gray-200 rounded-r-lg focus:ring focus:ring-gray-300"
          >
            +
          </button>
        </div>
      </form>
      <p className="text-xl mb-4">Subtotal:</p>
      <p className="text-2xl font-bold text-green-600">{formatNumber(product.sellingPrice * quantity)} VNĐ</p>
      <Link to='/payment'><button
        onClick={handleSubmit}
        className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Buy Now
      </button></Link>
      <button
        onClick={handleAddToCart}
        className="w-full py-3 mt-4 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Related Products Section */}
  <div className="max-w-[1400px] p-10 mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {relatedProducts.length > 0 && relatedProducts.map((item, index) => (
        <SimilarProduct SKU = {item?.product.SKU} sellingPrice = {item?.product.sellingPrice} image = {item?.product.image} key={index} />
      ))}
    </div>
  </div>

  {/* Ratings Section */}
  <div className="max-w-[1400px] p-6 mx-auto bg-white rounded-md shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Ratings</h2>

    {/* Filter Section */}
    <div className="my-6">
      <p className="text-lg mb-4">Filter:</p>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <span
            key={filter}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 shadow-sm ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
    </div>

    {/* Feedback Section */}
    <div className="space-y-6">
      {feedbackList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start p-4 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-all duration-300"
        >
          <img
            className="w-16 h-16 rounded-full"
            src={item.customer.user.image}
            alt="Customer"
          />
          <div className="ml-4">
            <p className="text-lg font-bold">{item.customer.fullName}</p>
            <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    star <= item.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="mt-2 text-gray-800">{item.content}</p>
          </div>
        </div>
      ))}
      <ModalFeedback SKU={SKU} />
    </div>
  </div>

  {/* Toast Container */}
  <div className="relative z-50">
    <ToastContainer position="top-right" />
  </div>
</div>

  );
}

export default DetailProduct;
