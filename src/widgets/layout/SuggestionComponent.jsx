import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function SuggestionComponent() {
  const { subject } = useParams();
  const [chatbotResponse, setChatbotResponse] = useState('');

  useEffect(() => {
    const handleChatRequest = async () => {
      try {
        const response = await axios.post('https://colabhub.onrender.com/meet/chatgpt', {
          transcribedText: subject,
        });

        setChatbotResponse(response.data.answer);
      } catch (error) {
        console.error('Error making API request from React:', error);
      }
    };

    handleChatRequest();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-200 p-20 mt-10">
      <div className="container mx-auto">
        <div>
          <div>
            <strong>Suggestions:</strong>
            <p>{chatbotResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionComponent;
