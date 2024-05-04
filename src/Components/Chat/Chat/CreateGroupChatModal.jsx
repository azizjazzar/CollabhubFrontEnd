import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import { ChatState } from "@/Context/ChatProvider";

const GroupChatModal = ({ isOpen, onClose }) => {
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authData, chats, setChats } = ChatState();

  useEffect(() => {
    // Cleanup search results when the modal is closed or opened
    if (!isOpen) {
      setSearch("");
      setSearchResult([]);
      setSelectedUsers([]);
      setGroupChatName("");
    }
  }, [isOpen]);



  const handleGroup = (userToAdd) => {
    if (!selectedUsers.find(user => user._id === userToAdd._id)) {
      setSelectedUsers([...selectedUsers, userToAdd]);
    } else {
      console.log("User already added");
    }
  };

  const debouncedSearch = debounce(async (query) => {
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
      };
      const { data } = await axios.get(`https://colabhub.onrender.com/chat/searchUser?search=${query}`, config);
      setSearchResult(data);
    } catch (error) {
      console.error("Error Occurred!", error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName.trim() || selectedUsers.length === 0) {
      console.log("Please fill all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.accessToken}`,
        },
      };
      const payload = {
        name: groupChatName,
        users: selectedUsers.map(u => u._id),
      };
      const { data } = await axios.post('https://colabhub.onrender.com/chat/addgroup', JSON.stringify(payload), config);
      setChats(chats => [data, ...chats]);
      onClose();
      console.log("New Group Chat Created!");
    } catch (error) {
      console.error("Failed to Create the Chat!", error.response?.data || error);
    }
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)}>Create Group Chat</span>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                {/* Placeholder for modal header icon */}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create Group Chat</h3>
              <span className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>X</span>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  placeholder="Chat Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"                 
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Add Users eg: John, Piyush, Jane"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"                  value={search}
                  onChange={handleSearch}
                />
                <div className="w-full flex flex-wrap">
                  {selectedUsers.map(u => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </div>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  searchResult.slice(0, 4).map(user => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
                )}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleSubmit}
                >
                  Create Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
