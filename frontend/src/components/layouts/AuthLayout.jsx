import React from 'react';
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <div className="flex items-center gap-3 mb-6">
                    <img src="/accounting%20(2).png" alt="Logo" className="w-12 h-12 object-contain" />
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 tracking-wider drop-shadow-sm">
                        BUDGET BUDDY
                    </h2>
                </div>
                {children}
            </div>
            <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
                {/* Decorative Shapes */}
                <div className="w-48 h-48 rounded-[40px] bg-purple-800 absolute -top-7 -left-5" />
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-pink-800 absolute top-[30%] right-5" />
                <div className="w-48 h-48 rounded-[40px] bg-purple-500 absolute -bottom-7 -left-5" />

                {/* Card Section */}
                <div className="grid grid-cols-1 z-20">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income & Expenses"
                        value="430,000"
                    />
                </div>
                <img
                    src={CARD_2}
                    className="w-64 lg:w-[80%] absolute bottom-10 shadow-lg shadow-blue-400/15"
                    alt="card"
                />
            </div>
        </div>
    );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value }) => {
    return (
        <div className="flex gap-4 bg-white p-4 rounded-xl shadow-lg shadow-purple-300/20 border border-gray-200 z-10 items-center w-72">
            <div className="w-12 h-12 flex items-center justify-center text-[24px] text-white rounded-full drop-shadow-lg bg-gradient-to-tr from-purple-500 to-purple-700">
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
                <span className="text-xl font-semibold text-gray-900">${value}</span>
            </div>
        </div>
    );
};