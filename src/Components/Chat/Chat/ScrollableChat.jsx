import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { ChatState } from "@/Context/ChatProvider"; // Ensure this import if you're using ChatState
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../Context/ChatLogics";
const ScrollableChat = ({ messages }) => {
    const { authData } = ChatState(); // Assuming this is correctly imported and used
    const user = authData.user; // Assuming authData contains user object with _id, adjust as per your authData structure
    return (
        <div className="scrollable-chat">
            {messages.map((m, i) => (
                <div key={i} className="chat-message"> {/* Corrected key to use 'i' */}
                    {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                        <Avatar
                            mt="7px"
                            mr={1}
                            size="sm"
                            cursor="pointer"
                            name={m.sender.nom} // Assuming sender has a 'name' field
                            src={m.sender.picture} // Assuming sender has a 'pic' field
                        />
                    )}
                    <span
                        style={{
                            backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                        }}
                    >
                        {m.content}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ScrollableChat;
