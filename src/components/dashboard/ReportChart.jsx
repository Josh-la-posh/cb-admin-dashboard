import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

const ReportChart = ({ barData, pieData, date }) => {
    return (
        <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex-1 bg-white rounded-lg p-4">
                <h3 className="mb-8 text-[16px] text-[#101928] font-[600] text-gray-800">{date} Revenue</h3>
                <div className="w-full flex flex-grow items-center justify-center">
                    <BarChart
                        width={500}
                        height={400}
                        data={barData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3F51B5" />
                    </BarChart>
                </div>
            </div>

            <div className="bg-white p-4">
                <h3 className="mb-8 text-[16px] text-[#101928] font-[600] text-gray-800">Payment Distribution</h3>
                <div className="w-full flex items-center justify-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieData}
                            cx="40%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <PieTooltip />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default ReportChart;
