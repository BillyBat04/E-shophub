import React, { useState, useEffect } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
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

      <div className='w-full p-6 flex h-full bg-white shadow-md rounded-[20px]'>
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
  );
};

export default Chat;
