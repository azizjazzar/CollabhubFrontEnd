import React from 'react';
import '@/Blog/ChatBubble.css'; // Assurez-vous de fournir le chemin correct en fonction de la structure de votre projet

const ChatBubble = ({ message, isUser }) => {
  const bubbleClasses = `max-w-70p ${isUser ? 'self-end user-bubble' : 'self-start bot-bubble'}`;

  return (
    <div className={bubbleClasses}>
      {message}
    </div>
  );
};

export default ChatBubble;
