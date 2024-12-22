/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import AddressModal from '../components/addressmodal';
import axiosInstance from '../config/api';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [address, setAddress] = useState({})
    const [productList, setProductList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState(
        productList.reduce((acc, item) => {
          acc[item.SKU] = 1;
          return acc;
        }, {})
      );
    const handlePaymentSelection = (method) => {
        setSelectedPayment(method);
    };

    const handleIncrement = (id, e, price) => {
        setQuantity((prevQuantities) => {
          const newQuantity = (prevQuantities[id] || 1) + 1;
      
          setTotalPrice(price * newQuantity);

          return {
            ...prevQuantities,
            [id]: newQuantity,
          };
        });
      };
      const handleDecrement = (id, e, price) => {
        setQuantity((prevQuantities) => {

          const newQuantity = prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0;

          setTotalPrice(price * newQuantity);

          return {
            ...prevQuantities,
            [id]: newQuantity,
          };
        });
      };
      

      const handleChange = (id, e, price) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
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
            }
        }
    }, [])

    const handleSubmit = () => {
        const data = {
            totalPrice,
            address,
        }
        console.log(data)
    }

    useEffect(() => {
        getProductList()
    }, [getProductList])

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex ">
            <section className=" mx-auto mb-6 w-[70%]">
                <h1 className="text-3xl font-bold text-center mb-8">Thanh toán đơn hàng</h1>
                <div className='flex flex-row justify-between'>
                    <h2 className="text-xl font-semibold mb-4">Your shopping</h2>
                </div>
                {productList?.map((item, index) => (
                    <div key={index} className="flex mb-4">
                        <div className="flex justify-center items-center w-full">
                            <img src={item.image} className='w-[70px] h-[70px] object-cover mr-4' />
                            <div className="bg-gray-100 p-4 w-[74%] rounded-lg flex flex-row justify-between ">
                                <div className='flex flex-col '>
                                    <h3 className="font-semibold">{item.productName}</h3>
                                    <form className="max-w-xs">
                                        <label htmlFor="quantity-input" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
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
                                <p className="font-bold text-sm">Đơn giá: 50.000 VNĐ</p>
                                <p className="font-bold text-sm text-[#FF424E]">Thành tiền: {totalPrice || item.sellingPrice} VNĐ</p>
                            </div>
                        </div>

                    </div>
                ))}

            </section>

            <div>
            <section className="max-w-lg mx-auto ml-6 ">
                <h2 className="text-xl font-semibold mb-4">Shipping address</h2>
                <div className='flex justify-between'>
                    <p>Giao tới</p>
                    <AddressModal setAddress = {setAddress}/>
                </div>
                <div className='border border-black p-4 my-4 rounded-md'>
                    <div>
                        <p>{address.name}</p>
                        <p>{address.phone}</p>
                    </div>
                    {Object.keys(address).length > 0 && <p>{address.address}, {address.ward}, {address.district}, {address.city}</p>}
                </div>
            </section>

            <section className="max-w-lg mx-auto mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment method</h2>
                <div className="flex justify-between">
                    <div className="mt-6 flex flex-col items-center">
                        <div
                            onClick={() => handlePaymentSelection('COD')}>
                            <img className=' w-20 h-20 rounded-lg ' src={`${selectedPayment === 'COD' ? 'src/assets/CODg.svg' : 'src/assets/CODb.svg'}`} />
                        </div>
                        <input
                            type="checkbox"
                            checked={selectedPayment === 'COD'}
                            onChange={() => handlePaymentSelection('COD')}
                            className="mt-6"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            onClick={() => handlePaymentSelection('momo')}

                        >
                            <img className=' w-32 h-32 rounded-lg ' src={`${selectedPayment === 'momo' ? 'src/assets/momop.png' : 'src/assets/momob.png'}`} />

                        </div>
                        <input
                            type="checkbox"
                            checked={selectedPayment === 'momo'}
                            onChange={() => handlePaymentSelection('momo')}
                            className=""
                        />
                    </div>


                    <div className="mt-6 flex flex-col items-center">
                        <div
                            onClick={() => handlePaymentSelection('VNPay')}
                        >
                            <img className=' w-20 h-20 rounded-lg shadow-xl ' src={`${selectedPayment === 'VNPay' ? 'src/assets/vnpayw.png' : 'src/assets/vnpayb.png'}`} />
                        </div>

                        <input
                            type="checkbox"
                            checked={selectedPayment === 'VNPay'}
                            onChange={() => handlePaymentSelection('VNPay')}
                            className="mt-6"
                        />
                    </div>
                </div>
            </section>

            {/* Order Button */}
            <section className='ml-2 mt-4'>
                <p className='text-xl'>Đơn hàng</p>
                <div className='flex justify-between mt-2'>
                    <p className='text-[#808090]'>Tổng tiền hàng: </p>
                    <p>43.990.000đ</p>
                </div>
                <div className='flex justify-between my-4'>
                    <p className='text-[#808090]'>Phí vận chuyển: </p>
                    <p>16.500đ</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Tổng tiền thanh toán: </p>
                    <p className='ml-6 text-[#FF424E] text-2xl font-bold'>43.990.000 ₫</p>
                </div>
            </section>
            <section className="max-w-lg mx-auto mt-8">
                <button onClick={() => handleSubmit()} className="w-full bg-[#FF424E] text-white py-3 rounded-lg font-semibold">
                    Order
                </button>
            </section>
            </div>
        </div>
    );
};

export default PaymentPage;
