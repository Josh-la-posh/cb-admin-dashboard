import React, { useEffect, useState } from 'react';
import DataTable from '../../../components/tables/tables';

const columns = [
    {
        header: 'Bank Name',
        accessor: 'bankName',
    },
    {
        header: 'Account Name',
        accessor: 'accountName',
    },
    {
        header: 'Account Number',
        accessor: 'accountNumber',
    },
    // {
    //     header: 'Status',
    //     accessor: 'status',
    //     render: (value) => (
    //         <span className={`text-${value === 'Completed' ? 'green' : value === 'Pending' ? 'orange' : 'red'}-600`}>
    //             {value}
    //         </span>
    //     ),
    // },
    {
        header: 'Status',
        accessor: 'status',
        render: (value) => (
            <span className={`text-${value ? 'green' : 'red'}-600`}>
                {value ? 'Completed' : 'Pending'}
            </span>
        ),
    },
];

// const data = [
//     { bankName: 'GTB', accountNumber: '12357654333', accountName: 'Payment from John Doe', status: 'Completed' },
// ];

const BankAccountTable = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem("accessToken");
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL;
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantDetails = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/merchant-document/${merchantDetails?.aggregatorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("in-data", result);

                    // Set data to the fetched responseData if available, otherwise leave it as an empty array
                    const fetchedData = result.responseData.length > 0
                        ? result.responseData
                        : [];

                    setData(fetchedData);
                } else {
                    console.error("Error fetching merchant data", response.statusText);
                    setData([]); // Leave the table empty if there is an error
                }
            } catch (error) {
                console.error("Error fetching merchant data", error);
                setData([]); // Leave the table empty if there is an error
            }
        };

        if (merchantDetails) {
            fetchMerchantData();
        }
    }, [token, merchantDetails, baseUrl]);

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} display='true' placeholder='Search...' />
        </div>
    );
};

export default BankAccountTable;