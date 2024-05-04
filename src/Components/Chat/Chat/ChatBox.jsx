import React from "react";
import SingleChat from "./SingleChat";
import { ChatState } from "@/Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-lg">
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <div className="flex items-center justify-center text-gray-500 text-sm italic p-4">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};



export default ChatBox;
