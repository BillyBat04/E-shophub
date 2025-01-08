import { useCallback, useEffect, useState } from 'react';
import AddressModal from '../components/addressmodal';
import axiosInstance from '../config/api';
import formatNumber from '../helpers/formatNumber';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import QRCodeModal from '../components/qr'; // Import modal mới tạo
import axios from 'axios';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [address, setAddress] = useState({});
    const [productList, setProductList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [file, setFile] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [quantity, setQuantity] = useState(
        productList.reduce((acc, item) => {
          acc[item.SKU] = 1;
          return acc;
        }, {})
    );
    const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false); // Trạng thái hiển thị modal
    const navigate = useNavigate();
    const { user } = useUser();


    useEffect(() => {
        const getUser = async () => {
            const response = await axiosInstance.get(`/customer/get-by-user/${user?.id}`)
            setCustomer(response.data)
        }
        getUser()
    }, [user])

    const handlePaymentSelection = (method) => {
        setSelectedPayment(method);
        if (method === 'momo' || method === 'VNPay') {
            // Tạo dữ liệu QR khi chọn Momo hoặc VNPay
            setQRCodeModalOpen(true); // Mở modal khi chọn thanh toán
        }
    };

    const getProductList = useCallback(async () => {
        const cart = JSON.parse(localStorage.getItem('payment')) || [];
        for (let i = 0; i < cart.length; i++) {
            for (let productSKU in cart[i]) {
                const response = await axiosInstance.get(`/product/${productSKU}`);
                setProductList(prevState => [...prevState, response.data]);
                setTotalPrice(prevState => prevState + response.data.sellingPrice * cart[i][productSKU]);
                setQuantity((prevQuantities) => {
                    return {
                      ...prevQuantities,
                      [productSKU]: cart[i][productSKU],
                    };
                });
            }
        }
    }, []);

    const handleSubmit = async () => {
        const fullAddress = `${address.address}, ${address.ward}, ${address.district}, ${address.city}`;
        const response = await axiosInstance.get(`/customer/get-by-user/${user.id}`);
        const customer = response.data;

        const data = new FormData()
        data.append('image', file)
        data.append('totalPrice', parseInt(totalPrice))
        data.append('address', fullAddress)
        data.append('customerId', customer.id)
        data.append('invoiceDate', new Date().toISOString())
        data.append('status', 'PROCESSING')
        const newInvoice = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/invoice',
            data,
            headers: {'Content-Type': 'multipart/form-data'}
        })

        const invoiceId = newInvoice.data.id;
        for (let product of productList) {
            const displayedProduct = await axiosInstance.get(`/displayed-product/${product.SKU}`);
            try {
                await axiosInstance.post('/invoice-detail', {
                    quantity: quantity[product.SKU],
                    totalPrice: quantity[product.SKU] * product.sellingPrice,
                    invoiceId,
                    displayedProductId: displayedProduct.data[0].id
                });
                navigate('/personal/history');
                window.location.reload();
            } catch (err) {
                console.log(err)
                alert('Số lượng tồn kho hiện tại ít hơn số lượng bạn đặt')
            }
        }
    };

    useEffect(() => {
        getProductList();
    }, [getProductList]);

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
                <section className="max-w-lg mx-auto ">
                    <h2 className="text-xl font-semibold mb-4">Shipping address</h2>
                    <div className='flex justify-between'>
                        <p>Giao tới</p>
                        <AddressModal setAddress={setAddress} />
                    </div>
                    <div className="border border-gray-300 p-6 my-4 rounded-lg shadow-md bg-white">
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700">Họ và tên:</p>
                            <p className="text-lg text-gray-900">{address.name || customer?.fullName}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700">Số điện thoại:</p>
                            <p className="text-lg text-gray-900">{address.phone || customer?.phoneNumber}</p>
                        </div>

                        {Object.keys(address).length > 0 ? (
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Địa chỉ:</p>
                                <p className="text-lg text-gray-900">{address.address}, {address.ward}, {address.district}, {address.city}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Địa chỉ:</p>
                                <p className="text-lg text-gray-900">{customer?.address}</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="max-w-lg mb-6 w-full">
                    <h2 className="text-xl font-semibold mb-4">Payment method</h2>
                    <div className="flex justify-center">
                        <div className="mt-6 flex flex-col items-center">
                            <div onClick={() => handlePaymentSelection('COD')}>
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
                            <div onClick={() => handlePaymentSelection('momo')}>
                                <img className=' w-32 h-32 rounded-lg ' src={`${selectedPayment === 'momo' ? 'src/assets/momop.png' : 'src/assets/momob.png'}`} />
                            </div>
                            <input
                                type="checkbox"
                                checked={selectedPayment === 'momo'}
                                onChange={() => handlePaymentSelection('momo')}
                            />
                        </div>
                    </div>
                </section>

                {/* Order Button */}
                <section className='ml-2 mt-4'>
                    <p className='text-xl'>Đơn hàng</p>
                    <div className='flex justify-between mt-2'>
                        <p className='text-[#808090]'>Tổng tiền hàng: </p>
                        <p>{formatNumber(totalPrice)}đ</p>
                    </div>
                    <div className='flex justify-between my-4'>
                        <p className='text-[#808090]'>Phí vận chuyển: </p>
                        <p>16.500đ</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Tổng tiền thanh toán: </p>
                        <p className='ml-6 text-[#FF424E] text-2xl font-bold'>{formatNumber(totalPrice + 16500)}đ</p>
                    </div>
                </section>

                <section className="max-w-lg mx-auto mt-8">
                    <button
                        onClick={() => handleSubmit()}
                        className="w-full bg-[#FF424E] text-white py-3 rounded-lg font-semibold transition-all hover:bg-[#FF3040] flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Đặt hàng
                    </button>
                </section>
            </div>

            {/* QR Code Modal */}
            {isQRCodeModalOpen && <QRCodeModal setFile = {setFile} amount={totalPrice + 16500} setQRCodeModalOpen={setQRCodeModalOpen} />}
        </div>
    );
};

export default PaymentPage;
