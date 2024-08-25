import React, { useState } from 'react';
import CustomModal from '../../../components/Modal';
import { AxiosPrivate } from '../../../api/axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { customerData } from '../../../redux/customerSlice';


const CUSTOMER_URL = '/api/customers';
const ADD_CUSTOMER_URL ='/add-customer';

function AddCustomer({ handleOpenModal }) {
  const axiosPrivate = AxiosPrivate();
  const dispatch = useDispatch();
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active', // Default to active
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit your form data to the backend or handle it as needed

    try {
      const request = await axiosPrivate.post(ADD_CUSTOMER_URL,
        JSON.stringify(formData)
      );

      if (request.status === 200) {
        const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`);
        const result = response.data;
        dispatch(customerData(result));
      }
      

    } catch (err) {
      if (!err.response) {
        toast.error('No Server Response')
      } else {
        toast.error('An unexpected error occurred');
      }
    }


  };

  return (
    <CustomModal handleOpenModal={handleOpenModal}>
      <div className="mb-8">
        <div className='text-[20px] font-[500]'>Add Customer</div>
        <div className='text-[14px] font-[400] text-[#475367]'>Kindly add all the customer’s details</div>
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
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
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
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
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
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
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
            placeholder="Enter customer's phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white text-sm border border-gray rounded-lg focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="border border-[#D9D9D9] rounded-[8px] text-sm text-[#787070] p-2"
            onClick={handleOpenModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-priColor text-sm text-white p-2 rounded-lg"
          >
            Add Customer
          </button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AddCustomer;
