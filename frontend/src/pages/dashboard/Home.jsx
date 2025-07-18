import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {IoMdCard} from "react-icons/io";
import InfoCard from "../../components/Cards/InfoCard.jsx";
import {LuHandCoins,LuWalletMinimal} from "react-icons/lu";
import {addThousandsSeparator} from "../../utils/helper.js";
import RecentTransactions from "../../components/DashBoard/RecentTransactions.jsx";
import FinanceOverview from "../../components/DashBoard/FinanceOverview.jsx";
import ExpenseTransactions from "../../components/DashBoard/ExpenseTransactions.jsx";
import Last30DaysExpenses from "../../components/DashBoard/Last30DaysExpenses.jsx";

const Home = () => {
    useUserAuth()

    const navigate = useNavigate();

    const [dashboard,setDashboard]=useState(null)
    const [loading,setLoading]=useState(false);

    const fetchDashboardData = async () => {
        if(loading) return;
        setLoading(true);
        try{
            const response=await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );
            if(response.data){
                setDashboard(response.data);
            }
        }
        catch(error){
            console.log("Something went wrong.Please try again.",error);
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboardData();
        return ()=>{};
    }, []);

    return(
       <DashboardLayout activeMenu="Dashoard">
           <div className="my-5 mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <InfoCard
                       icon={<IoMdCard/>}
                       label="Total Balance"
                       value={addThousandsSeparator(dashboard?.totalBalance ||0)}
                       color="bg-primary"
                   />
                   <InfoCard
                       icon={<LuWalletMinimal/>}
                       label="Total Income"
                       value={addThousandsSeparator(dashboard?.totalIncome ||0)}
                       color="bg-orange-500"
                   />
                   <InfoCard
                       icon={<LuHandCoins/>}
                       label="Total Expense"
                       value={addThousandsSeparator(dashboard?.totalExpense ||0)}
                       color="bg-red-500"
                   />

               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                   <RecentTransactions
                       transactions={dashboard?.recentTransactions}
                       onSeeMore={()=>navigate("/expense")}
                   />
                   <FinanceOverview
                       totalBalance={dashboard?.totalBalance ||0}
                       totalIncome={dashboard?.totalIncome ||0}
                       totalExpense={dashboard?.totalExpense ||0}
                   />
                   <ExpenseTransactions
                       transactions={dashboard?.last30DaysExpenses?.transactions || []}
                       onSeeMore={()=>navigate("/expense")}
                   />
                   <Last30DaysExpenses
                       data={dashboard?.last30DaysExpenses?.transactions || []}
                   />
               </div>
           </div>
       </DashboardLayout>
    );
};
export default Home;