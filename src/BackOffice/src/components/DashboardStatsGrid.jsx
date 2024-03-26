import React, { useState, useEffect } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import Statistiques from '@/Services/statistiques/Statistiques';
import AuthenticationService from '@/Services/Authentification/AuthentificationService';

export default function DashboardStatsGrid() {
    const StatistiquesService = new Statistiques();
    const AuthenticationS = new AuthenticationService();
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalUserCount,setUserCount] = useState(0);

    useEffect(() => {
        const fetchTotalCustomers = async () => {
            try {
                const data = await StatistiquesService.getAllStatistiquesCounts();
                setTotalCustomers(data.count);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de clients :', error);
            }
        };
        const fetchTotalAmount = async () => {
            try {
                const data = await StatistiquesService.getTotalTransactionAmount();
                setTotalAmount(data.totalAmountInUSD);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de clients :', error);
            }
        };
        const fetchTotalUser = async () => {
            try {
                const data = await AuthenticationS.getCountUsers();
                setUserCount(data.totalUsers);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de clients :', error);
            }
        };
        fetchTotalAmount();
        fetchTotalCustomers();
        fetchTotalUser();
    }, []);

    return (
        <div className="flex gap-4">
              <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Users</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{totalUserCount}</strong>
                        <span className="text-sm text-green-500 pl-2">-343</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Meetings</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{totalCustomers}</strong>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Consultaions Amounts</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{totalAmount}$</strong>
                        <span className="text-sm text-green-500 pl-2">+30</span>
                    </div>
                </div>
            </BoxWrapper>
          
            
        </div>
    );
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
