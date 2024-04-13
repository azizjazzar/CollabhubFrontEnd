import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [botResponses, setBotResponses] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [isChatbotOpen, setIsChatbotOpen] = useState(true);


      
    useEffect(() => {
        fetchInitialMessage();
    }, []);

    const fetchInitialMessage = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/chatbot/initial');
            setBotResponses([{ type: 'bot', content: response.data.response }]);
            setCurrentOptions(response.data.options ?? []);
        } catch (error) {
            console.error('Error fetching initial message:', error);
        }
    };

    

    const sendMessage = async () => {
        if (userMessage.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:3000/api/chatbot', { message: userMessage });

                const timestampedMessage = {
                    type: 'bot',
                    content: response.data.response,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };

                setBotResponses(prevResponses => [
                    ...prevResponses,
                    { type: 'user', content: userMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                    timestampedMessage,
                ]);

                setUserMessage('');

                if (response.data.options) {
                    setCurrentOptions(response.data.options);
                } else {
                    setCurrentOptions([]);
                }

                 // Check for specific messages and apply redirection
            if (response.data.response.includes("je vais vous diriger vers la page consultation ")) {
                // Delayed redirection after 3 seconds
                setTimeout(() => {
                    window.location.href = '/do-a-quick-consultation';
                }, 6000);

            } else if (response.data.response.includes("je vais vous derriger vers la page blog ")) {
                // Delayed redirection after 3 seconds
                setTimeout(() => {
                    window.location.href = '/blog';
                }, 6000);
            }
                else if (response.data.response.includes("je vais vous diriger vers la page collaboration ")) {
                    // Delayed redirection after 3 seconds
                    setTimeout(() => {
                        window.location.href = '/collaboration';
                    }, 6000);

                }else if (response.data.response.includes("je vais vous diriger vers la page service ")) {
                        // Delayed redirection after 3 seconds
                        setTimeout(() => {
                            window.location.href = '/buyProject';
                        }, 6000);

            }
            
            
        } catch (error) {
            console.error('Error fetching data:', error);
            }
        }
    };

    const handleOptionSelect = (option) => {
        sendMessage(option);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleChatbot = () => {
        setIsChatbotOpen(prevState => !prevState);
    };

    return (
        <>
            {isChatbotOpen && (
                <div className="chatbot-container">
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
                                    {message.type === 'bot' && (
                                        <div className="avatar">
                                            <img src="/img/chatbot.png" alt="Bot Avatar" />
                                        </div>
                                    )}
                                    <div className="message-content">
                                        {message.type === 'user' ? 'You: ' : ''}
                                        {message.content}
                                    </div>
                                    <div className="message-timestamp">{message.timestamp}</div>
                                </div>
                            )).reverse()}
                        </div>
                        {currentOptions.length > 0 && (
                            <div className="options-container">
                                {currentOptions.map((option, index) => (
                                    <button key={index} onClick={() => handleOptionSelect(option)}>{option}</button>
                                ))}
                            </div>
                        )}
                        <div className="chat-input">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
