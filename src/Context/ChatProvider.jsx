import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
const [selectedChat, setSelectedChat] = useState(null);
  
  const [authData, setAuthData] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
  });
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData && storedAuthData.accessToken) {
      setAuthData(storedAuthData);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const updateAuthData = (newAuthData) => {
    setAuthData(newAuthData);
    localStorage.setItem("authData", JSON.stringify(newAuthData));
  };

  const selectChat = chat => {
  setSelectedChat(chat);
};


  const addOrUpdateChat = (newChat) => {
    // Check if the chat already exists based on some unique identifier
    const existingChatIndex = chats.findIndex(chat => chat._id === newChat._id);
    if (existingChatIndex !== -1) {
      // If the chat exists, you might want to update it or simply reselect it
      // For this example, let's reselect it and optionally update it
      setSelectedChat(chats[existingChatIndex]);
      // Optionally notify the user that the chat already exists or update the chat info
    } else {
      // If the chat doesn't exist, add it to the chats array
      setChats(prevChats => [newChat, ...prevChats]);
      setSelectedChat(newChat); // Automatically select the newly added chat
    }
  };

  return (
    <ChatContext.Provider value={{
  selectedChat,
  setSelectedChat,
  authData,
  setAuthData,
  notification,
  setNotification,
  chats,
  setChats,
  addOrUpdateChat,
}}>
  {children}
</ChatContext.Provider>

  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
