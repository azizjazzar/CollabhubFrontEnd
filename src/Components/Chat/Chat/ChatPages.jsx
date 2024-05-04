import React, { useState, useContext } from 'react';
import { IoMdSend } from 'react-icons/io';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import { formatRelative } from 'date-fns'; // For formatting message timestamps
import ChatBox from './ChatBox';
import { ChatState } from '@/Context/ChatProvider';

// Custom hook for managing theme


const ChatPages = () => {
    const { authData } = ChatState();
    const user = authData?.user;

  return user ? (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className="flex items-center justify-between p-4 md:p-6 bg-gray-800 text-white">
                {user && <SideDrawer />}
                {/* Additional header content can be placed here */}
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block md:w-1/3 lg:w-1/4 bg-gray-200 overflow-y-auto">
                    {user && <MyChats />}
                </aside>

                <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-grow overflow-auto">
                        {user && <ChatBox />}
                    </div>
                </main>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl">Please log in to view this page.</p>
        </div>
    );
};

export default ChatPages;