import React, { useState } from 'react';
import { FaUser, FaPlus, FaSearch, FaMoon, FaSun, FaTrash, FaRegSmile } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import { formatRelative } from 'date-fns'; // For formatting message timestamps
import ChatBox from './ChatBox';
import { ChatState } from '@/Context/ChatProvider';

const ChatPages = () => {
  const { authData } = ChatState();
  const user = authData?.user;
  const [theme, setTheme] = useState('light'); // Manage theme state
  const [message, setMessage] = useState(''); // Mock message input state

  // Dummy messages for demonstration
  const dummyMessages = [
    { id: 1, text: 'Hello there!', sender: 'user', timestamp: new Date() },
    { id: 2, text: 'Hi! How can I help you today?', sender: 'other', timestamp: new Date() },
  ];

  // Toggle theme between light and dark
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');



  return (
    <div className={`flex flex-col h-screen overflow-hidden mt-10 ${theme}`}>
      <header className="flex items-center justify-between p-4 md:p-6 bg-gray-800 text-white mt-10">
        {user && <SideDrawer />}
        <div className="flex items-center space-x-4">
          <FaSearch className="cursor-pointer hover:text-gray-300" />
          <button onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon className="cursor-pointer hover:text-gray-300" /> : <FaSun className="cursor-pointer hover:text-gray-300" />}
          </button>
          <FaTrash className="cursor-pointer hover:text-gray-300" />
          <FaUser className="cursor-pointer hover:text-gray-300" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-gray-200 overflow-auto">
          {user && <MyChats />}
        </aside>

        <main className="flex-1 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            {user && <ChatBox/>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPages;
