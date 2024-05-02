import { useState } from "react";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import { ChatState } from "@/Context/ChatProvider";

// Assume UserBadgeItem and UserListItem are already adapted to use Tailwind CSS

const GroupChatModal = ({ isOpen, onClose, children }) => {
  
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authData, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
      };
      const { data } = await axios.get(`https://colabhub.onrender.com/chat/searchUser?search=${search}`, config);
      console.log("Search Results:", data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error("Error Occurred! Failed to Load the Search Results", error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
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
      users: JSON.stringify(selectedUsers.map((u) => u._id)), // Stringify the users array
    };

    const { data } = await axios.post(
      `http://localhost:3000/chat/addgroupe`, // Correct endpoint
      payload,
      config
    );
    setChats((prevChats) => [data, ...prevChats]);
    onClose();
    console.log("New Group Chat Created!");
  } catch (error) {
    console.error("Failed to Create the Chat!", error.response?.data || error);
  }
};



  return (
    <>
      <span onClick={() => setIsOpen(true)}>{children}</span>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                {/* Modal Header */}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create Group Chat</h3>
              <span className="top-0 right-0 cursor-pointer" onClick={() => setIsOpen(false)}>X</span>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  placeholder="Chat Name"
                  className="mb-3 input input-bordered w-full"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Add Users eg: John, Piyush, Jane"
                  className="mb-1 input input-bordered w-full"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="w-full flex flex-wrap">
                  {selectedUsers.map((u) => (
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
                  searchResult?.slice(0, 4).map((user) => (
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
