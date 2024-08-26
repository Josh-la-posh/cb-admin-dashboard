import React, { useEffect, useState } from 'react';
import ReportChart from '../../components/dashboard/ReportChart';
import Spinner from '../../components/Spinner'; // Import the Spinner component
import { AxiosPrivate } from '../../api/axios';
import DashboardCards from './components/DashboardCards';
import DashboardTable from './components/DashboardTable';
import { useDispatch, useSelector } from 'react-redux';
import { transactionData } from '../../redux/transactionSlice';
import { faFolderOpen, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DASHBOARD_URL = '/api/dashboard';
const TRANSACTION_URL = '/api/transaction';

const Dashboard = () => {
  const axiosPrivate = AxiosPrivate();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction);
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactionGraph, setTransactionGraph] = useState(null);
  const [transactionLumpsum, setTransactionLumpsum] = useState(null);
  const [interval, setInterval] = useState('Daily');
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
  const storedUserData = localStorage.getItem('userData');
  const userData = storedUserData ? JSON.parse(storedUserData) : '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      const token = localStorage.getItem("accessToken");

      try {
        // fetch wallet balance
        const walletResponse = await axiosPrivate.get(`${DASHBOARD_URL}/${merchantData.merchantCode}`)
        const walletBalance = walletResponse.data.data[0];
        setWalletBalance(walletBalance);


        // fetch transaction graph data
        const graphData = await axiosPrivate.get(`${DASHBOARD_URL}/tnx/graph/${merchantData.merchantCode}?interval=${interval}`)
        const data = graphData.data.data;
        setTransactionGraph(data);

        // fetch transaction lumpsum
        const transactionLumpsum = await axiosPrivate.get(`${DASHBOARD_URL}/tnx/lumpsum/${merchantData.merchantCode}?interval=${interval}`)
        const lumpsum = transactionLumpsum.data.data;
        setTransactionLumpsum(lumpsum);

        // fetch transaction data

        const response = await axiosPrivate.get(`${TRANSACTION_URL}/${merchantData.merchantCode}`)
  
        const transactionResponse = await response.data.responseData;
        console.log(response.data.responseData)
        dispatch(transactionData(response.data.responseData));

      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.log(JSON.stringify('Error fetching data ' + JSON.stringify(err)));
      } finally {
        setLoading(false);
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

  const COLORS = ["#4CAF50", "#F44336", "#FFC107", "#FF9800", "#3F51B5", "#9E9E9E"];

  // // Calculate total revenue from successful transactions
  // const totalRevenue = transactionLumpsum
  //   .filter(transaction => transaction.transactionStatus === "Successful")
  //   .reduce((sum, transaction) => sum + transaction.transactionVolume, 0);


  // const barData = transactionGraph.map(item => ({
  //   name: item.key,
  //   value: item.value.reduce((total, current) => total + current.transactionVolume, 0),
  // }));

  // const pieData = transactionLumpsum.map((item, index) => ({
  //   name: item.transactionStatus,
  //   value: item.transactionVolume,
  //   color: COLORS[index % COLORS.length],
  // }));

  // Ensure that the data exists before trying to reduce over it
  const totalRevenue = transactionLumpsum && Array.isArray(transactionLumpsum)
    ? transactionLumpsum
      .filter(transaction => transaction.TransactionStatus === "Successful")
      .reduce((sum, transaction) => sum + transaction.TransactionVolume, 0)
    : 0;

  // Safely map the data, ensuring that `transactionGraph` is defined and has a value array
  const barData = transactionGraph && Array.isArray(transactionGraph)
    ? transactionGraph.map(item => ({
      name: item.key,
      value: item.value && Array.isArray(item.value)
        ? item.value.reduce((total, current) => total + current.TransactionVolume, 0)
        : 0,
    }))
    : [];

  // Safely map the `transactionLumpsum` data
  const pieData = transactionLumpsum && Array.isArray(transactionLumpsum)
    ? transactionLumpsum.map((item, index) => ({
      name: item.TransactionStatus,
      value: item.TransactionVolume,
      color: COLORS[index % COLORS.length],
    }))
    : [];


  return (
    <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8">
      <header className="mb-8">
        <div className='flex justify-between align-center'>
          <h1 className="text-[18px] text-[#101928] font-semibold text-gray-800">Welcome back, {userData.firstName}</h1>
          <p className='text-[14px] font-semibold text-red-500'>Test Environment</p>
        </div>
        <p className="text-gray-600 text-sm">Overview of your payment gateway performance</p>
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

      {/* dashboard cards */}
      <DashboardCards transactionLumpsum={transactionLumpsum} totalRevenue={totalRevenue} />

      {/* report chart */}

      {transactions.transactions.length === 0
        ? <div className="w-full h-[240px] border border-[#E4E7EC]">
          <div className='p-4 border-b border-[#E4E7EC]'>Overall Revenue</div>
          <div className="flex flex-col items-center justify-center gap-8 mt-8">
            <FontAwesomeIcon icon={faHourglass} size='2x' />
            <p>You have not performed any transaction.</p>
          </div>
        </div>
        : <ReportChart barData={barData} pieData={pieData} date={interval} />}

      {/* <VolumeValueCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <ActivityFeed />
      </div> */}

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="mb-8 text-[20px] text-[#101928] font-[500] text-gray-800">Recent Transactions</h3>
        <DashboardTable />
      </div>
    </div>
  );
};

export default Dashboard;