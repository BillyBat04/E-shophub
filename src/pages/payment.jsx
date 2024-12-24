/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import AddressModal from '../components/addressmodal';
import axiosInstance from '../config/api';
import formatNumber from '../helpers/formatNumber';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [address, setAddress] = useState({})
    const navigate = useNavigate()
    const [productList, setProductList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState(
        productList.reduce((acc, item) => {
          acc[item.SKU] = 1;
          return acc;
        }, {})
      );
    const {user} = useUser()
    const handlePaymentSelection = (method) => {
        setSelectedPayment(method);
    };
    const getProductList = useCallback(async () => {
        const cart = JSON.parse(localStorage.getItem('payment')) || []
        console.log(cart)
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

    const handleSubmit = async () => {
        const fullAddress = `${address.address}, ${address.ward}, ${address.district}, ${address.city}`
        const response = await axiosInstance.get(`/customer/get-by-user/${user.id}`)
        const customer = response.data
        console.log(customer.id)
        const invoiceData = {
            totalPrice,
            address: fullAddress,
            customerId: customer.id,
            invoiceDate: new Date(),
            status: 'PROCESSING'
        }
        const newInvoice = await axiosInstance.post('/invoice', invoiceData)
        const invoiceId = newInvoice.data.id 
        for (let product of productList){

            const displayedProduct = await axiosInstance.get(`/displayed-product/${product.SKU}`)
            await axiosInstance.post('/invoice-detail', {
                quantity: quantity[product.SKU],
                totalPrice: quantity[product.SKU] * product.sellingPrice,
                invoiceId,
                displayedProductId: displayedProduct.data[0].id
            } )
        }
        navigate('/personal/history')
        window.location.reload()
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
                                    <p className="text-sm">Số lượng: {quantity[item.SKU]}</p>
                                </div>
                                <p className="font-bold text-sm text-[#FF424E]">Thành tiền: {formatNumber(item.sellingPrice * quantity[item.SKU])} VNĐ</p>
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
                    <p className='ml-6 text-[#FF424E] text-2xl font-bold'>{formatNumber(totalPrice)}</p>
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
