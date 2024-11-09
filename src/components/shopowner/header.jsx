import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex justify-between items-center h-[70%] rounded-full bg-black w-[40%]'>
            <Link to='mainpage'>
                <span className="pl-5 text-white font-roboto text-[17px]">E-ShopHub</span>
            </Link>
            <div className='pr-5 flex items-center'>
                <button >
                    <img src="src/assets/noti.svg" className="h-[20px] w-[20px]" />
                </button>
                <button >
                    <img src="src/assets/chat.png" className="ml-5 h-[20px] w-[20px]" />
                </button>
            </div>
        </div>
    )
}

export default Header
