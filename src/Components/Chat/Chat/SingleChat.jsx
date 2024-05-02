import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import animationData from "./animation/typing.json";
import Lottie from "react-lottie";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "@/Context/ChatProvider";

const ENDPOINT = "http://localhost:5000";
let socket;
let selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, authData } = ChatState(); // Removed unnecessary variables
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    }
  };

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
      console.error("Error Occurred! Failed to Load the Messages", error);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`, // Added backticks
          },
        };
        const { data } = await axios.post(
          "https://colabhub.onrender.com/message/sendmessage",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.error("Error Occurred! Failed to Send the Message", error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", authData);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [authData]); // Added authData as a dependency

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
  socket.on("message received", (newMessageReceived) => {
    if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
      // Not currently selected chat
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    }
  });

  // Clean-up function
  return () => {
    socket.off("message received");
  };
}, [messages, selectedChatCompare]); // Though having 'messages' in dependency might cause unnecessary re-registrations


  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!istyping) {
      socket.emit("typing", selectedChat._id);
    }
    const timerLength = 3000;
    setTimeout(() => {
      if (istyping) {
        socket.emit("stop typing", selectedChat._id);
      }
    }, timerLength);
    };
    console.log(selectedChat, selectedChat.users);


  return (
    <div className={`flex flex-col ${selectedChat ? 'h-full' : 'items-center justify-center h-full'}`}>
      {selectedChat ? (
        <>
          <div className="flex items-center justify-between p-2 w-full">
            {/* Back Icon Placeholder */}
            <span className="block md:hidden text-xl cursor-pointer">
              {/* You can replace this span with an actual icon component */}
              ←
            </span>
            <div className="text-lg md:text-xl font-semibold">
{selectedChat.isGroupChat 
    ? selectedChat.chatName.toUpperCase() 
    : (selectedChat.users && selectedChat.users.length > 0
      ? `${selectedChat.users[0].nom ?? "Unknown"} ${selectedChat.users[0].prenom ?? "User"}`
      : "Unknown User")
  }       </div>
{selectedChat?.users && selectedChat.users.length > 0 && <ProfileModal user={selectedChat.users[0]} />}
          </div>
          <div className="flex-grow p-3 bg-gray-200 w-full overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                {/* Spinner Placeholder */}
                Loading...
              </div>
            ) : (
              <ScrollableChat messages={messages} />
            )}
          </div>
          <div className="p-3 w-full">
            {istyping && (
              <Lottie options={defaultOptions} width={70} />
            )}
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}
            />
          </div>
        </>
      ) : (
        <div className="text-2xl">
          Click on a authData to start chatting
        </div>
      )}
    </div>
  );
};

export default SingleChat;
