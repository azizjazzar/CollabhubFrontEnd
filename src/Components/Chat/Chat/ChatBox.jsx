import React from "react";
import SingleChat from "./SingleChat";
import { ChatState } from "@/Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 text-sm italic p-4 h-full">
          <p>Select a chat to start messaging</p>
          <img src="/images/select-chat-placeholder.svg" alt="Select a chat" className="mt-4 opacity-50" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
