import React, { useEffect, useState } from 'react';
import Card from '../../components/dashboard/Card';
import CustomerCards from './components/CustomerCards';
import CustomerTable from './components/CustomerTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AxiosPrivate } from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { customerData } from '../../redux/customerSlice';
import CustomerForm from './components/CustomerForm';

const CUSTOMER_URL = '/api/customers';

function Customers() {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const customer = useSelector((state) => state.customer);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;

  const handleAddOpenModal = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditOpenModal = (val, name) => {
    setModalMode(name);
    setSelectedCustomerData(val);
    setIsModalOpen(true);
    console.log(val)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomerData(null);
  };

    useEffect(() => {
        const fetchData = async () => {
            if (customer.customers.length === 0) {
                try {
                    const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`)
                    const result = response.data;
                    console.log('Let fetch it ' + JSON.stringify(result.message))
                    
                    if (result.message && result.message === "No customers found for this merchant code") {
                        customerData({
                            customerFirstName: 'No customers found',
                             customerLastName: '',
                              customerEmail: '',
                               customerPhoneNumber: ''
                        });
                    } else {
                        dispatch(customerData(result.responseData));
                    }
                } catch (error) {
                    if (!error.response) {
                        setError('No Server Response.');
                    } else {
                        setError(error.message);
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8 sm:p-4 md:p-8'>
            <div className="flex justify-between md:items-center gap-4">
                <header className="">
                    <h1 className="text-[22px] md:text-[28px] text-[#101928] font-semibold text-gray-800">Customer</h1>
                </header>
                <div className="flex flex-row items-start md:items-center gap-4">
                    <button 
                        onClick={() => setIsExportPopupOpen(true)}
                        className='flex flex-1 shrink flex-row items-center justify-center gap-[10px] border border-[#DDD5DD] rounded-[8px] px-[12px] py-[8px] text-[12px] sm:text-sm font-600 text-[#344054]'
                    >
                        <FontAwesomeIcon icon={faCloudArrowUp} style={{color: 'black'}}/>
                        <span>Export</span>
                    </button>
                    <button onClick={handleAddOpenModal} className='flex flex-1 sm:flex-[unset] items-center justify-center rounded-[8px] gap-[10px] px-[12px] py-[8px] text-white text-[12px] sm:text-sm font-[600] bg-priColor'>
                        <FontAwesomeIcon icon={faAdd}/>
                        <span>Add</span>
                    </button>
                    {isModalOpen &&
                        (<CustomerForm
                            handleOpenModal={handleCloseModal}
                            selectedCustomerData={modalMode === 'add' ? null : selectedCustomerData}
                            title={modalMode === 'add' ? 'Add' : modalMode === 'edit' ? 'Edit' : 'View'}
                        />
                    )}
                </div>
            </div>

            {/* <CustomerCards /> */}

            {/* <div className="mt-12">
                <div className="">
                    <div className="mb-4 lg:mb-0">
                        <h3 className="text-[16px] md:text-[20px] font-[600] text-[#101928]">Add Customers</h3>
                        <p className="text-xs sm:text-sm font-[400] text-[#475367]">Add Customers to your database</p>
                    </div>
                </div>
            </div> */}

            <CustomerTable isExportPopupOpen={isExportPopupOpen} setIsExportPopupOpen={setIsExportPopupOpen} handleOpenModal={handleEditOpenModal} customerData={customer.customers} />


        </div>
    )
}

export default Customers