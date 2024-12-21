import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddressModal from '../components/addressmodal';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [address, setAddress] = useState({})
    const handlePaymentSelection = (method) => {
        setSelectedPayment(method);
    };
    const cartItems = [
        {
            id: 1,
            name: "Apple iPhone 16 Pro",
            description: "8GB, Titan Desert",
            price: 12999000,
            quantity: 1,
            image: "src/assets/16pr.svg",
        },
        {
            id: 2,
            name: "Apple iPhone 16 Pro",
            description: "8GB, Titan Desert",
            price: 12999000,
            quantity: 1,
            image: "src/assets/16pr.svg",
        }
    ];
    return (
        <div className="min-h-screen bg-gray-50 p-8 flex ">
            <section className=" mx-auto mb-6 w-[70%]">
                <h1 className="text-3xl font-bold text-center mb-8">Payment</h1>
                <div className='flex flex-row justify-between'>
                    <h2 className="text-xl font-semibold mb-4">Your shopping</h2>
                    <p className="text-right font-semibold">Full payment: 12,999,000 VND</p>
                </div>
                {cartItems.map((item) => (
                    <div key={item.id} className="flex mb-4">
                        <div className="flex justify-center items-center w-full">
                            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold mr-4">{item.id}</div>
                            <img src={item.image} className='w-[70px] h-[70px] object-cover mr-4' />
                            <div className="bg-gray-100 p-4 w-[74%] rounded-lg flex flex-row justify-between ">
                                <div className='flex flex-col '>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-sm text-gray-600">{item.quantity}</p>
                                </div>
                                <p className="font-bold text-sm">{(item.price * item.quantity).toLocaleString()}</p>
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
                <div className='flex justify-between'>
                    <p className='text-[#808090]'>Tổng tiền hàng: </p>
                    <p>43.990.000đ</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-[#808090]'>Phí vận chuyển: </p>
                    <p>16.500đ</p>
                </div>
                <div className='flex justify-between'>
                    <p>Tổng tiền thanh toán: </p>
                    <p className='text-[#FF424E] text-2xl font-bold'>43.990.000 ₫</p>
                </div>
            </section>
            <section className="max-w-lg mx-auto mt-8">
                <button className="w-full bg-[#FF424E] text-white py-3 rounded-lg font-semibold">
                    Order
                </button>
            </section>
            </div>
        </div>
    );
};

export default PaymentPage;
