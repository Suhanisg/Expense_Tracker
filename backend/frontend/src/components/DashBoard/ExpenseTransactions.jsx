import React from 'react'
import {LuArrowRight} from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";
import moment from "moment";

const ExpenseTransactions = ({transactions,onSeeMore}) => {
    return (
       <div className="card">
           <div className="flex items-center justify-between">
               <h5 className="text-lg">Expanses</h5>
               <button className="card-btn" onClick={onSeeMore}>
                   See All <LuArrowRight className="text-base"/>
               </button>
           </div>
           <div className="mt-6">
               {transactions?.slice(0, 5)?.map((expense, index) => (
                   <TransactionInfoCard
                       key={expense.id ?? `${expense.category}-${expense.amount}-${expense.date}-${index}`}
                       title={expense.category}
                       icon={expense.icon}
                       date={moment(expense.date).format('Do MMMM YYYY')}
                       amount={expense.amount}
                       type="expense"
                       hideDeleteBtn
                   />
               ))}
           </div>

       </div>
    );
};
export default ExpenseTransactions