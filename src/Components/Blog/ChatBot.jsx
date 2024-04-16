import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [botResponses, setBotResponses] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [isChatbotOpen, setIsChatbotOpen] = useState(true);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);
    const allQuestions = [
        "Qu'est-ce que CollabHub ?",
        "Comment prendre une consultation ?",
        "Comment voir les services des freelancers ?",
        "Comment collaborer sur des projets ?",
        "Comment fonctionne le paiement sur la plateforme ?",
        "Comment contacter le support ?",
        "Comment devenir freelancer ?",
        "Comment fonctionne la notation des freelancers ?",
        "Je veux trouver un projet",
        "Je veux écrire un blog",
        "Je veux faire une consultation",
        "je veux faire une collaboration"
    ];

    useEffect(() => {
        fetchInitialMessage();
    }, []);

    const fetchInitialMessage = async () => {
        try {
            const response = await axios.get('https://colabhub.onrender.com/api/chatbot/initial');
            setBotResponses([{ type: 'bot', content: response.data.response }]);
            setCurrentOptions(response.data.options ?? []);
        } catch (error) {
            console.error('Error fetching initial message:', error);
        }
    };

    const sendMessage = async () => {
        if (userMessage.trim() !== '') {
            try {
                const response = await axios.post('https://colabhub.onrender.com/api/chatbot', { message: userMessage });
                setBotResponses(prevResponses => [
                    ...prevResponses,
                    { type: 'user', content: userMessage }
                ]);
                setBotResponses(prevResponses => [
                    ...prevResponses,
                    { type: 'bot', content: response.data.response }
                ]);
                setUserMessage('');
                setSuggestedQuestions([]);
                if (response.data.options) {
                    setCurrentOptions(response.data.options);
                } else {
                    setCurrentOptions([]);
                }

                // Check for specific messages and apply redirection
                if (response.data.response.includes("je vais vous diriger vers la page consultation")) {
                    // Delayed redirection after 3 seconds
                    setTimeout(() => {
                        window.location.href = '/do-a-quick-consultation';
                    }, 6000);
                } else if (response.data.response.includes("je vais vous diriger vers la page blog")) {
                    // Delayed redirection after 3 seconds
                    setTimeout(() => {
                        window.location.href = '/blog';
                    }, 6000);
                } else if (response.data.response.includes("je vais vous diriger vers la page collaboration")) {
                    // Delayed redirection after 3 seconds
                    setTimeout(() => {
                        window.location.href = '/collaboration';
                    }, 6000);
                } else if (response.data.response.includes("je vais vous diriger vers la page service")) {
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

    const toggleChatbot = () => {
        setIsChatbotOpen(prevState => !prevState);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const searchQuestions = (text) => {
        if (text.trim() === '') {
            setSuggestedQuestions([]);
        } else {
            const keywords = text.trim().toLowerCase().split(" ");
            const matchedQuestions = allQuestions.filter(question =>
                keywords.some(keyword =>
                    question.toLowerCase().includes(keyword)
                )
            );
            setSuggestedQuestions(matchedQuestions);
        }
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
                            {botResponses.slice().reverse().map((message, index) => (
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
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => {
                                    setUserMessage(e.target.value);
                                    searchQuestions(e.target.value);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                        <div className="suggested-questions">
                            {suggestedQuestions.map((question, index) => (
                                <div key={index} className="suggested-question" onClick={() => setUserMessage(question)}>
                                    <span className="suggested-question-text">{question}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
