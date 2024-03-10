import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line  } from 'recharts';
import { RadialBarChart, RadialBar } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  { name: 'Janvier', value: 400 },
  { name: 'Février', value: 300 },
  { name: 'Mars', value: 200 },
  { name: 'Avril', value: 500 },
  { name: 'Mai', value: 600 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6633'];

const StatsComponent = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

const PieChartComponent = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
const LineChartComponent = () => {
    return (
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  const RadialPieChartComponent = () => {
    const data = [
        { name: 'Groupe A', value: 400 },
        { name: 'Groupe B', value: 300 },
        { name: 'Groupe C', value: 300 },
        { name: 'Groupe D', value: 200 },
      ];
    return (
      <RadialBarChart width={400} height={300} innerRadius="10%" outerRadius="80%" data={data}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="value" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
        <Tooltip />
      </RadialBarChart>
    );
  };
  const RadarChartComponent = ({ moodStatistics }) => {
    // Calculer le nombre total d'occurrences de chaque humeur
    const moodCounts = moodStatistics.reduce((acc, cur) => {
      acc[cur.mood] = (acc[cur.mood] || 0) + 1;
      return acc;
    }, {});
  
    // Calculer le total d'occurrences de tous les mood
    const totalCount = Object.values(moodCounts).reduce((acc, cur) => acc + cur, 0);
  
    // Calculer le pourcentage d'apparition de chaque humeur
    const moodPercentages = Object.entries(moodCounts).reduce((acc, [mood, count]) => {
      acc[mood] = Math.floor((count / totalCount) * 100); // Arrondir le pourcentage vers le bas
      return acc;
    }, {});
  
    // Générer les données pour le graphique radar en utilisant les pourcentages
    const data = Object.entries(moodPercentages).map(([mood, percentage]) => ({
      mood: mood,
      moodValue: percentage,
      maxMark: 100, // MaxMark est fixé à 100 pour tous les cas
    }));
  
    return (
      <RadarChart width={500} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="mood" />
        <PolarRadiusAxis tick={{ fontSize: 10 }} />
        <Radar name="Client Mood (%)" dataKey="moodValue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    );
  };
  
  
  
  

export { StatsComponent, PieChartComponent ,LineChartComponent,RadialPieChartComponent , RadarChartComponent};
