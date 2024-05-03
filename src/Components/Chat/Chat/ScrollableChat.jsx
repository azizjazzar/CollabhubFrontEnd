import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { ChatState } from "@/Context/ChatProvider"; // Assurez-vous d'importer ChatState correctement
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../Context/ChatLogics";

const ScrollableChat = ({ messages }) => {
    const { authData } = ChatState(); // En supposant que cela est correctement importé et utilisé
    const user = authData.user; // En supposant que authData contient un objet utilisateur avec _id, ajustez selon la structure de votre authData
    return (
        <div className="chat-container h-full w-full">
            {messages.map((m, i) => (
                <div key={i} className="chat-message"> {/* Corrected key to use 'i' */}
                    {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                        <Avatar
                            mt="7px"
                            mr={1}
                            size="sm"
                            cursor="pointer"
                            name={m.sender.nom} 
                            src={m.sender.picture} 
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
