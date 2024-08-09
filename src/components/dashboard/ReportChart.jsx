import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

const barChartData = [
    { name: 'January', value: 4000 },
    { name: 'February', value: 3000 },
    { name: 'March', value: 2000 },
    { name: 'April', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'June', value: 2390 },
    { name: 'July', value: 3490 },
];

const pieChartData = [
    { name: 'Successful Payments', value: 1200, color: '#4CAF50' },
    { name: 'Failed Payments', value: 34, color: '#F44336' },
    { name: 'Pending Payments', value: 150, color: '#FFC107' },
    { name: 'Other', value: 50, color: '#3F51B5' },
];

const COLORS = pieChartData.map(item => item.color);

const ReportChart = ({ barData = barChartData, pieData = pieChartData }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                <div className="w-full">
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
                <div className="w-full">
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
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
