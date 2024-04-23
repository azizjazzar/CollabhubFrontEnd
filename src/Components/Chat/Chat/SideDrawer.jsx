import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ChatContext } from "@/Context/ChatProvider";
import { ChevronLeftIcon as XIcon } from "@heroicons/react/24/outline";
import useDisclosure from "./useDisclosure"; // Ensure this is correctly imported
import Avatar from "@material-ui/core/Avatar";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

function SideDrawer() {
const { authData, setSelectedChat, addOrUpdateChat, chats } = useContext(ChatContext);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const debounceFn = setTimeout(() => {
            if (search.trim()) {
                searchUsers();
            }
        }, 300);
        return () => clearTimeout(debounceFn);
    }, [search]);

    const searchUsers = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authData.accessToken}`,
                },
            };
            const { data } = await axios.get(`http://localhost:3000/chat/searchUser?search=${search}`, config);
            setSearchResult(data);
        } catch (error) {
            console.error("Error during search:", error);
            toast.error("Failed to search users."); // Using react-toastify for error notification
        } finally {
            setLoading(false);
        }
    };

    const accessChat = async (userId) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authData.accessToken}`,
                },
            };
            const { data } = await axios.post(`http://localhost:3000/chat/acceschat`, { userId }, config);

            // Use the addOrUpdateChat method from context to handle adding or updating the chat
            addOrUpdateChat(data);
            setSelectedChat(data); // Automatically select the newly added/updated chat
            onClose(); // Close the SideDrawer
        } catch (error) {
            console.error("Error accessing chat:", error);
            toast.error("Failed to access chat."); // Notify user of failure to access chat
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); onOpen(); }} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9H7a1 1 0 000 2h6a1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Search for Users
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}>
                    <div className="fixed inset-0 overflow-hidden z-50" onClick={(e) => e.stopPropagation()}>
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                                <div className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl transition-transform transform duration-500 ease-in-out">
                                        <div className="px-4 py-6 sm:px-6 mt-10">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-gray-900">Search Users</h2>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button onClick={onClose} className="rounded-md text-gray-400 hover:text-gray-500">
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative flex-1 px-4 sm:px-6">
                                            <div className="px-4 py-2">
                                                <div className="flex items-center rounded-md bg-gray-100 p-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={search}
                                                        onChange={(e) => { e.stopPropagation(); setSearch(e.target.value); }}
                                                        className="search-input flex-1 rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:border-blue-500"
                                                    />
                                                    {search && (
                                                        <XIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setSearch('')} />
                                                    )}
                                                </div>
                                            </div>
                                            <TransitionGroup className="mt-10 space-y-1">
                                                {loading ? (
                                                    <div>Loading...</div>
                                                ) : (
                                                    searchResult.map((user) => (
                                                        <CSSTransition key={user._id} timeout={500} classNames="fade">
                                                            <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => accessChat(user._id)}>
                                                                <Avatar/>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">{user.nom}</p>
                                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                                </div>
                                                            </div>
                                                        </CSSTransition>
                                                    ))
                                                )}
                                            </TransitionGroup>
                                                                                </div>
                                    <div className="flex border-t border-gray-200 p-4 justify-end">
                                        <button onClick={onClose} className="ml-auto flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);
}

export default SideDrawer;

