import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/cartcontext';

const Shoppingcart = () => {
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
  const { updateCartItemCount } = useCart();
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateCartItemCount(count);
  }, [cartItems]);

  const handleDelete = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(1, item.quantity + delta)
        };
      }
      return item;
    }));
  };

  const toggleSelectItem = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.selected) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  }
  const calculateTotal1 = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="w-full max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-2">
          The total value of your shopping cart is {calculateTotal1().toLocaleString()} VND.
        </h2>
        <p className="text-center text-gray-500 mb-10">Free shipping for all orders</p>

        {cartItems.map(item => (
          <div key={item.id} className="h-[100px] flex items-center mb-6 justify-between border-b">
            <div className='flex flex-row'>
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input type="checkbox" checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check" />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                </label>
              </div>
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center space-x-4">
                  <span>Quantity:</span>
                  <div className="flex items-center">
                    <button
                      className="px-1 py-0 text-white bg-gray-600 rounded-l"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="px-1 py-0 text-white bg-gray-600 rounded-r"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-semibold flex flex-col justify-between  items-end h-[75px]">
              {(item.price * item.quantity).toLocaleString()} VND
              <button className="text-red-500 ml-4" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}

        <div className=" pt-4 flex justify-end">
          <div className='w-[40%]'>
            <div className="flex justify-between text-base mb-2">
              <span>Sub-Total</span>
              <span>{calculateTotal().toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between text-base mb-2">
              <span>Transportation</span>
              <span>Free</span>
            </div>
            <div className='h-1 border-t border-black'>

            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Full payment</span>
              <span>{calculateTotal().toLocaleString()} VND</span>
            </div>
            <Link to='/payment'>
              <button className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold">Payment </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shoppingcart;
