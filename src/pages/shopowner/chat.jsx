import React, { useState, useEffect } from 'react';
import Nav from '../../components/shopowner/nav/nav';
import { FaMagnifyingGlass } from "react-icons/fa6";
import Header from '../../components/shopowner/header';
import Chatbox from '../../components/shopowner/chatbox';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const items = [
    {
      name: "Le Bao Minh",
      time: "21:21",
      avatar: "src/assets/violet.jpg",
      chat: "Hi, can I buy a smartphone",
    },
    {
      name: "Le Bao Min",
      time: "21:21",
      avatar: "src/assets/violet.jpg",
      chat: "Hi, can I buy a",
    },
    {
      name: "Le Bao Minh",
      time: "21:21",
      avatar: "src/assets/violet.jpg",
      chat: "Hi, can I buy a smartphone",
    },
    {
      name: "Le Bao Min",
      time: "21:21",
      avatar: "src/assets/violet.jpg",
      chat: "Hi, can I buy a",
    },
  ];

  const item = [
    { label: 'Chat', icon: "src/assets/chat.svg", active: true, link: "/chat" },
    { label: 'Order', icon: "src/assets/order.svg", link: "/orders" },
    { label: 'Product', icon: "src/assets/product.svg", link: "/products" },
    { label: 'Employee', icon: "src/assets/employee.svg", link: "/employees" },
    { label: 'Report', icon: "src/assets/report.svg", link: "/reports" },
  ];

  const [isSearchFocused, setSearchFocused] = useState(false);
  const handleChange = (e) => setInputValue(e.target.value);
  const handleChange1 = (e) => setInputValue1(e.target.value);

  useEffect(() => {
    setActiveChat(items[0]);
  }, []);

  const handleSendMessage = () => {
    if (inputValue1.trim() !== '') {
      const currentTimestamp = new Date().toLocaleTimeString();
      const newMessage = {
        text: inputValue1,
        sentByCurrentUser: true, 
        timestamp: currentTimestamp, 
      };
      setMessages([...messages, newMessage]);
      setInputValue1(''); 
    }
  };

  return (
    <div className="pb-5 pr-5 pl-5 pt-2 w-full h-full bg-customGray3 flex flex-col justify-center items-center">
      <div className='w-[60%] h-[8%]  flex justify-center'>
        <Header />
      </div>
      <div className='w-full h-[90%] flex'>
        <div className='w-1/5 h-full p-3 bg-white shadow-md rounded-[20px] text-sm justify-between flex flex-col'>
          <Nav items={item} />
          <button className='pb-3 flex justify-end items-center mr-5'>
            <span className='text-md'>Log out</span>
            <img src='src/assets/logout.png' className='ml-3 w-6 h-6' />
          </button>
        </div>
        <div className='w-4/5 flex h-full ml-5 bg-white shadow-md rounded-[20px]'>
          <div className='w-[30%] pl-5 pr-5 h-full border-r'>
            <div className='h-[10%] flex items-center'>
              <label className='pl-2 mt-3 font-semibold text-xl'>CHAT</label>
            </div>
            <div className='h-[90%] flex-col'>
              <div
                className={` h-[40px] w-full bg-white rounded-full border border-black flex flex-row items-center transition-all duration-300 ${isSearchFocused ? 'w-[60%]' : 'w-[40%]'}`}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className=" ml-3 h-[90%] w-[85%] text-sm  focus:outline-none"
                  placeholder="Search"
                />
                <button className=" ">
                  <FaMagnifyingGlass />
                </button>
              </div>
              <Chatbox onChatSelect={setActiveChat} items={items} />
            </div>
          </div>
          <div className='w-[70%] h-full  flex flex-col'>
            <div className='h-[10%] w-full border-b flex flex-row items-center p-5'>
              {activeChat && (
                <>
                  <img src={activeChat.avatar} alt="Avatar" className='h-12 w-12 rounded-full mr-4' />
                  <span className='font-roboto text-xl font-medium'>{activeChat.name}</span>
                </>
              )}
            </div>
            <div className='h-[80%] w-full overflow-y-auto'>
              <div className="messages-container w-full">
                {messages.map((message, index) => (
                  <div className='flex items-center w-full'>
                    <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
                    <div
                      key={index}
                      className={`message ${message.sentByCurrentUser ? 'bg-black text-white self-end' : 'bg-white text-black self-start'} p-3 rounded-[20px] m-2 max-w-[60%]`}
                    >
                      {message.text}
                    </div>

                  </div>
                ))}
              </div>
            </div>
            <div className='h-[10%] w-full pl-5 pr-5 items-center justify-center flex flex-row'>
              <button>
                <img src='src/assets/file.svg' className='h-8 w-8' />
              </button>
              <input
                type="text"
                value={inputValue1}
                onChange={handleChange1}
                className=" ml-5 pl-5 mr-5 h-[70%] customShadow rounded-full w-[80%] text-sm  focus:outline-none"
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>
                <img src='src/assets/send.svg' className='h-10 w-10 customShadow rounded-full' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
