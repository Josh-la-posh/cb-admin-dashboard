import React, { useState } from 'react';
import DataTable from '../../../components/tables/tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDownload, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

// const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
// };

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

// const formatDateTime = (dateString) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
//     const date = new Date(dateString);
//     return date.toLocaleString(undefined, options);
// };


const columns = [
    {
        header: 'Customer Name',
        accessor: 'customerName',
        render: (value) => (
            <span className='font-medimu text-gray-900'>
                {value}
            </span>
        ),
    },
    {
        header: 'Transaction ID',
        accessor: 'paymentReference',
    },
    {
        header: 'Date Added',
        accessor: 'paymentDate',
        render: (value) => (
            <span className='text-gray-700'>
                {formatDate(value)}
            </span>
        ),
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: 'Payment Channel',
        accessor: 'paymentChannel',
    },
    {
        header: 'Message',
        accessor: 'message',
    },
    {
        header: 'Status',
        accessor: 'transactionStatus',
        render: (value) => (
            <span className={`${value === 'Successful' ? 'text-green-600' : value === 'Failed' ? 'text-red-600' : 'text-orange-400'}`}>
                {value}
            </span>
        ),
    },
];

const TransactionTable = ({ transactions, handleOpenModal }) => {

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const getDataToParent = (id) => {
        handleOpenModal(filteredData[id])
    }


    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const filteredData = transactions.filter((row) => {
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

    return (
        <div className="">
            <div className="my-3 py-3 flex flex-row-reverse items-center justify-between border-y border-[#F0F2F5] text-xs lg:text-sm">
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Search transactions..."
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400"
                    />
                </div>
                <button className='flex items-center justify-center gap-[10px] border border-[#DDD5DD] rounded-[8px] px-[12px] py-[8px] text-sm font-600 text-[#344054]'>
                    <FontAwesomeIcon icon={faArrowDownWideShort} style={{ color: 'black' }} />
                    <span>Filter</span>
                </button>
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
                                <button onClick={() => getDataToParent(selectedIndex)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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

export default TransactionTable;