import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddEmployee = () => {
    const [startDate, setStartDate] = useState("");
    const [startIncreaseDate, setStartIncreaseDate] = useState("");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    const handleStartIncreaseDateChange = (event) => {
        setStartIncreaseDate(event.target.value);
    };

    const today = new Date().toISOString().split("T")[0];
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setSelectedAvatar(imageURL);
        }
    };
    return (
        <div className=' w-full h-full '>
             <div className="text-base grid mb-3 lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
                <Link className='flex items-center' to="..">
                    <button className="w-[100px] mr-auto text-gray-600 text-lg">&#8592; List</button>
                </Link>
                <p className="text-base font-semibold justify-self-center">
                    ADD EMPLOYEE
                </p>
            </div>
            <div className='h-full gap-3 grid grid-cols-2 w-full '>
                <div className='grid grid-rows-7 gap-3'>
                    <div className='row-span-3 p-5 bg-white rounded-lg'>
                        <h3 className="text-base mb-3 font-semibold">Avatar</h3>
                        <div className="flex flex-col items-center">
                            <div className="h-32 w-32 mb-4 rounded-full overflow-hidden border-2 border-gray-300">
                                {selectedAvatar ? (
                                    <img
                                        src={selectedAvatar}
                                        alt="Selected Avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center">

                                    </div>
                                )}
                            </div>
                            <label className="text-xs cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-lg">
                                Select Avatar
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='bg-white row-span-4 p-5 rounded-lg'>
                        <h3 className="text-base mb-3 font-semibold">Salary Information</h3>
                        <div className='pt-1'>
                            <h5 className='font-normal text-slate-400 mb-2'>Current Salary</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Increase</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Start Increase</h5>
                            <input
                                type="date"
                                value={startIncreaseDate}
                                min={today}
                                onChange={handleStartIncreaseDateChange}
                                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className=' h-[80%] bg-white rounded-lg p-5'>
                        <h3 className="text-base mb-3 font-semibold">Information</h3>
                        <div className='pt-1'>
                            <h5 className='font-normal text-slate-400 mb-2'>Name</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Position</h5>
                            <select className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black">
                                <option value="">Select Position</option>
                                <option value="sales">Sales</option>
                                <option value="shipping-man">Shipping Man</option>
                            </select>
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Employee ID</h5>
                            <input className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Start working Day</h5>
                            <input
                                type="date"
                                value={startDate}
                                min={today} // Restrict to today's date or later
                                onChange={handleStartDateChange}
                                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
                            />
                        </div>
                    </div >
                    <div className='pt-5 row-span-1 flex justify-end items-center'>
                        <button className='w-36 h-12 rounded-xl bg-customBlack text-white'>Save</button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AddEmployee
