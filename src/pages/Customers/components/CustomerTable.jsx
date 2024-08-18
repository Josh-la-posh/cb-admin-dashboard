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
    },
];

const CustomerTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://merchant-api.codebytesltd.com/api/customers', {
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
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
            <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} />
        </div>
    );
};

export default CustomerTable;
