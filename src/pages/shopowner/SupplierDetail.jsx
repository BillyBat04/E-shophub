
import { React, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Input } from "@mui/base";
import { RxCross2 } from "react-icons/rx";
const SupplierDetail = () => {
    const { supplierId } = useParams();
    const [productOptions, setproductOptions] = useState([{ id: 0 }]);
    const productOptionCount = useRef(1);

    const addproductOption = () => {
        setproductOptions((prevOptions) => [
            ...prevOptions,
            { id: productOptionCount.current },
        ]);
        productOptionCount.current += 1;
    };

    const removeproductOption = (id) => () => {
        setproductOptions((options) => options.filter((option) => option.id !== id));
    };
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="text-base grid lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
                <Link className='flex items-center' to="..">
                    <button className="w-[200px] mr-auto text-gray-600 text-lg">&#8592; Supplier {supplierId}</button>
                </Link>
                <p className="text-base font-semibold justify-self-center">
                    SUPPLIER INFORMATION
                </p>
            </div>
            <div className='pt-3 grid grid-cols-2 gap-5 w-full h-full'>
                <div className='grid grid-rows-6 gap-4'>
                    <div className='p-5 row-span-4 w-full h-full bg-white rounded-lg customShadow'>
                        <h3 className="text-base mb-3 font-semibold">General Information</h3>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Supplier Name</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Address</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3 w-1/2'>
                            <h5 className='font-normal text-slate-400 mb-2'>Phone number</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                    </div>
                    <div className='p-5 row-span-2 w-full h-full bg-white rounded-lg customShadow'>
                    <h3 className="text-base mb-3 font-semibold">Discount</h3>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Percentage</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                    </div>
                </div>
                <div className='overflow-scroll'>
                    <div className='p-5 w-full h-[90%] overflow-scroll bg-white rounded-lg customShadow'>
                    <h3 className="text-base mb-3 font-semibold">Product</h3>
                        <button
                            className="border border-blue-700 px-3 py-1 rounded-md text-blue-700"
                            type="button"
                            onClick={addproductOption}>
                            Add Option
                        </button>
                        <div className='overflow-scroll '>
                            {productOptions.map((option) => {
                                return (
                                    <div key={option.id} className="flex gap-4 mt-3">
                                        <div className="flex-grow">
                                            <h5 className='font-normal text-slate-400 mb-2' htmlFor={`sku-${option.id}`}>SKU</h5>
                                            <Input
                                                id={`sku-${option.id}`}
                                                slotProps={{
                                                    input: {
                                                        className:
                                                            "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className='font-normal text-slate-400 mb-2' htmlFor={`quantity-${option.id}`}>Quantity</h5>
                                            <Input
                                                id={`quantity-${option.id}`}
                                                slotProps={{
                                                    input: {
                                                        className:
                                                            "pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black",
                                                    },
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="w-7 h-7 p-1 self-center mt-4"
                                            onClick={removeproductOption(option.id)}>
                                            <RxCross2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className=' flex justify-end items-end w-full h-[10%]'>
                        <button className='rounded-xl h-[80%] w-[200px] bg-customBlack text-white'>SAVE</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SupplierDetail
