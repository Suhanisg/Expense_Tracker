import React from 'react';
import CustomPieChart from "../Charts/CustomPieChart.jsx";
const COLORS=["#875C75","#FA2C37","#FF6900"];

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData=[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Expenses",amount:totalExpense},
        {name:"Total Income",amount:totalIncome},
    ];
    return (
        <div className="card p-6 bg-white rounded-xl shadow-md w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-semibold text-gray-800">Financial Overview</h5>
            </div>

            <div className="w-full flex justify-center items-center mt-4">
                <CustomPieChart
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={`$${totalBalance}`}
                    colors={COLORS}
                    showTextAnchor
                />
            </div>
        </div>
    );

}
export default FinanceOverview;