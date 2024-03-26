import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
const data = [
  { name: 'Janvier', value: 400 },
  { name: 'Février', value: 300 },
  { name: 'Mars', value: 200 },
  { name: 'Avril', value: 500 },
  { name: 'Mai', value: 600 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6633'];
const title = () => {
  return (
    <div className="text-center mt-15">
    {/* Englobez le titre, l'icône et le paragraphe dans une div avec la classe floating */}
    <div> 
  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
    Analyzing Client Mood During Meetings{' '}
    <span className="text-orange-500">Through Virtual Collaboration</span>
  </h1>
  <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
    Explore how clients feel during virtual meetings and gain insights to improve collaboration and satisfaction.
  </p>
</div>

    </div>
  );
};

const StatsComponent = () => {
  return (
<div className="text-center mt-15">
      {/* Englobez le titre, l'icône et le paragraphe dans une div avec la classe floating */}
      <div className="flex items-center justify-center">
  <div> 
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
      Analyzing Client Mood During{' '}
      <span className="text-orange-500">Meetings</span>
    </h1>
    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
      Explore how clients feel during virtual meetings and gain insights to improve collaboration and satisfaction.
    </p>
  </div>

</div>

<hr className="my-10 border-gray-400" /> {/* Ligne grise avec une marge top/bottom de 10px */}

    </div>
  );
};

const PieChartComponent = ({ moodStatistics }) => {
  if (!moodStatistics || moodStatistics.length === 0) {
    // Afficher un message ou retourner un composant de chargement
    return <div>No mood statistics available</div>;
  }

  const moodCounts = moodStatistics.reduce((acc, cur) => {
    acc[cur.mood] = (acc[cur.mood] || 0) + 1;
    return acc;
  }, {});

  const totalCount = Object.values(moodCounts).reduce((acc, cur) => acc + cur, 0);

  const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: Math.floor((count / totalCount) * 100),
  }));

  return (
  
  
 
      <PieChart width={400} height={400}>
        <Pie
          data={moodPercentages}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {moodPercentages.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
  
  );
};

const LineChartComponent = ({ moodStatistics }) => {
  return (
    <LineChart width={900} height={300} data={moodStatistics}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
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
  const moodCounts = moodStatistics.reduce((acc, cur) => {
    acc[cur.mood] = (acc[cur.mood] || 0) + 1;
    return acc;
  }, {});

  const totalCount = Object.values(moodCounts).reduce((acc, cur) => acc + cur, 0);

  const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood,
    moodValue: Math.floor((count / totalCount) * 100),
    maxMark: 100,
  }));

  return (
    <RadarChart width={500} height={500} data={moodPercentages}>
      <PolarGrid />
      <PolarAngleAxis dataKey="mood" />
      <PolarRadiusAxis tick={{ fontSize: 10 }} />
      <Radar name="Client Mood (%)" dataKey="moodValue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  );
};

export { StatsComponent, PieChartComponent, LineChartComponent, RadialPieChartComponent, RadarChartComponent };
