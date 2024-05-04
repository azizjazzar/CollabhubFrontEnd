import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from "axios";
import { ChatContext } from "@/Context/ChatProvider"; // Adjust the import path as necessary
import Avatar from "@material-ui/core/Avatar";
import GroupChatModal from './CreateGroupChatModal';
import { useSpring, animated } from 'react-spring'; // For animation
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

function MyChats() {
    const { authData, chats, setChats,setSelectedChat } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useMemo(() => {
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

    const chatNames = useMemo(() => chats.map(chat => ({
        ...chat,
        displayName: getChatName(chat.users, authData.user)
    })), [chats, authData.user]);

    const handleCreateGroupChat = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };

     const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
        <animated.div style={fade} className="flex flex-col max-w-md mx-auto my-4 bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold flex justify-between items-center">
                <span>My Chats</span>
                <IconButton onClick={() => setShowModal(true)} className="text-white">
                    <AddIcon />
                </IconButton>
            </div>
           <div className="flex-grow overflow-auto">
                {chatNames.length > 0 ? chatNames.map(chat => (
                    <div key={chat._id} className="flex items-center p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 cursor-pointer" onClick={() => setSelectedChat(chat)}>
                        <div className="flex-shrink-0 h-10 w-10">
                            <Avatar src={chat.users[0].avatar || '/path/to/default/avatar.png'} alt={`Avatar for ${chat.displayName}`} />
                        </div>
                        <div className="flex-grow ml-3">
                            <h3 className="text-sm font-medium">{chat.isGroupChat ? chat.chatName : chat.displayName}</h3>
                            {chat.latestMessage && (
                                <p className="text-sm text-gray-600">
                                    <strong>{chat.latestMessage.sender.name}: </strong>
                                    {chat.latestMessage.content.length > 50 ? `${chat.latestMessage.content.substring(0, 50)}...` : chat.latestMessage.content}
                                </p>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-8 text-gray-500">No chats found</div>
                )}
            </div>
            {showModal && <GroupChatModal isOpen={showModal} onClose={() => setShowModal(false)} />}
        </animated.div>
    );
}

function getChatName(users, currentUser) {
    // Filter out the current user from the list of users in the chat
    const otherUsers = users.filter(user => user._id !== currentUser._id);

    // Join names or return default text if no other users
    return otherUsers.map(user => user.nom).join(', ') || "Unknown User";
}

export default MyChats;