import React, { useState } from 'react';

const ChatApplication = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const users = [{ name: "Alice", unread: 3 }, { name: "Bob", unread: 0 }, { name: "Charlie", unread: 1 }]; // Example users with unread messages count

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage.trim(), sent: messages.length % 2 === 0 }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen p-10">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow overflow-hidden p-6">
        <div className="p-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mb-4">
            Create Group Chat
          </button>
          <div className="bg-gray-100 p-4 rounded-full ">
            <input className="bg-transparent w-full focus:outline-none" placeholder="Search users..." />
          </div>
        </div>
        <ul className="overflow-y-auto p-6">
          {users.map((user, index) => (
            <li key={index} className={`p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${user.unread ? 'font-bold' : ''}`}>
              {user.name}
              {user.unread ? <span className="text-xs bg-red-500 text-white rounded-full px-2">{user.unread}</span> : null}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col p-6">
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat with Alice</h2>
          <div>
            <button className="text-blue-500">Details</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`break-words max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${message.sent ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-100'} p-3 rounded-lg shadow`}>
              <p className="text-sm">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-full flex-1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="ml-4 text-blue-500 hover:text-blue-700">
            <i className="fas fa-paper-plane"></i> {/* This assumes you're using Font Awesome for icons */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApplication;
