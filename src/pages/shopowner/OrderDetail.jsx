import React from 'react';
import { Link, useParams } from "react-router-dom";

const OrderDetail = () => {
    const { orderId } = useParams();

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
                <Link className='flex items-center' to="..">
                    <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Đơn hàng {orderId}</button>
                </Link>
                <p className="text-base font-semibold justify-self-center">
                    CHI TIẾT ĐƠN HÀNG
                </p>
            </div>

            <div className="pt-3 grid grid-cols-3 w-full h-full gap-4">
                <div className="col-span-2 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Chi tiết đơn hàng</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="mb-10 font-bold text-left">
                                <th> </th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Giá</th>
                                <th className="text-center">Tổng giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(3)].map((_, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="flex items-center space-x-2 py-2">
                                        <img src="src/assets/16pr.svg" alt="Sản phẩm" className="w-12 h-12 rounded" />
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
                    <h3 className="font-medium text-xl mb-4">Thông tin khách hàng</h3>
                    <div className='xl:space-y-2'>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Họ và tên: </span>
                            <span className=''>Lê Bảo Minh </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Số điện thoại: </span>
                            <span className=''>0832873782 </span>
                        </div>
                        <div className='w-full flex flex-col'>
                            <span className='font-bold'>Ghi chú: </span>
                            <span className=''>083287jsksjkmlxwkmkxmw3782 </span>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 h-full p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Thông tin giao hàng</h3>
                    <div className='xl:space-y-2'>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Số điện thoại: </span>
                            <span className=''>0812352371 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Địa chỉ: </span>
                            <span className=''>Bình Chiểu, Thủ Đức, TP Hồ Chí Minh </span>
                        </div>
                        <div className='w-full flex justify-end'>
                            <span className="inline-block bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full mt-2">Đang giao</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-medium text-xl mb-4">Tóm tắt đơn hàng</h3>
                    <div className='xl:space-y-2'>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Ngày tạo đơn: </span>
                            <span className=''>Thứ 7 ngày 7 tháng 11 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Thời gian đặt: </span>
                            <span className=''>21:21 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Số lượng sản phẩm: </span>
                            <span className=''>1 </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Tạm tính: </span>
                            <span className=''>20.000.000 VND </span>
                        </div>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold'>Phí giao hàng: </span>
                            <span className=''>0 VND</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;
