import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/api';

const SupplierDetail = () => {
    const { supplierId } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState(null);
    const [supplierName, setSupplierName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactPerson, setContactPerson] = useState('');

    const getSupplier = useCallback(async () => {
        const response = await axiosInstance.get(`/supplier/${supplierId}`);
        setSupplier(response.data);
    }, [supplierId]);

    useEffect(() => {
        getSupplier();
    }, [getSupplier]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            supplierName,
            email,
            address,
            phoneNumber,
            contactPerson,
        };

        const response = await axiosInstance.patch(`/supplier/${supplierId}`, data);
        console.log(response.data);
        // navigate('/admin/supplier');
        // window.location.reload();
    };

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
                <Link className='flex items-center' to="..">
                    <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Nhà cung cấp {supplierId}</button>
                </Link>
                <p className="text-base font-semibold justify-self-center">
                    THÔNG TIN NHÀ CUNG CẤP
                </p>
            </div>
            <div className='pt-3 grid grid-cols-2 gap-5 w-full h-full'>
                <div className='grid grid-rows-6 gap-4'>
                    <div className='p-5 row-span-4 w-full h-full bg-white rounded-lg customShadow'>
                        <h3 className="text-base mb-3 font-semibold">Thông tin chung</h3>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Tên nhà cung cấp</h5>
                            <input value={supplierName || supplier?.supplierName} onChange={e => setSupplierName(e.target.value)} className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Email</h5>
                            <input value={email || supplier?.email} onChange={e => setEmail(e.target.value)} className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Địa chỉ</h5>
                            <input value={address || supplier?.address} onChange={e => setAddress(e.target.value)} className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Số điện thoại</h5>
                            <input value={phoneNumber || supplier?.phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Người liên hệ</h5>
                            <input value={contactPerson || supplier?.contactPerson} onChange={e => setContactPerson(e.target.value)} className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='p-5 w-full h-[90%] overflow-y-scroll bg-white rounded-lg customShadow'>
                        <h3 className="text-base mb-3 font-semibold">Sản phẩm</h3>
                        <div className=''>
                            {supplier?.products.map((product) => {
                                return (
                                    <div key={product.id} className="flex gap-4 my-3">
                                        <div className="flex-grow w-1/2">
                                            <h5 className='font-normal text-slate-400 mb-2'>SKU</h5>
                                            <p className='flex justify-center items-center p-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full text-black'>{product.SKU}</p>
                                        </div>
                                        <div className="flex-grow w-1/2">
                                            <h5 className='font-normal text-slate-400 mb-2'>Tên sản phẩm</h5>
                                            <p className='flex justify-center items-center p-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full text-black'>{product.productName}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='flex justify-end items-end w-full h-[10%]'>
                        <button onClick={e => handleSubmit(e)} className='rounded-xl h-[80%] w-[200px] bg-customBlack text-white'>LƯU</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail;
