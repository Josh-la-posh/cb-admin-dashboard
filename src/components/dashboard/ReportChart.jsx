import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

const ReportChart = ({ barData, pieData }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                <div className="w-full flex items-center justify-center">
                    <BarChart
                        width={400}
                        height={300}
                        data={barData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#4CAF50" />
                    </BarChart>
                </div>
            </div>

            <div className="flex-1 bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Payment Distribution</h3>
                <div className="w-full flex items-center justify-center">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
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
