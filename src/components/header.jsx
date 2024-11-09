import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useCart } from './cartcontext';

const Header = () => {
    const { cartItemCount } = useCart();
    const [inputValue, setInputValue] = useState('');
    const [isChatboxVisible, setChatboxVisible] = useState(false);
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [view, setView] = useState("login");
    const [isSearchFocused, setSearchFocused] = useState(false);

    const handleChange = (e) => setInputValue(e.target.value);
    const toggleChatbox = () => setChatboxVisible(!isChatboxVisible);
    const toggleLogin = () => {
        setLoginVisible(!isLoginVisible);
        setView("login");
    };

    return (
        <div className='w-full bg-customBlack h-[50px] flex justify-between items-center'>
            <div className='ml-5 flex flex-row w-[50%] h-full items-center'>
                <Link to='mainpage'>
                    <label className="text-white font-roboto text-[20px]">E-ShopHub</label>
                </Link>
                {/* Search Bar */}
                <div
                    className={`ml-5 h-[70%] bg-white rounded-full flex flex-row items-center transition-all duration-300 ${isSearchFocused ? 'w-[60%]' : 'w-[40%]'}`}
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="border ml-4 h-full w-full text-sm border-gray-50 focus:outline-none"
                        placeholder="Search"
                    />
                    <button className="mr-3">
                        <FaMagnifyingGlass />
                    </button>
                </div>
            </div>

            {/* Other elements like Login, Shopping Cart, Chatbox, etc. */}
            <div className='mr-5 flex items-center'>
                <button onClick={toggleLogin}>
                    <img src="src/assets/user.png" className="h-[20px] w-[20px]" />
                </button>
                <div className="relative ml-5">
                    <Link to='shoppingcart'>
                        <img src="src/assets/trolley.png" className="h-[25px] w-[25px]" alt="Shopping Cart Icon" />
                    </Link>
                    <span className="absolute top-0 left-4 inline-flex items-center justify-center h-3 w-3 text-[8px] font-bold text-black bg-white border-[0.5px] rounded-full">
                        {cartItemCount}
                    </span>
                </div>
                <button onClick={toggleChatbox}>
                    <img src="src/assets/chat.png" className="ml-5 h-[20px] w-[20px]" />
                </button>
            </div>

            {/* Chatbox Popup */}
            {isChatboxVisible && (
                <div className="z-30 fixed bottom-2 right-5 w-[300px] h-[250px] bg-white border border-gray-300 rounded-3xl shadow-lg flex flex-col justify-center items-center">
                    <div className='h-[90%] w-[90%]'>
                        <div className='h-[80%] w-full'>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-black rounded-full mr-2"></div>
                                <span className="text-black">Hi, What can I help you?</span>
                            </div>
                            <div className="mb-4">
                                <p>I need a smartphone suitable for my heavy gaming.</p>
                            </div>
                        </div>
                        <div className="h-[20%] w-full flex items-center justify-center">
                            <div className='h-10 w-52 flex items-center rounded-full border-[0.5px] border-black'>
                                <input
                                    type="text"
                                    placeholder="Type a message"
                                    className="ml-3 w-40"
                                />
                            </div>
                            <button className="ml-3 h-10 w-10 rounded-full bg-black text-white">
                                ↑
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Login/Signup Modal */}
            {isLoginVisible && (
                <>
                    {/* Blur Background */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={toggleLogin}></div>

                    {/* Popup for Login/Sign-Up/Forgot Password */}
                    <div className="lg:w-[40%] max-w-[600px] justify-center z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] p-6 bg-white border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center">
                        <div className='h-auto  w-[100%] flex flex-col items-center'>
                            <div className='w-[80%] mb-10 flex flex-col justify-start'>
                                <h2 className="text-lg font-thin">E-ShopHub</h2>
                                <div className='flex justify-between w-full items-end'>
                                    <h1 className='text-4xl font-bold'>
                                        {view === "signup" ? 'Sign Up' : view === "forgot" ? 'Forgot Password' : 'Login'}
                                    </h1>
                                    {view === "login" && (
                                        <button
                                            className='mb-[2px] font-bold text-sm'
                                            onClick={() => setView("signup")}
                                        >
                                            I don't have an account.
                                        </button>
                                    )}
                                    {view === "signup" && (
                                        <button
                                            className='mb-[2px] font-bold text-sm'
                                            onClick={() => setView("login")}
                                        >
                                            I already have an account.
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Login Form */}
                            {view === "login" && (
                                <>
                                    <div className='mb-2 w-[80%] font-medium flex flex-col justify-start'>
                                        Email
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="w-[80%] mb-3 p-2 border-[0.5px] border-black rounded-lg"
                                    />
                                    <div className='mb-2 w-[80%] font-medium flex flex-col justify-start'>
                                        Password
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-[80%] mb-3 p-2 border-[0.5px] border-black rounded-lg"
                                    />
                                    <div className='flex flex-col justify-end items-end w-[80%]'>
                                        <button
                                            className='font-light text-sm'
                                            onClick={() => setView("forgot")}
                                        >
                                            Forgot your password?
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Sign-Up Form */}
                            {view === "signup" && (
                                <>
                                    <div className='mb-5 h-10 w-[80%] items-center font-medium flex flex-row justify-between'>
                                        Username
                                        <input
                                            type="text"
                                            className="w-[65%] h-full border-[0.5px] border-black rounded-lg"
                                        />
                                    </div>
                                    <div className='mb-5 h-10 w-[80%] items-center font-medium flex flex-row justify-between'>
                                        Email
                                        <input
                                            type="text"
                                            className="w-[65%] h-full border-[0.5px] border-black rounded-lg"
                                        />
                                    </div>
                                    <div className='mb-5 h-10 w-[80%] items-center font-medium flex flex-row justify-between'>
                                        Password
                                        <input
                                            type="password"
                                            className="w-[65%] h-full border-[0.5px] border-black rounded-lg"
                                        />
                                    </div>
                                    <div className='mb-5 h-10 w-[80%] items-center font-medium flex flex-row justify-between'>
                                        Confirm password
                                        <input
                                            type="password"
                                            className="w-[65%] h-full border-[0.5px] border-black rounded-lg"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Forgot Password Form */}
                            {view === "forgot" && (
                                <>
                                    <div className=' w-[90%] items-center flex flex-col'>
                                        <span>Type your mail and we’ll send you your new password</span>
                                        <div className='mt-5 flex w-[80%] flex-row items-center justify-between'>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                className="w-[80%] p-2 h-[50px] border-[0.5px] border-black rounded-lg"
                                            />
                                            <button className="ml-2 w-[50px] flex justify-center items-center h-[50px] bg-black text-white rounded-full">
                                                <GrNext className='w-[15px] h-[15px]' />
                                            </button>

                                        </div>
                                    </div>
                                </>
                            )}

                            {view !== "forgot" && (
                                <div className='w-[80%] flex justify-end mt-5'>
                                    <button className="w-[50px] flex justify-center items-center h-[50px] bg-black text-white rounded-full">
                                        <GrNext />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};



export default Header;