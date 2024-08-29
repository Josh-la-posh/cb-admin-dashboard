import React, { useEffect, useState } from 'react';
import ExportPopup from '../../../components/HelperFunctions/exportPopup';
import DataTable from '../../../components/tables/tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../../../components/HelperFunctions/dateFormatter';
import CustomModal from '../../../components/Modal';
import { AxiosPrivate } from '../../../api/axios';
import { toast } from 'react-toastify';

const CREATE_DISPUTE_URL = '/api/disputes';

const TransactionTable = ({transactions, handleOpenModal, isExportPopupOpen, setIsExportPopupOpen}) => {
    const axiosPrivate = AxiosPrivate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isDispute, setIsDispute] = useState(false);
    const [description, setDescription] = useState('');
    const [paymentReference, setPaymentReference] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
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
                <span>
                    {dateFormatter(value)}
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
            header: 'Status',
            accessor: 'transactionStatus',
            render: (value) => (
                <span className={`${value === 'Successful' ? 'text-green-600' : value === 'Failed' ? 'text-red-600' : 'text-orange-400'}`}>
                    {value}
                </span>
            ),
        },
        {
            header: 'Action',
            accessor: 'transactionStatus',
            render: (id, row) => (
                row.transactionStatus !== 'Successful' && 
                <button
                    onClick={() => handleDispute(row)}
                    className='bg-red-700 text-white text-xs px-2 py-1 rounded-[4px]'
                >
                    Dispute
                </button>
            ),
        },
    ];

    const submitDispute = async (e) => {
        e.preventDefault();
        setLoading(true);


        try {
            const response = await axiosPrivate.post(CREATE_DISPUTE_URL,
                JSON.stringify({paymentReference, description})
            );
            console.log(response);
            const data = response.status;
            if (data === 201) {
                toast('Sent Successfully');
                setPaymentReference('');
                setIsDispute(false);
            }
        } catch (err) {
            if (!err.status) {
             setErrMsg('No Server Response');   
            } else {
                setErrMsg('Unable to send request at this time.')
            }
        } finally {
            setLoading(false);
        }

    }

    const handleDispute = (id) => {
        setPaymentReference(id.paymentReference);
        setIsDispute(true);
        // console.log('Dispute ID:', id);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const getDataToParent = (id) => {
        handleOpenModal(filteredData[id]);
    }
    
    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const filteredData = transactions.filter((row) => {
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
                <button 
                    className='flex items-center justify-center gap-[10px] border border-[#DDD5DD] rounded-[8px] px-[12px] py-[8px] text-sm font-600 text-[#344054]'
                >
                    <FontAwesomeIcon icon={faArrowDownWideShort} style={{color: 'black'}}/>
                    <span>Filter</span>
                </button>
            </div>
            {
                isDispute &&
                <CustomModal
                    handleOpenModal={() => setIsDispute(false)}
                >
                    <h2 className='mb-8'>Description</h2>
                    {errMsg && <p>{errMsg}</p>}
                    <textarea
                        className='border w-full h-[200px] max-x-[500px] text-sm p-3'
                        placeholder='Write something ...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={submitDispute}
                            className='py-2 px-4 bg-priColor text-white rounded-[8px]'
                            disabled={loading}
                        >
                                {loading ? 'Sending...' : 'Submit'}
                            </button>
                    </div>

                </CustomModal>
            }

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={true}
                elementId='transactionTable'
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
            <ExportPopup
                isOpen={isExportPopupOpen}
                onClose={() => setIsExportPopupOpen(false)}
                data={filteredData}
                elementId='transactionTable'
            />
        </div>
    );
};

export default TransactionTable;