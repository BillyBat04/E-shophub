import { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from "react-router-dom";
import useUser from '../hooks/useUser';
import axiosInstance from '../config/api';
import { Avatar } from '@mui/material';

const Personal = () => {
    const location = useLocation();
    const [customer, setCustomer] = useState()
    const {user} = useUser()
    const item = [
        {
            name: "History",
            link: "history"
        },
        {
            name: "Information",
            link: "information"
        },
    ]
    
    useEffect(() => {
        const getUser = async () => {
            console.log(user.id)
            const response = await axiosInstance.get(`/customer/get-by-user/${user?.id}`)
            setCustomer(response.data)
        }
        getUser()
    }, [user])

    return (
        <div className='flex flex-col w-screen h-full'>
            <div className="flex p-8 bg-gray-100 min-h-screen">
                <div className="w-1/4 h-[81%] p-6 flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl">
                    <Avatar alt='avatar' src={user?.image} sx={{height: '100px', width: '100px'}}/>
                    <h2 className="text-2xl font-bold my-10">{customer?.fullName}</h2>
                    {item.map((tab) => (
                        <Link
                            to={tab.link}
                            key={tab.link} 
                            className={`w-full text-center py-4 mb-4 rounded-full ${location.pathname.includes(tab.link)
                                ? 'bg-black text-white' : 'text-black border border-black'
                                }`}
                        >
                            {tab.name}
                        </Link>
                    ))}
                    <button className="w-full py-2 text-black font-semibold">Log out</button>
                </div>
                <div className="flex items-center flex-col w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Personal;
