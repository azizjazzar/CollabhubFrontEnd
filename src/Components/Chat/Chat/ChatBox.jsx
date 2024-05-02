import React from "react";
import SingleChat from "./SingleChat";
import { ChatState } from "@/Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState(); // Using the ChatState hook to access the selectedChat.

  return (
    <div
      className={`flex flex-col items-center p-3 bg-white w-full md:w-2/3 border rounded-lg ${
        selectedChat ? "flex" : "hidden md:flex"
      }`}
    >
      {/* Render SingleChat only if a chat is selected */}
      {selectedChat && <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
    </div>
  );
};

export default ChatBox;
