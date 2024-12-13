import React from 'react'
import { Link, useParams } from "react-router-dom";
const OrderDetail = () => {
    const { orderId } = useParams();

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
                <Link className='flex items-center' to="..">
                    <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Order {orderId}</button>
                </Link>
                <p className="text-base font-semibold justify-self-center">
                    ORDER DETAIL
                </p>
            </div>

            <div className="pt-3 grid grid-cols-3 w-full h-full gap-4">
                <div className="col-span-2 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Order Detail</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="mb-10 font-bold text-left">
                                <th> </th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(3)].map((_, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="flex items-center space-x-2 py-2">
                                        <img src="src/assets/16pr.svg" alt="Product" className="w-12 h-12 rounded" />
                                        <span>Iphone 16 Pro - 256GB</span>
                                    </td>
                                    <td className="text-center">1</td>
                                    <td className="text-center">20.000.000</td>
                                    <td className="text-center">20.000.000</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Customer Information</h3>
                    <div className='xl:space-y-2'>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Name: </span>
                            <span className=''>Le Bao Minh </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Phone number: </span>
                            <span className=''>0832873782 </span>
                        </div>
                        <div className='w-full flex flex-col'>
                            <span className='font-bold'>Note: </span>
                            <span className=''>083287jsksjkmlxwkmkxmw3782 </span>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 h-full p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Delivery Information</h3>
                    <div className='xl:space-y-2'>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Phone number: </span>
                            <span className=''>0812352371 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Address: </span>
                            <span className=''>Binh Chieu, Thu Duc, Ho Chi Minh city </span>
                        </div>
                        <div className='w-full flex justify-end'>
                            <span className="inline-block bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full mt-2">In transit</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Order Summary</h3>
                    <div className='xl:space-y-2'>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Order created: </span>
                            <span className=''>Thu 7 Nov </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Order time: </span>
                            <span className=''>21:21 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Item quantity: </span>
                            <span className=''>1 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Sub total: </span>
                            <span className=''>20.000.000 VND </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Delivery fee: </span>
                            <span className=''>0 VND</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetail
