import React, { useState } from 'react';

const Chat = ({ items, isActive }) => {
  return (
    <div className={`h-[60px] flex items-center p-2 rounded-full w-full ${isActive ? 'bg-blue-100 shadow-lg' : ''}`}>
      <img src={items.avatar} className='h-12 w-12 rounded-full' alt={`${items.name}'s avatar`} />
      <div className='pl-2 flex w-[80%] flex-col items-start justify-between h-12'>
        <span className='font-roboto text-sm font-semibold'>{items.name}</span>
        <div className=' flex flex-row justify-between w-[100%]'>
          <span className='font-roboto text-sm truncate max-w-[170px]'>{items.chat}</span>
          <span className='font-roboto text-sm ml-2'>{items.time}</span>
        </div>
      </div>
    </div>
  );
};

const Chatbox = ({ onChatSelect, items }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const handleChatSelect = (item, index) => {
    setActiveIndex(index); 
    onChatSelect(item); 
  };

  return (
    <div className="flex flex-col gap-2 mt-[5%]">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleChatSelect(item, index)}
          className="w-full"
        >
          <Chat items={item} isActive={index === activeIndex} />
        </button>
      ))}
    </div>
  );
};

export default Chatbox;
