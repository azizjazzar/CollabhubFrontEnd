import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Lottie from "react-lottie";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "@/Context/ChatProvider";

const ENDPOINT = "http://localhost:8000";
let socket;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { selectedChat, authData } = ChatState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.connect();
    socket.emit("setup", authData);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("sendMessage", (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    socket.on("receiveMessage", (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
     
    });

    return () => socket.disconnect();
  }, [authData]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
          },
        };
        setLoading(true);
        const { data } = await axios.get(`https://colabhub.onrender.com/message/${selectedChat._id}`, config);
        setMessages(data);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
        };
        const payload = { content: newMessage, chatId: selectedChat._id };
        const { data } = await axios.post("https://colabhub.onrender.com/message/sendmessage", payload, config);
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className={`flex flex-col ${selectedChat ? 'h-full' : 'items-center justify-center h-full'}`}>
      {selectedChat ? (
        <>
          <ProfileModal user={selectedChat.users[0]} />
          <ScrollableChat messages={messages} isLoading={loading} />
          <div className="p-3 w-full flex items-center">
            <input
              type="text"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-20"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={sendMessage}
            />
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-20">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-xl">Select a chat to start messaging</div>
      )}
    </div>
  );
};

export default SingleChat;