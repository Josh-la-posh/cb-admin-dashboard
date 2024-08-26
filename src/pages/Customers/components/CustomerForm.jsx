import React, { useState } from 'react';
import CustomModal from '../../../components/Modal';
import { AxiosPrivate } from '../../../api/axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { customerData } from '../../../redux/customerSlice';
import { v4 as uuidv4 } from 'uuid';


const CUSTOMER_URL = '/api/customers';
const ADD_CUSTOMER_URL ='/api/customers/add';

function AddCustomer({ handleOpenModal }) {
  const axiosPrivate = AxiosPrivate();
  const dispatch = useDispatch();
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
  const [formData, setFormData] = useState({
    merchantCode: merchantData.merchantCode,
    customerId: uuidv4(),
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    status: true, // Default to active
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
    // Submit your form data to the backend or handle it as needed

    try {
      const request = await axiosPrivate.post(ADD_CUSTOMER_URL,
        JSON.stringify(formData)
      );

      toast.success("Customer added successfully");

      if (request.data.requestSuccessful) {
        const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`);
        const result = response.data.responseData;
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
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerFirstName">
            First Name
          </label>
          <input
            type="text"
            id="customerFirstName"
            name="customerFirstName"
            placeholder="Enter first name"
            value={formData.customerFirstName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerLastName">
            Last Name
          </label>
          <input
            type="text"
            id="customerLastName"
            name="customerLastName"
            placeholder="Enter last name"
            value={formData.customerLastName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="cuatomerEmail">
            Email
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            placeholder="Enter email address"
            value={formData.customerEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerPhoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="customerPhoneNumber"
            name="customerPhoneNumber"
            placeholder="Enter customer's phone number"
            value={formData.customerPhoneNumber}
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
