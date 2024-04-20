// ChatRoom.jsx
import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = "67a5503c4b134d80baec1767141115d3";
const TOKEN = "007eJxTYDj+deK9ll8nNDk8LASyqqZ77D4VsW713rL8TcvPixW8i6tQYDAzTzQ1NTBONkkyNDZJsTBISkxNNjQ3Mzc0MTQ0NE0xLtzJk9YQyMjw0SqXiZEBAkF8Nobk/JycxCQGBgD3ryDt";
const CHANNEL = "collab";

const agoraChatClient = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

const ChatRoom = ({ isChatOpen, setChatOpen }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            agoraChatClient.sendMessage({ text: inputMessage }).then(() => {
                setChatMessages(prevMessages => [...prevMessages, { message: inputMessage }]);
                setInputMessage('');
            }).catch(error => {
                console.error('Error sending Agora Chat message:', error);
            });
        }
    };

    useEffect(() => {
        agoraChatClient.join(APP_ID, CHANNEL, TOKEN, null).then(uid => {
            console.log('Agora Chat joined successfully with UID:', uid);

            agoraChatClient.on('channel-message', (userId, text) => {
                setChatMessages(prevMessages => [...prevMessages, { message: text }]);
            });
        }).catch(error => {
            console.error('Error joining Agora Chat:', error);
        });

        return () => {
            agoraChatClient.leave().then(() => {
                agoraChatClient.removeAllListeners();
            }).catch(error => {
                console.error('Error leaving Agora Chat:', error);
            });
        };
    }, []);

    return (
        <div className="chat-room">
            <h5 style={{ color: "#3498DB", fontSize: "1.2em", fontWeight: "bold" }}>
                Chat
            </h5>
            <div className="chat-window">
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {chatMessages.map((msg, index) => (
                        <li key={index}>{msg.message}</li>
                    ))}
                </ul>
            </div>
            <div className="message-container">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
