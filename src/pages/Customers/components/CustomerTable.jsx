import React, { useEffect, useState } from 'react';
import DataTable from '../../../components/tables/tables';

const columns = [
    {
        header: 'First Name',
        accessor: 'customerFirstName',
    },
    {
        header: 'Last Name',
        accessor: 'customerLastName',
    },
    {
        header: 'Email Address',
        accessor: 'customerEmail',
    },
    {
        header: 'Phone Number',
        accessor: 'customerPhoneNumber',
    }
];

const CustomerTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL;
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    // console.log("Merchant", merchantData);

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/customers/${merchantData.merchantCode}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }

                const result = await response.json();
                // console.log("res", result)

                // Check for no customers message
                if (result.message && result.message === "No customers found for this merchant code") {
                    setData([{ customerFirstName: 'No customers found', customerLastName: '', customerEmail: '', customerPhoneNumber: '' }]);
                } else {
                    setData(result);  // Assume result is an array of customers
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto">
            {/* {data.length === 0 ? (
                <div>No customers found.</div>  // Show message when no customers are found
            ) : (
                <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} />
            )} */}
            <div className="container mx-auto">
                <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} />
            </div>
        </div>
    );
};

export default CustomerTable;
