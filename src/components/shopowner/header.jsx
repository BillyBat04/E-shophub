import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { Avatar } from '@mui/material'

const Header = () => {

    const {user} = useUser()
    return (
        <div className='flex justify-between items-center p-4 rounded-full bg-black w-[50%]'>
            {/* Logo */}
            <Link to='/'>
                <span className="pl-5 text-white font-roboto text-[17px]">E-ShopHub</span>
            </Link>

            {/* Avatar và Logout */}
            <div className='pr-5 flex items-center relative'>
                {/* Chuông thông báo */}


                {/* Avatar */}
                <Avatar alt="avatar" src={user?.image}>
                    {/* <AccountCircleIcon /> */}
                </Avatar>

                {/* Nút Logout */}
                <button 
                    onClick={() => {localStorage.removeItem('user'); window.location.href = '/'}}
                    className="ml-5 px-4 py-1 text-white bg-red-600 rounded-full hover:bg-red-500 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header
