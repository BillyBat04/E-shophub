import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import generateRandomPassword from '../../helpers/generatePassword';
import axios from 'axios';
const AddEmployee = () => {
    const [startDate, setStartDate] = useState("");
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    const navigate = useNavigate()
    const today = new Date().toISOString().split("T")[0];
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [image, setImage] = useState(null)
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(file)
            setSelectedAvatar(imageURL);
        }
    };
    const handleGeneratePassword = () => {
        const randomPassword = generateRandomPassword()
        alert(randomPassword)
        setPassword(randomPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('fullName', fullName)
        data.append('email', email)
        data.append('password', password)
        data.append('phoneNumber', phoneNumber)
        data.append('role', role)
        data.append('beginDate', new Date(startDate))
        data.append('image', image)

        await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/employee',
            data,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        navigate('/admin/employees')
        window.location.reload()
    }
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
                <div className='grid grid-rows-8 gap-3'>
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
                                Chọn ảnh đại diện
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=' h-fit bg-white rounded-lg p-5'>
                        <h3 className="text-base mb-3 font-semibold">Thông tin nhân viên</h3>
                        <div className='pt-1'>
                            <h5 className='font-normal text-slate-400 mb-2'>Họ và tên</h5>
                            <input value={fullName} onChange={e => setFullName(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-1'>
                            <h5 className='font-normal text-slate-400 mb-2'>Email</h5>
                            <input value={email} onChange={e => setEmail(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-1'>
                            <h5 className='font-normal text-slate-400 mb-2'>Password</h5>
                            <input disabled value="********" className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                            <button onClick={() => handleGeneratePassword()} className='p-2 bg-black text-white mt-4 rounded-md opacity-50 duration-150 hover:opacity-100 font-bold'>Generate random password</button>
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Role</h5>
                            <select onChange={e => setRole(e.target.value)} className="pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black">
                                <option value="">Select role</option>
                                <option value="WHEMPLOYEE">Nhân viên kho</option>
                                <option value="DEEMPLOYEE">Nhân viên vận chuyển</option>
                            </select>
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Phone Number</h5>
                            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className=' pl-2 font-normal rounded-md bg-slate-50 border border-slate-500 w-full h-10 text-black' />
                        </div>
                        <div className='pt-3'>
                            <h5 className='font-normal text-slate-400 mb-2'>Ngày bắt đầu công việc</h5>
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
                        <button onClick={e => handleSubmit(e)} type='button' className='w-36 h-12 rounded-xl bg-customBlack text-white'>Hoàn tất</button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AddEmployee
