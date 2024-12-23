import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomerDetail = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState('');
    const [nation, setNation] = useState('');

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setSelectedAvatar(imageURL);
        }
    };

    const handleSave = () => {
        console.log({
            avatar: selectedAvatar,
            birthday,
            gender,
            nation
        });
        alert('Customer information saved!');
    };

    return (
        <div className='w-full h-full'>
            <div className="text-base grid mb-3 lg:grid-cols-[repeat(3,_1fr)] items-center h-16 bg-white shadow-md rounded-[20px]">
                <Link className='flex items-center' to="..">
                    <button className="w-[100px] mr-auto text-gray-600 text-lg">&#8592; List</button>
                </Link>
                <p className="text-base font-semibold justify-self-center">
                    CUSTOMER INFORMATION
                </p>
            </div>
            <div className='h-full gap-3 grid grid-cols-7 w-full'>
                <div className='col-span-3 h-[87%] p-5 bg-white rounded-lg'>
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
                                    No Avatar
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
                <div className='col-span-3'>
                    <div className='h-[87%] w-[100%] bg-white rounded-lg p-5'>
                        <h3 className="text-base mb-3 font-semibold">Information</h3>
                        <div className='pt-1'>
                            <h5 className='font-normal text-slate-400 mb-2'>Name</h5>
                            <input className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Username</h5>
                            <input className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Birthday</h5>
                            <DatePicker
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black"
                                placeholderText="Select date"
                                dateFormat="yyyy/MM/dd"
                            />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Gender</h5>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={gender === 'Male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Male
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={gender === 'Female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Female
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={gender === 'Other'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Other
                                </label>
                            </div>
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Nation</h5>
                            <select
                                value={nation}
                                onChange={(e) => setNation(e.target.value)}
                                className='pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black'
                            >
                                <option value="" disabled>Select Nation</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Japan">Japan</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className='h-[87%] flex justify-end items-end'>
                    <button
                        onClick={handleSave}
                        className='w-36 h-12 rounded-xl bg-customBlack text-white'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
