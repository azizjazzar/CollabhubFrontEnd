import React from 'react';
import { IoMdSend, IoIosNotificationsOutline, IoIosSettings } from 'react-icons/io';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import { ChatState } from '@/Context/ChatProvider';

const ChatPages = () => {
    const { authData } = ChatState();
    const user = authData?.user;

    return user ? (
        <div className="flex flex-col h-screen bg-gray-100 p-2 mt-20">
            <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                <div className="flex items-center">
                
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-300">
                        <IoIosNotificationsOutline className="text-xl text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-300">
                        <IoIosSettings className="text-xl text-gray-600" />
                    </button>
                    <div className="relative">
                        <button className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full hover:bg-gray-300 focus:outline-none">
                            
                            <span className="hidden md:block text-sm text-gray-700">{user.nom}</span>
                        </button>
                        {/* Dropdown menu logic here */}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:flex md:flex-col md:w-1/3 lg:w-1/4 bg-white border-r">
                    <div className="px-3 py-2">
                        <h2 className="text-lg font-semibold text-gray-800">My Chats</h2>
                    </div>
                    <div className="overflow-y-auto">
                        <MyChats />
                    </div>
                </aside>

                <main className="flex-1 flex flex-col">
                    <ChatBox />
                </main>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl text-gray-800">Please log in to view this page.</p>
        </div>
    );
};

export default ChatPages;
