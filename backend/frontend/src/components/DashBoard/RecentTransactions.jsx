import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card w-full">
            <div className="flex items-center justify-between w-full">
                <h5 className="text-lg font-semibold text-gray-800">Recent Transactions</h5>

                <button
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-purple-600"
                    onClick={onSeeMore}
                >
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactions?. slice(0,5)?.map((item)=>(
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type === 'expense' ? item.category:item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />



                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
