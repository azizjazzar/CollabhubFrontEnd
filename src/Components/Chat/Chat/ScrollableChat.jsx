import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { ChatState } from "@/Context/ChatProvider";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../../Context/ChatLogics";

const ScrollableChat = ({ messages }) => {
    const { authData } = ChatState(); 
    const user = authData.user;

    return (
        <div className="scrollable-chat overflow-auto p-3 space-y-2">
            {messages.map((m, i) => (
                <div key={i} className="chat-message flex items-end">
                    {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                        <Avatar
                            className="mr-2"
                            style={{ marginTop: '7px' }}
                            src={m.sender.picture}
                            alt={m.sender.nom}
                        />
                    )}
                    <span
                        className={`rounded-full px-3 py-2 ${m.sender._id === user._id ? "bg-blue-100" : "bg-green-100"} max-w-[75%]`}
                        style={{
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            marginTop: isSameUser(messages, m, i, user._id) ? '3px' : '10px',
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
