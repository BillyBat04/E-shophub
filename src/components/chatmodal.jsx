import React, { useState, useRef, useEffect } from 'react';

function ChatModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');  // State để lưu tin nhắn hiện tại
  const [messages, setMessages] = useState([]);  // State để lưu tất cả tin nhắn đã gửi
  const messagesEndRef = useRef(null); // Refs để cuộn đến tin nhắn cuối cùng

  // Hàm mở modal
  const openModal = () => setIsModalOpen(true);

  // Hàm đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (message.trim()) {
      // Thêm tin nhắn của người dùng vào mảng messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'user' },  // Tin nhắn người dùng
        { text: 'Bot: Cảm ơn bạn đã gửi tin nhắn!', sender: 'bot' } // Tin nhắn bot
      ]);
      
      setMessage('');  // Làm sạch input sau khi gửi
    }
  };

  // Sử dụng useEffect để tự động cuộn xuống tin nhắn cuối cùng khi messages thay đổi
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Mỗi khi messages thay đổi, cuộn xuống

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans relative z-[999]">
      {/* Button fixed ở góc dưới bên phải */}
      <button
        onClick={openModal}
        className="px-4 py-2 text-lg text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none fixed bottom-4 right-4"
      >
        Mở Chat
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Chat Message</h2>
            <div className="h-64 overflow-y-auto border border-gray-300 p-4 mb-4 bg-gray-50 rounded-lg">
              {/* Hiển thị các tin nhắn */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 mb-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {/* Phần tử này giúp cuộn đến tin nhắn cuối */}
              <div ref={messagesEndRef} />
            </div>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
            />
            <button
              onClick={sendMessage}
              className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatModal;
