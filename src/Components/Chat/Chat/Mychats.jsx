import React, { useContext, useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import GroupChatModal from './CreateGroupChatModal';
import { ChatContext } from '@/Context/ChatProvider';
import { IoSearch, IoEllipsisVertical } from 'react-icons/io5';

function MyChats() {
    const { authData, chats, setChats, setSelectedChat } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authData.user?._id || !authData.accessToken) {
            console.error("User not logged in or accessToken missing");
            return;
        }
        setLoading(true);
        const fetchChats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${authData.accessToken}` },
                };
                const { data } = await axios.get('https://colabhub.onrender.com/chat/fetchchat', config);
                setChats(data);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [authData, setChats]);

    const filteredChats = useMemo(() => chats.filter(chat =>
        chat.chatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.users.some(user => user.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm, chats]);

    const handleCreateGroupChat = () => setShowModal(true);

    return (
        <div className="flex flex-col max-w-md mx-auto my-4 bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold flex justify-between items-center">
                <span>My Chats</span>
                <div>
                    <button onClick={handleCreateGroupChat} className="mr-2 bg-white text-orange-300 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                        + New Group
                    </button>
                   
                </div>
            </div>
            <div className="p-4 flex items-center bg-white">
                <IoSearch className="text-gray-500 mr-2"/>
                <input
                    type="text"
                    placeholder="Search chats..."
                    className="flex-grow form-input pl-2 pr-4 py-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex-grow overflow-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-full">Loading...</div>
                ) : chats.filter(chat => chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())).map(chat => (
                    <div key={chat._id} className="flex items-center p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 cursor-pointer" onClick={() => setSelectedChat(chat)}>
                        <Avatar src={chat.users[0].avatar || '/default-avatar.png'} className="h-10 w-10" />
                        <div className="flex-grow ml-3">
                            <h3 className="text-sm font-medium">{chat.isGroupChat ? chat.chatName : chat.users.filter(user => user._id !== authData.user._id).map(user => user.nom).join(', ')}</h3>
                            <p className="text-sm text-gray-600">{chat.latestMessage ? `${chat.latestMessage.sender.nom}: ${chat.latestMessage.content}` : "No messages yet"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <GroupChatModal isOpen={showModal} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default MyChats;
