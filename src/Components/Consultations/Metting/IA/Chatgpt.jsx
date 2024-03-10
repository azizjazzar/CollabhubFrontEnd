import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsComponent, PieChartComponent, LineChartComponent, RadialPieChartComponent, RadarChartComponent } from './Statistique';

function ChatGPT() {
  const [response, setResponse] = useState('');
  const [moodStatistics, setMoodStatistics] = useState([]);

  useEffect(() => {
    const transcribedText = localStorage.getItem('transcribedText');
    const fetchData = async () => {
      try {
        console.log("chatgpy",transcribedText)

        const res = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              {
                role: 'user',
                content: `I will give you a text speech about the user in the meeting and you're gonna give me mood statistics for each time point where the mood can be (happy, sad, nervous, excited), and I want you to format it like this: [(the time), (mood),(the time), (mood) ...]. This is the text: ${transcribedText}`,
              }
            ],
          },
          {
            headers: {
              Authorization: "Bearer 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",
            },
          }
        );

        const answer = res.data.choices[0].message.content;
        console.log(answer);
        setResponse(answer);

        // Parse the response to extract time and mood data
        const moodRegex = /\((\d{2}:\d{2}:\d{2}), (\w+)\)/g;
        let matches;
        const parsedData = [];

        while ((matches = moodRegex.exec(answer)) !== null) {
          const [_, time, mood] = matches;
          parsedData.push({ time, mood });
        }

        setMoodStatistics(parsedData);
      } catch (error) {
        console.error("Error fetching data from the OpenAI API:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className='pt-32'>
     {response && (
  <p>Response: {response}</p>
)}
      <div>
        <StatsComponent></StatsComponent>
        <PieChartComponent></PieChartComponent>
        <LineChartComponent></LineChartComponent>
        <RadialPieChartComponent></RadialPieChartComponent>
        <div className='pl-8'>
        <RadarChartComponent moodStatistics={moodStatistics} />
        </div>
      </div>
      <div>
        <h2>Mood Statistics</h2>
        <ul>
          {moodStatistics.map((item, index) => (
            <li key={index}>
              Time: {item.time}, Mood: {item.mood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatGPT;
