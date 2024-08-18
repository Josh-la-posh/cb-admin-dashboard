import React, { useEffect, useState } from 'react';
import Card from '../components/dashboard/Card';
import TransactionTable from '../components/dashboard/Transaction';
import ReportChart from '../components/dashboard/ReportChart';
import Spinner from '../components/Spinner'; // Import the Spinner component

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactionGraph, setTransactionGraph] = useState(null);
  const [transactionLumpsum, setTransactionLumpsum] = useState(null);
  const [interval, setInterval] = useState('Daily');
  const [loading, setLoading] = useState(true); // Add loading state

  // const tokenValue = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkU4NzcxNTMxMzU1MTRGMjhCN0M5NDE1NjY1N0REOEFCRURDODI4M0VSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjZIY1ZNVFZSVHlpM3lVRldaWDNZcS0zSUtENCJ9.eyJuYmYiOjE3MjM3MjA2MDEsImV4cCI6MTcyMzcyNDIwMSwiaXNzIjoiaHR0cDovLzE3OC42Mi4xMTYuMjMzIiwiYXVkIjpbIm1lcmNoYW50YXBpIiwiaHR0cDovLzE3OC42Mi4xMTYuMjMzL3Jlc291cmNlcyJdLCJjbGllbnRfaWQiOiJtZXJjaGFudGFwaSIsInN1YiI6IjEyY2NlYmZhLTQ2MzQtNDA5Ni1hMjllLTUzZjc3MDU2ZWM4OCIsImF1dGhfdGltZSI6MTcyMzcyMDYwMSwiaWRwIjoibG9jYWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJvZm9sYXJpbkBjaGFtc3N3aXRjaC5jb20iLCJuYW1lIjoiRm9sYXJpbiBPbHV3YWRlbWlsYWRlIiwiZ2l2ZW5fbmFtZSI6IkRlbWlsYWRlIiwiZmFtaWx5X25hbWUiOiJGb2xhcmluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib2ZvbGFyaW5AY2hhbXNzd2l0Y2guY29tIiwiZW1haWwiOiJvZm9sYXJpbkBjaGFtc3N3aXRjaC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwianRpIjoiNjRGNDJEM0Y4ODk5QTBBQ0Y0Q0JEODkzNDRGQzQwOTkiLCJpYXQiOjE3MjM3MjA2MDEsInNjb3BlIjpbIm1lcmNoYW50YXBpIl0sImFtciI6WyJwd2QiXX0.CeHVwQ0tH_DbQ2QQCitqqIoAZUKUgs2R2VUd6U_Gyim9OLu0e_AGmFV-VT6vs7zCk1-GXyP6wtL1SbXX-XuDgYyEUKkGyxEs_lMYJrDTmAOyw-JPgjkFq-qpfbO8FlAK300ILhWhMNRnTpxsLglFpc4TPz2sxUOLQeDf6OtqkQoo4jAp7GtYaC4ZYwlECJ-0tU_h4aHVAZ6-JUuDxsxjlDNCJTe9VjyyViKXXvX3oGZ-wetGkJX-TwrS2I-9qnxtvuC-sorvI8XivixrHyD6Godyd4YcRKKE4GrRDQ66ArwZLWaDPbkan9xnLSdDGOVgQIp-PMESFSMQx4yMrft2Og"; // Replace with your token
  // const token = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      const token = localStorage.getItem("accessTokenDemo");
      // const token = tokenValue;

      // console.log("token", token)

      try {
        // Fetch wallet balance
        const walletResponse = await fetch('https://merchant-api.pelpay.ng/api/Dashboard/tes0000449', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const walletData = await walletResponse.json();
        setWalletBalance(walletData.responseData[0]);

        // Fetch transaction graph data
        const graphResponse = await fetch(`https://merchant-api.pelpay.ng/api/Dashboard/tnx/graph/tes0000449?interval=${interval}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const graphData = await graphResponse.json();
        setTransactionGraph(graphData.responseData);

        // Fetch transaction lumpsum data
        const lumpsumResponse = await fetch(`https://merchant-api.pelpay.ng/api/Dashboard/tnx/lumpsum/tes0000449?interval=${interval}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const lumpsumData = await lumpsumResponse.json();
        setTransactionLumpsum(lumpsumData.responseData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [interval]);

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  // Calculate total revenue from successful transactions
  const totalRevenue = transactionLumpsum
    .filter(transaction => transaction.transactionStatus === "Successful")
    .reduce((sum, transaction) => sum + transaction.transactionVolume, 0);

  const COLORS = ["#4CAF50", "#F44336", "#FFC107", "#FF9800", "#3F51B5", "#9E9E9E"];

  const barData = transactionGraph.map(item => ({
    name: item.key,
    value: item.value.reduce((total, current) => total + current.transactionVolume, 0),
  }));

  const pieData = transactionLumpsum.map((item, index) => ({
    name: item.transactionStatus,
    value: item.transactionVolume,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8">
      <header className="mb-8">
        <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800">Welcome back, Demi</h1>
        <p className="text-gray-600">Overview of your payment gateway performance</p>
        <div className="mt-8">
          <label htmlFor="interval" className="mr-2 text-sm">Select Interval:</label>
          <select id="interval" value={interval} onChange={handleIntervalChange} className="p-2 border rounded bg-white">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card title="Total Revenue" value={`₦${totalRevenue}`} color="bg-green-500" />
        <Card title="Total Transactions" value={transactionLumpsum.reduce((total, current) => total + current.transactionCount, 0)} color="bg-blue-500" />
        <Card title="Successful Payments" value={transactionLumpsum.find(item => item.transactionStatus === "Successful").transactionCount} color="bg-indigo-500" />
        <Card title="Failed Payments" value={transactionLumpsum.find(item => item.transactionStatus === "Failed").transactionCount} color="bg-red-500" />
      </div>

      <div className="bg-white rounded-lg mb-8 p-[16px] rounded-[8px] border border-[#E4E7EC]">
        <ReportChart barData={barData} pieData={pieData} date={interval}/>
      </div>
{/* 
      <VolumeValueCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <ActivityFeed />
      </div> */}

      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="mb-8 text-[20px] text-[#101928] font-[500] text-gray-800">Recent Transactions</h3>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Dashboard;
