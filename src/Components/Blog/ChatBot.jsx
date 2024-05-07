import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Importez le fichier CSS

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [botResponses, setBotResponses] = useState([]);
    const [isChatbotOpen, setIsChatbotOpen] = useState(true); // État pour suivre si le chatbot est ouvert ou fermé

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'collabhub',
                prompt: userMessage,
                stream: false
            });

            setBotResponses([...botResponses, { type: 'user', content: userMessage }]);
            setBotResponses([...botResponses, { type: 'bot', content: response.data.response }]);
            setUserMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen); // Inversez l'état lorsque le bouton est cliqué
    };

    return (
        <div className="chatbot-container">
            {!isChatbotOpen && (
                <button className="chatbot-button" onClick={toggleChatbot}>
                    <img src="/img/chatbot.png" alt="Bot Icon" />
                </button>
            )}
            {isChatbotOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="avatar">
                            <img src="/img/chatbot.png" alt="Bot Avatar" />
                        </div>
                        <div className="bot-info">
                            <div className="bot-name">Collabhub Bot</div>
                            <div className="bot-status">Online</div>
                        </div>
                        <button className="close-button" onClick={toggleChatbot}>X</button>
                    </div>
                    <div className="chat-messages">
                        {botResponses.map((message, index) => (
                            <div key={index} className={message.type === 'user' ? 'user-message' : 'bot-message'}>
                                {message.type === 'user' ? 'You: ' : 'Bot: '}
                                {message.content}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default Chatbot;
