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
        const res = await axios.post(
          'https://colabhub.onrender.com/api/auth/chatgpt',
          {
            transcribedText: transcribedText
          }
        );
        const answer = res.data.answer;
        if (answer.startsWith("I'm sorry")) {
          console.error("Error from the OpenAI API:", answer);
          return;
        }
  
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
        <div className='pl-8'>
        <RadarChartComponent moodStatistics={moodStatistics} />
        </div>
        <PieChartComponent moodStatistics={moodStatistics}/>
        <LineChartComponent moodStatistics={moodStatistics} />
      
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
