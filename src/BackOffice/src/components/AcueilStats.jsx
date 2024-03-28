import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { getOrderStatus } from '../lib/helpers';
import Statistiques from '@/Services/statistiques/Statistiques';
import AuthenticationService from '@/Services/Authentification/AuthentificationService';

const pageSize = 10; // Nombre d'éléments par page

export default function RecentOrders() {
    const [currentPage, setCurrentPage] = useState(1);
    const [stats, setStats] = useState([]);
    const [userData, setUserData] = useState({});
    const [cachedData, setCachedData] = useState({});
    const navigate = useNavigate();

    const StatistiqueService = new Statistiques();
    const AuthenticationS = new AuthenticationService();

    // Calcule le nombre total de pages
    const totalPages = Math.ceil(stats.length / pageSize);

    // Récupère les données de la page actuelle
    const currentOrders = stats.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        const fetchData = async () => {
            if (cachedData[currentPage]) {
                setStats(cachedData[currentPage].stats);
                setUserData(cachedData[currentPage].userData);
            } else {
                const statsData = await StatistiqueService.getAllStatistiques();
                const userdata = {};
                for (const champ of statsData) {
                    const userA = await getUserById(champ.clientAID);
                    const userB = await getUserById(champ.clientBID);
                    userdata[champ.clientAID] = userA;
                    userdata[champ.clientBID] = userB;
                }
                setStats(statsData);
                setUserData(userdata);
                setCachedData({ ...cachedData, [currentPage]: { stats: statsData, userData: userdata } });
            }
        };

        fetchData(); // Appel initial au chargement du composant
    }, [currentPage]); // Déclenche la mise à jour lorsque la page actuelle change

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getUserById = async (userId) => {
        const user = await AuthenticationS.getUserById(userId);
        return user;
    };

    const handleRowClick = (champ) => {
        navigate('/dashboard/usersSatistique', { state: { champ: champ } });
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Consultant</th>
                            <th className="border border-gray-400 px-4 py-2">Consulté</th>
                            <th className="border border-gray-400 px-4 py-2">Channel</th>
                            <th className="border border-gray-400 px-4 py-2">Date</th>
                            <th className="border border-gray-400 px-4 py-2">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((champ) => (
                            <tr key={champ._id} onClick={() => handleRowClick(champ)} className="hover:bg-gray-100 select-none">
                                <td className="border border-gray-400 px-4 py-2">
                                    <div className='flex items-center pr'>
                                        {userData[champ.clientAID]?.picture ? (
                                            <div className='flex items-center pr'>
                                                <img
                                                    src={`https://colabhub.onrender.com/images/${userData[champ.clientAID]?.picture || 'team-1.jpg'}`}
                                                    alt="User"
                                                    className="w-8 h-8 mr-2 rounded-full"
                                                />
                                                <span className='text-center'>{userData[champ.clientAID]?.nom} {userData[champ.clientAID]?.prenom}</span>
                                            </div>
                                        ) : (
                                            "loading..."
                                        )}
                                    </div>
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {userData[champ.clientBID]?.picture ? (
                                        <div className='flex items-center '>
                                            <img
                                                src={`https://colabhub.onrender.com/images/${userData[champ.clientBID]?.picture || 'team-1.jpg'}`}
                                                alt="User"
                                                className="w-8 h-8 mr-2 rounded-full"
                                            />
                                            <span className='text-center'>{userData[champ.clientBID]?.nom} {userData[champ.clientBID]?.prenom}</span>
                                        </div>
                                    ) : (
                                        "loading..."
                                    )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">  {champ.channel} </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">{format(new Date(champ.dateEnrg), 'dd MMM yyyy')}</td>
                                <td className="border border-gray-400 py-2 text-center">
								{getOrderStatus("CONFIRMED")}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		{/* Boutons de pagination */}
		<div className="flex justify-center mt-4">
			{[...Array(totalPages).keys()].map((page) => (
				<button
					key={page}
					className={`px-3 py-1 mx-1 ${currentPage === page + 1 ? 'bg-gray-200' : 'bg-white'
						} border border-gray-300`}
					onClick={() => handlePageChange(page + 1)}
				>
					{page + 1}
				</button>
			))}
		</div>
	</div>
);
}
