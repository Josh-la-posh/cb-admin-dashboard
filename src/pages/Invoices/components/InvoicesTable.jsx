import React, { useState } from 'react';
import DataTable from '../../../components/tables/tables';
import { AxiosPrivate } from '../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDownload, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

const INVOICE_URL = '/api/invoices';


const columns = [
    {
        header: 'Account Name',
        accessor: 'merchant',
        render: (value) => (
            <span className='font-medimu text-gray-900'>
                {value}
            </span>
        ),
    },
    {
        header: 'Invoice ID',
        accessor: 'merchant',
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: 'Date',
        accessor: 'date',
    },
    {
        header: 'Status',
        accessor: 'status',
        render: (value) => (
            <span className={`text-${value === 'Completed' ? 'green' : value === 'Failed' ? 'red' : 'orange'}-600`}>
                {value}
            </span>
        ),
    },
];

const data = [
    { date: '2024-08-01', merchant: 'John Doe Store', description: 'Payment from John Doe', amount: '₦12,345', paymentChannel: 'Card', status: 'Completed' },
    { date: '2024-08-02', merchant: 'Jane Smith Boutique', description: 'Payment from Jane Smith', amount: '₦8,900', paymentChannel: 'Virtual Account', status: 'Pending' },
    { date: '2024-08-03', merchant: 'Acme Corporation', description: 'Payment from Acme Corp.', amount: '₦25,000', paymentChannel: 'USSD', status: 'Failed' },
    { date: '2024-08-04', merchant: 'XYZ Limited', description: 'Payment from XYZ Ltd.', amount: '₦15,000', paymentChannel: 'Bank Account', status: 'Completed' },
    { date: '2024-08-05', merchant: 'ABC Inc.', description: 'Payment from ABC Inc.', amount: '₦9,500', paymentChannel: 'Card', status: 'Pending' },
    { date: '2024-08-01', merchant: 'John Doe Store', description: 'Payment from John Doe', amount: '₦12,345', paymentChannel: 'Card', status: 'Completed' },
    { date: '2024-08-02', merchant: 'Jane Smith Boutique', description: 'Payment from Jane Smith', amount: '₦8,900', paymentChannel: 'Virtual Account', status: 'Pending' },
    { date: '2024-08-03', merchant: 'Acme Corporation', description: 'Payment from Acme Corp.', amount: '₦25,000', paymentChannel: 'USSD', status: 'Failed' },
    { date: '2024-08-04', merchant: 'XYZ Limited', description: 'Payment from XYZ Ltd.', amount: '₦15,000', paymentChannel: 'Bank Account', status: 'Completed' },
    { date: '2024-08-05', merchant: 'ABCD Inc.', description: 'Payment from ABC Inc.', amount: '₦9,500', paymentChannel: 'Card', status: 'Pending' },
];



const InvoicesTable = () => {
    const axiosPrivate = AxiosPrivate();
    // const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosPrivate.get(`${TRANSACTION_URL}/${merchantData.merchantCode}`)
    //             const result = response.data;

    //             // if (result.message && result.message === "No customers found for this merchant code") {
    //             //     setData([{ customerFirstName: 'No customers found', customerLastName: '', customerEmail: '', customerPhoneNumber: '' }]);
    //             // } else {
    //             //     setData(result);
    //             // }
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };
    

    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const filteredData = data.filter((row) => {
        // Convert all relevant values to strings and apply the filter
        const rowValues = Object.values(row).map(val => (val || '').toString().toLowerCase());
    
        const matchesSearch = search
            ? rowValues.some(val => val.includes(search.toLowerCase()))
            : true;
    
        const matchesStatus = filterStatus
            ? row.status === filterStatus
            : true;
    
        return matchesSearch && matchesStatus;
    });
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto">
            <div className="my-3 py-3 flex items-center justify-between border-y border-[#F0F2F5] text-xs lg:text-sm">
                <select
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor text-xs lg:text-[13px]"
                >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor"
                        placeholder="Search transactions..."
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={true}
                actionButton={
                    <>
                    {
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10 rounded-[8px] text-xs">
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                View Details
                            </button>
                            {/* <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Change Status
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Delete
                            </button> */}
                        </div>
                    }
                    </>
                }
            />
        </div>
    );
};

export default InvoicesTable;