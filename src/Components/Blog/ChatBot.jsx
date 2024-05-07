import React, { useState, useEffect } from 'react'; // Importez useEffect pour gérer l'effet d'initialisation
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [botResponses, setBotResponses] = useState([]);
    const [isChatbotOpen, setIsChatbotOpen] = useState(true);

    useEffect(() => {
        // Effet d'initialisation pour afficher un message de bienvenue
        const welcomeMessage = "Welcome to Collabhub Bot! How can I assist you today?";
        setBotResponses([{ type: 'bot', content: welcomeMessage }]);
    }, []); // Le tableau vide [] garantit que cet effet est exécuté une seule fois lors du montage du composant

    const sendMessage = async () => {
        // La fonction pour envoyer un message au serveur du chatbot et recevoir une réponse
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'collabhub',
                prompt: userMessage,
                stream: false
            });

            setBotResponses(prevResponses => [
                ...prevResponses,
                { type: 'user', content: userMessage },
                { type: 'bot', content: response.data.response }
            ]);
            setUserMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
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
                        {botResponses.slice().reverse().map((message, index) => (
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
