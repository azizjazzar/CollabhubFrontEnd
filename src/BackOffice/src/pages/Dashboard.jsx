import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import AcueilStats from '../components/AcueilStats'
import BuyerProfilePieChart from '../components/BuyerProfilePieChart'
import PopularProducts from '../components/PopularProducts'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsComponent, PieChartComponent, LineChartComponent, RadialPieChartComponent, RadarChartComponent } from "@/Components/Consultations/Metting/IA/Statistique";
import Statistiques from '@/Services/statistiques/Statistiques'
export default function Dashboard() {
  const [response, setResponse] = useState('');
  const [moodStatistics, setMoodStatistics] = useState([]);
  const StatistiqueService = new Statistiques();

  useEffect(() => {
    const fetchData = async () => {
      const transcribedText = localStorage.getItem('transcribedText');

      const result = await StatistiqueService.gemini(transcribedText);

      if (result) {
        setResponse(result[0]);
        setMoodStatistics(result[1]);
      }
    };

    fetchData();
  }, []);
  
	return (
		<div className="pt-3 flex flex-col gap-4 bg-blue-gray">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
			
			</div>
			<div className="flex flex-row gap-4 w-full">
				<AcueilStats />
			</div>

			<div className="flex flex-row gap-4 w-full">
			</div>
		</div>
	)
}
