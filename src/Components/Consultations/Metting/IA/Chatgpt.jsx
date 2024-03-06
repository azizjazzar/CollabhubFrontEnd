// 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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatGPT() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: 'so let me explain to you i have a client and i want you to iniliaze his psychyque mode i ts for school academic angry or not and give me some statistiques this is what he said :' + transcribedTextFromLocalStorage },
            ],
          },
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );

        const answer = res.data.choices[0].message.content;
        console.log(answer);
        setResponse(answer);
      } catch (error) {
        console.error("Erreur lors de la requête à l'API OpenAI:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once on mount
  const [transcribedTextFromLocalStorage, setTranscribedTextFromLocalStorage] = useState('');
  useEffect(() => {
    const transcribedText = localStorage.getItem('transcribedText');
    if (transcribedText) {
        setTranscribedTextFromLocalStorage(transcribedText);
    }
}, []);
  return (
    <div className='pt-32'>
      <p>Réponse : {response}</p>
    </div>
  );
}

export default ChatGPT;
