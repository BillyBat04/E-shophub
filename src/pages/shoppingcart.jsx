import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/cartcontext';
import axiosInstance from '../config/api';
import DeleteModal from '../components/deletemodal';
import formatNumber from '../helpers/formatNumber';


const Shoppingcart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apple iPhone 16 Pro",
      description: "8GB, Titan Desert",
      price: 12999000,
      quantity: 1,
      image: "src/assets/16pr.svg",
      selected: false,
    },
    {
      id: 2,
      name: "Apple iPhone 16 Pro",
      description: "8GB, Titan Desert",
      price: 12999000,
      quantity: 1,
      image: "src/assets/16pr.svg",
      selected: false,
    }
  ]);
  const [productList, setProductList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(
      productList.reduce((acc, item) => {
        acc[item.SKU] = 1;
        return acc;
      }, {})
    );
  const { updateCartItemCount } = useCart();
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateCartItemCount(count);
  }, [cartItems, updateCartItemCount]);

  const handleDelete = (id) => {
    setIsModalOpen(prevState => !prevState)
    setCartItems(cartItems.filter(item => item.id !== id));
  };


  const handleIncrement = (id, e, price) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item[id]);

    if (productIndex !== -1) {
      cart[productIndex][id] += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setQuantity((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) + 1;
  
      setTotalPrice(prevState => prevState += price);

      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });
  };
  const handleDecrement = (id, e, price) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item[id]);

    if (productIndex !== -1) {
      if (cart[productIndex][id] > 1) {
        cart[productIndex][id] -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else return
    }
    setQuantity((prevQuantities) => {

      const newQuantity = prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0;

      setTotalPrice(prevState => (prevState - (price)))

      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });
  };
  

  const handleChange = (id, e, price) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item[id]);

    if (productIndex !== -1) {
      cart[productIndex][id] = value;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
    setTotalPrice(price * value)
  };

  const getProductList = useCallback(async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    for (let i = 0; i < cart.length; i++) {
        for (let productSKU in cart[i]){
            const response = await axiosInstance.get(`/product/${productSKU}`)
            setProductList(prevState => [...prevState, response.data])
            setTotalPrice(prevState => prevState + response.data.sellingPrice * cart[i][productSKU])
            setQuantity((prevQuantities) => {
              return {
                ...prevQuantities,
                [productSKU]: cart[i][productSKU],
              };
            });
        }
    }
  }, [])

  useEffect(() => {
    getProductList()
}, [getProductList])


  const toggleSelectItem = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  };

  const handleSubmit = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('payment', JSON.stringify(cart));
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="w-full max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
        <p className="text-center text-gray-500 mb-10">Free shipping for all orders</p>

        {productList.map(item => (
          <div key={item.id} className="py-4 flex items-center mb-6 justify-between border-b">
            <div className='flex flex-row items-center'>
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input type="checkbox" checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check" />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
              </div>
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
              <div className="w-3/4">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <div className="flex items-center space-x-4">
                <form className="max-w-xs">
                                        <label htmlFor="quantity-input" className="block mb-2 text-[14px] font-medium text-gray-900 dark:text-white">
                                            Số lượng:
                                        </label>
                                        <div className="relative flex items-center max-w-[8rem]">
                                            <button
                                            type="button"
                                            onClick={e => handleDecrement(item.SKU, e, item.sellingPrice)}
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                            >
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                            </button>
                                            <input
                                            type="text"
                                            id="quantity-input"
                                            value={quantity[item.SKU] || 1}
                                            onChange={(e) => handleChange(item.SKU, e, item.sellingPrice)}
                                            data-input-counter
                                            aria-describedby="helper-text-explanation"
                                            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="999"
                                            required
                                            />
                                            <button
                                            type="button"
                                            onClick={e => handleIncrement(item.SKU, e, item.sellingPrice)}
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                            >
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                            </button>
                                        </div>
                                        </form>
                </div>
              </div>
            </div>
            <div className="w-1/4 font-semibold flex flex-col justify-between  items-end h-[75px]">
              {formatNumber(item.sellingPrice * (quantity[item.SKU] || 1))} VND
              <button className="text-red-500 ml-4" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>

            {isModalOpen && <DeleteModal isModalOpen = {isModalOpen} setIsModalOpen={setIsModalOpen}/>}

          </div>
        ))}

        <div className=" pt-4 flex justify-end">
          <div className='w-[40%]'>
            <div className="flex justify-between font-bold text-base">
              <span>Tạm tính</span>
              <span>{formatNumber(totalPrice)} VND</span>
            </div>
            <Link to='/payment'>
              <button onClick={() => handleSubmit()} className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold">Thanh toán </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shoppingcart;
