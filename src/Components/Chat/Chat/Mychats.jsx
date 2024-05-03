import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { ChatContext } from "@/Context/ChatProvider"; // Adjust the import path as necessary
import Avatar from "@material-ui/core/Avatar";
import GroupChatModal from './CreateGroupChatModal';

function MyChats() {
    const { authData, chats, setChats,setSelectedChat } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchChats = async () => {
            if (!authData.user?._id || !authData.accessToken) {
                console.log("User not logged in or accessToken missing");
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${authData.accessToken}`,
                    },
                };
                const { data } = await axios.get('https://colabhub.onrender.com/chat/fetchchat', config);
                setChats(data); // Update chats in context
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };

        fetchChats();
    }, [authData, setChats]);

    const handleCreateGroupChat = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };

    return (
        <div className="flex flex-col max-w-md mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-800 text-white text-lg font-semibold flex justify-between items-center">
                <span>My Chats</span>
                <button onClick={handleCreateGroupChat} className="bg-orange-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full border border-blue-500 shadow-md transition duration-300 ease-in-out">
                    Create Group Chat
                </button>
            </div>
            
            <div className="flex-grow overflow-auto">
                {chats.length > 0 ? chats.map((chat) => (
                    <div key={chat._id} className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"  onClick={() => setSelectedChat(chat)} >
                        <div className="flex-shrink-0 h-10 w-10">
                            <Avatar />
                        </div>
                        <div className="flex-grow ml-3">
                            <h3 className="text-sm font-semibold">{chat.isGroupChat ? chat.chatName : getChatName(chat.users, authData.user)}</h3>
                            {chat.latestMessage && (
                                <p className="text-sm text-gray-600">
                                    <strong>{chat.latestMessage.sender.name}: </strong>
                                    {chat.latestMessage.content.length > 50 ? `${chat.latestMessage.content.substring(0, 50)}...` : chat.latestMessage.content}
                                </p>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-8 text-gray-400">No chats found</div>
                )}
            </div>

            {/* Modal for creating group chat */}
        {showModal && <GroupChatModal isOpen={showModal} onClose={() => setShowModal(false)} />}

        </div>
    );
}

function getChatName(users, currentUser) {
    const otherUser = users.find(user => user._id !== currentUser._id);
    return otherUser ? otherUser.nom : "Unknown User";
}

export default MyChats;
