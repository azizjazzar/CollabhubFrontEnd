import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthenticationService from '@/Services/Authentification/AuthentificationService';
import { StatsComponent, PieChartComponent, LineChartComponent, RadialPieChartComponent, RadarChartComponent } from '@/Components/Consultations/Metting/IA/Statistique';
export function UsersSatistique() {
    const location = useLocation();
    const champ = location.state.champ;
    const Authservice = new AuthenticationService();
    const [userA, setUserA] = useState({});
    const [userB, setUserB] = useState({});
    const [ClientAStats, setClientAStats] = useState({});
    const [ClientBStats, setClientBStats] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            console.log("lena", champ)
            // Récupérer les données utilisateur pour userA et userB
            const userDataA = await Authservice.getUserById(champ.clientAID);
            const userDataB = await Authservice.getUserById(champ.clientBID);

            // Mettre à jour les états des utilisateurs
            setUserA(userDataA);
            setUserB(userDataB);

            if (champ.responseClientA && champ.responseClientB) {
                const moodRegex = /\((\d{2}:\d{2}:\d{2}), (\w+)\)/g;
                let matches;
                const parsedDataA = [];
                const parsedDataB = [];

                while ((matches = moodRegex.exec(champ.responseClientA)) !== null) {
                    const [_, time, mood] = matches;
                    parsedDataA.push({ time, mood });
                }
                while ((matches = moodRegex.exec(champ.responseClientB)) !== null) {
                    const [_, time, mood] = matches;
                    parsedDataB.push({ time, mood });
                }

                setClientAStats(parsedDataA);
                setClientBStats(parsedDataB);
            } else {
                console.error('responseClientA or responseClientB is not defined.');
            }
        };

        fetchData(); // Appeler fetchData une fois que le composant est monté
    }, [champ.clientAID, champ.clientBID]); // Les dépendances de useEffect


    // Utiliser les données utilisateur comme nécessaire
    return (
        <div className='flex pt-[50px]'>
            <div className='w-1/2 flex flex-col items-center'>
                <img
                    src={`https://colabhub.onrender.com/images/${userA?.picture || 'team-1.jpg'}`}
                    alt="User"
                    className="w-[200px] h-[200px] rounded-full mb-2"
                />
                <span className='text-center'>{userA.nom} {userA.prenom}</span>
                <StatsComponent></StatsComponent>
                <div className='pl-8'>
                    <RadarChartComponent moodStatistics={ClientAStats} />
                </div>
                <PieChartComponent moodStatistics={ClientAStats} />
                <LineChartComponent moodStatistics={ClientAStats} />
            </div>
            {/* Div pour la deuxième moitié de l'écran */}
            <div className='w-1/2 flex flex-col items-center'>
                <img
                    src={`https://colabhub.onrender.com/images/${userB?.picture || 'team-1.jpg'}`}
                    alt="User"
                    className="w-[200px] h-[200px] rounded-full mb-2"
                />
            <span className='text-center'>{userB.nom} {userB.prenom}</span>
                <StatsComponent></StatsComponent>
                <div className='pl-8'>
                    <RadarChartComponent moodStatistics={ClientBStats} />
                </div>
                <PieChartComponent moodStatistics={ClientBStats} />
                <LineChartComponent moodStatistics={ClientBStats} />            </div>
        </div>
    );
}
