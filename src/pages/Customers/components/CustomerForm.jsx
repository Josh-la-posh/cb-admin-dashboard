import React, { useState, useEffect } from 'react';
import CustomModal from '../../../components/Modal';
import { AxiosPrivate } from '../../../api/axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { customerData } from '../../../redux/customerSlice';
import ToggleSwitch from '../../../components/toggleSwitch/ToggleSwitch';
import Spinner from '../../../components/Spinner';


const CUSTOMER_URL = '/api/customers';
const ADD_CUSTOMER_URL ='/add';
const UPDATE_CUSTOMER_URL ='/edit';

function CustomerForm({ handleOpenModal, selectedCustomerData, title }) {
  const axiosPrivate = AxiosPrivate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    status: true,
  });

  useEffect(() => {
    if (selectedCustomerData) {
      setFormData({
        firstName: selectedCustomerData.customerFirstName || '',
        lastName: selectedCustomerData.customerLastName || '',
        email: selectedCustomerData.customerEmail || '',
        phone: selectedCustomerData.customerPhoneNumber || '',
        address: selectedCustomerData.customerAddress || '',
        city: selectedCustomerData.customerCity || '',
        country: selectedCustomerData.customerCountryCode || '',
        postalCode: selectedCustomerData.customerPostalCode || '',
        status: selectedCustomerData.customerStatus || true,
      });
    }
  }, [selectedCustomerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = () => {
    setFormData({
      ...formData,
      status: title === 'View' ? formData.status : formData.status === false ? true : false,
    });
    console.log(formData.status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedCustomerData) {
        // Update existing customer
        const updateRequest = await axiosPrivate.put(`${CUSTOMER_URL}/${UPDATE_CUSTOMER_URL}/${selectedCustomerData._id}`, JSON.stringify(formData));
        if (updateRequest.status === 200) {
          const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`);
          const result = response.data.responseData;
          dispatch(customerData(result));
          setLoading(false);
          toast.success('Customer updated successfully');
          handleOpenModal();
        }
      } else {
        // Add new customer
        const addRequest = await axiosPrivate.post(`${CUSTOMER_URL}/${ADD_CUSTOMER_URL}`, JSON.stringify(formData));
        if (addRequest.status === 200) {
          const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`);
          const result = response.data.responseData;
          dispatch(customerData(result));
          setLoading(false);
          toast.success('Customer added successfully');
          handleOpenModal();
        }
      }
    } catch (err) {
      if (!err.response) {
        toast.error('No Server Response')
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />

  return (
    <CustomModal handleOpenModal={handleOpenModal}>
      <div className="mb-8">
        <div className='text-[20px] font-[500]'>{title === 'View' ? 'Customer Details' : `${title} Customer`}</div>
        {title !== 'View' && <div className='text-[14px] font-[400] text-[#475367]'>Kindly {title.toLowerCase()} all the customer’s details</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4 flex gap-4">

          <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
            />
          </div>
          <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled={title === 'View' ? true : false}
            />
          </div>
        </div>
        <div className="mb-4 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="code">
              Postal Code
            </label>
            <input
              type={title === 'View' ? 'text' : 'number'}
              id="code"
              name="code"
              placeholder="Enter Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled={title === 'View' ? true : false}
            />
          </div>
          <div className="flex-1 flex items-center gap-8 mb-2">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="status">
              Status
            </label>
            <ToggleSwitch handleToggle={handleToggle} isOn={formData.status === true ? true : false}/>
            {/* <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleToggle}
              className="w-full px-3 py-2 bg-white text-sm border border-gray rounded-lg focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select> */}
          </div>
        </div>
        {title !== 'View' && <div className="flex justify-between mt-10">
          <button
            type="button"
            className="border border-[#D9D9D9] rounded-[8px] text-sm text-[#787070] p-2"
            onClick={() => handleOpenModal(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-priColor text-sm text-white p-2 rounded-lg"
          >
            {title === 'Add' ? 'Add Customer' : 'Save Changes'}
          </button>
        </div>}
      </form>
    </CustomModal>
  );
}

export default CustomerForm;
