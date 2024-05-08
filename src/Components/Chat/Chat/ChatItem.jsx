import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { ChatContext } from "@/Context/ChatProvider";
import Avatar from "@material-ui/core/Avatar";
import GroupChatModal from './CreateGroupChatModal';
import ChatItem from './ChatItem'; // New component for individual chat items

function MyChats() {
    const { authData, chats, setChats, setSelectedChat } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            if (!authData.user?._id || !authData.accessToken) {
                console.log("User not logged in or accessToken missing");
                return;
            }
            try {
                const config = {
                    headers: { Authorization: `Bearer ${authData.accessToken}` },
                };
                const { data } = await axios.get('https://api.example.com/chat/fetchchat', config);
                setChats(data);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };

        fetchChats();
    }, [authData, setChats]);

    const handleCreateGroupChat = useCallback(() => setShowModal(true), []);

    return (
        <div className="flex flex-col max-w-md mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 bg-blue-500 text-white text-lg font-semibold flex justify-between items-center">
                <span>My Chats</span>
                <button onClick={handleCreateGroupChat} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full border border-blue-500 shadow">
                    Create Group Chat
                </button>
            </div>
            <div className="flex-grow overflow-auto">
                {chats.length > 0 ? chats.map(chat => (
                    <ChatItem key={chat._id} chat={chat} setSelectedChat={setSelectedChat} authData={authData} />
                )) : (
                    <div className="text-center py-8 text-gray-400">No chats found</div>
                )}
            </div>
            {showModal && <GroupChatModal isOpen={showModal} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default React.memo(MyChats);
