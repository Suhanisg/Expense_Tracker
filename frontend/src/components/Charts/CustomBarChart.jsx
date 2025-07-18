import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import CustomTooltip from "./CustomTooltip.jsx"; // Capital import, correct

const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return "#875cf5"; // consistent purple matching your image

    };
    console.log("Chart Data:", data);


    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={<CustomTooltip />} /> {/* Corrected usage */}
                    <Bar
                        dataKey="amount"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`${entry.category}-${index}`} fill={getBarColor(index)} />

                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
