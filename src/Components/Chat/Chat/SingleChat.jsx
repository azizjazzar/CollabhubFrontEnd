import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "./animation/typing.json";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "@/Context/ChatProvider";
import { FaPaperPlane } from 'react-icons/fa';


const ENDPOINT = "http://localhost:5000";
let socket;
let selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, authData } = ChatState();

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
            Authorization: `Bearer ${authData.accessToken}`,
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
  }, [authData]);

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
  }, [messages, selectedChatCompare]);

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

  return (
    <div className={`single-chat-container ${selectedChat ? 'selected-chat' : 'no-chat-selected'}`}>
      {selectedChat ? (
        <>
          <div className="chat-header">
            {/* Affichage du nom de l'utilisateur/group et bouton pour voir le profil */}
            <h2>{selectedChat.isGroupChat ? selectedChat.chatName.toUpperCase() :
              (selectedChat.users && selectedChat.users.length > 0 ?
                `${selectedChat.users[0].nom ?? "Unknown"} ${selectedChat.users[0].prenom ?? "User"}` : "Unknown User")}</h2>
            {selectedChat?.users && selectedChat.users.length > 0 && <ProfileModal user={selectedChat.users[0]} />}
          </div>
          <div className="chat-messages">
            {loading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              <ScrollableChat messages={messages} />
            )}
          </div>
          <div className="chat-input">
            {istyping && (
              <div className="typing-animation">
                <Lottie options={defaultOptions} height={50} width={50} />
              </div>
            )}
            <div className="message-input-container ">
              <input
                type="text"
                className="message-input w-[720px]"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={sendMessage}
              />
              <button className="send-button" onClick={sendMessage}><FaPaperPlane /></button>
            </div>
          </div>
        </>
      ) : (
        <div className="no-chat-text">
          Click on a chat to start chatting
        </div>
      )}
    </div>
  );
};

export default SingleChat;
