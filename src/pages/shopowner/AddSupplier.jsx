
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../config/api';
const AddSupplier = () => {
    const { supplierId } = useParams();

    const navigate = useNavigate()
    const [supplierName, setSupplierName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [contactPerson, setContactPerson] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const data = {
            supplierName,
            email,
            address,
            phoneNumber,
            contactPerson
        }

        await axiosInstance.post('/supplier', data)
        navigate('/admin/supplier')
        window.location.reload()
    }

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
            <div className='w-2/3 mx-auto mt-4 h-full'>
                <div className='grid grid-rows-6 gap-4'>
                    <form onSubmit={e => handleSubmit(e)} className='p-5 row-span-4 w-full h-full bg-white rounded-lg customShadow'>
                        <h3 className="text-base mb-3 font-semibold">General Information</h3>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Supplier Name</h5>
                            <input value={supplierName} onChange={e => setSupplierName(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Email</h5>
                            <input value={email} onChange={e => setEmail(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Address</h5>
                            <input value={address} onChange={e => setAddress(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Phone number</h5>
                            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pb-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Contact Person</h5>
                            <input value={contactPerson} onChange={e => setContactPerson(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <button className='bg-black p-2 w-full rounded-md text-white opacity-50 hover:opacity-100 duration-150' type='submit'>SUBMIT</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddSupplier
