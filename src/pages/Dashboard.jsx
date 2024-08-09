import React from 'react';
import Card from '../components/dashboard/Card';
import TransactionTable from '../components/dashboard/Transaction';
import RevenueChart from '../components/dashboard/RevenueChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import VolumeValueCards from '../components/dashboard/VolumeValueCards';
import ReportChart from '../components/dashboard/ReportChart';

const Dashboard = () => {
  const barData = [
    { name: 'January', value: 4000 },
    { name: 'February', value: 3000 },
    { name: 'March', value: 2000 },
    { name: 'April', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'June', value: 2390 },
    { name: 'July', value: 3490 },
  ];

  const pieData = [
    { name: 'Successful Payments', value: 1200, color: '#4CAF50' },
    { name: 'Failed Payments', value: 34, color: '#F44336' },
    { name: 'Pending Payments', value: 150, color: '#FFC107' },
    { name: 'Other', value: 50, color: '#3F51B5' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Merchant Dashboard</h1>
        <p className="text-gray-600">Overview of your payment gateway performance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Revenue" value="₦12,345" color="bg-green-500" />
        <Card title="Total Transactions" value="1,234" color="bg-blue-500" />
        <Card title="Successful Payments" value="1,200" color="bg-indigo-500" />
        <Card title="Failed Payments" value="34" color="bg-red-500" />
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Report</h2>
        <ReportChart barData={barData} pieData={pieData} />
      </div>

      <VolumeValueCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <ActivityFeed />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Dashboard;
