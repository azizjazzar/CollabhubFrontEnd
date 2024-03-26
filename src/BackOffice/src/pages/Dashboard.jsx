import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import RecentOrders from '../components/RecentOrders'
import BuyerProfilePieChart from '../components/BuyerProfilePieChart'
import PopularProducts from '../components/PopularProducts'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsComponent, PieChartComponent, LineChartComponent, RadialPieChartComponent, RadarChartComponent } from "@/Components/Consultations/Metting/IA/Statistique";
export default function Dashboard() {
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
		<div className="pt-3 flex flex-col gap-4 bg-blue-gray">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
			<LineChartComponent  moodStatistics={moodStatistics} /> 
			<PieChartComponent moodStatistics={moodStatistics}/>
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
			<div className="flex flex-row gap-4 w-full">
			</div>
		</div>
	)
}
