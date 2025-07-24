import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className={`rounded-xl p-6 shadow-md ${color} text-white`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm">{label}</p>
                    <h2 className="text-2xl font-bold">{value}</h2>
                </div>
                <div className="text-4xl">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
