import React from 'react';
import { ChatbotKitProvider, Chatbot } from 'react-chatbot-kit';
import config from './chatbot/config'; // Importez votre configuration de chatbot
import messageParser from './chatbot/messageParser'; // Importez votre analyseur de messages
import actionProvider from './chatbot/actionProvider'; // Importez votre fournisseur d'actions

function ChatbotPage() {
  return (
    <div>
      <ChatbotKitProvider
        config={config}
        messageParser={messageParser}
        actionProvider={actionProvider}
      >
        <Chatbot />
      </ChatbotKitProvider>
    </div>
  );
}

export default ChatbotPage;
