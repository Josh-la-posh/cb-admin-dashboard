import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, updateForm } from '../../pages/Merchants/merchantSlice';
import CustomModal from '../../components/Modal';
import { AxiosPrivate } from '../../api/axios';

const MerchantPopUpForm = ({ isModalOpen, closeModal, credentials }) => {
  const axiosPrivate = AxiosPrivate();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.merchant);
  const [token, setToken] = useState('');
  const [integrationKey, setIntegrationKey] = useState(credentials?.integrationKey);  
  const baseUrl = process.env.REACT_APP_API_PAYMENT_BASE_URL
  const clientId = credentials?.clientId
  const clientSecret = credentials?.clientSecret
  const integrationKeyData = credentials?.integrationKey

  useEffect(() => {
    // Fetch access token when the component mounts
    const fetchToken = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/account`, {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId: clientId,
            clientSecret: clientSecret,
          }),
        });
        const data = await response.json();
        if (data.requestSuccessful) {
          setToken(data.responseData.access_token);
          setIntegrationKey(integrationKeyData)
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    const nameParts = name.split('.');
  
    const updateNestedState = (state, parts, newValue) => {
      const key = parts[0];
      if (parts.length === 1) {
        return { ...state, [key]: newValue };
      }
      return {
        ...state,
        [key]: updateNestedState(state[key] || {}, parts.slice(1), newValue),
      };
    };
  
    const updatedFormState = (prevState) =>
      updateNestedState(prevState, nameParts, newValue);
  
    dispatch(updateForm(updatedFormState(formState)));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate('/api/advice',
        JSON.stringify({
          amount: formState.amount,
          currency: formState.currency,
          merchantRef: formState.merchantReference,
          narration: formState.narration,
          callBackUrl: formState.callbackUrl,
          splitCode: formState.splitCode,
          shouldTokenizeCard: formState.shouldTokenizeCard,
          customer: {
            customerId: formState.customer.id,
            customerLastName: formState.customer.lastName,
            customerFirstName: formState.customer.firstName,
            customerEmail: formState.customer.email,
            customerPhoneNumber: formState.customer.phoneNumber,
            customerAddress: formState.customer.address,
            customerCity: formState.customer.city,
            customerStateCode: formState.customer.stateCode,
            customerPostalCode: formState.customer.postalCode,
            customerCountryCode: formState.customer.country,
          },
          integrationKey: integrationKeyData,
          mcc: formState.mccCategory,
          merchantDescriptor: formState.merchantDescriptor,
        }),
      );
      const data = response.data;
      if (data.requestSuccessful) {
        // Open the payment URL in a new tab
        window.open(data.responseData.paymentUrl, '_blank');

        dispatch(resetForm());
        // Close the modal
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <CustomModal handleOpenModal={closeModal} width='max-w-xl'>
      <div className="mb-8">
        <div className='text-[20px] font-[500]'>Create Advice</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='h-[calc(88vh-100px)]'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Amount:</label>
              <input
                type="text"
                name="amount"
                value={formState.amount}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Currency:</label>
              <select
                name="currency"
                value={formState.currency}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              >
                <option value="NGN">NGN</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Merchant Reference:</label>
              <input
                type="text"
                name="merchantReference"
                value={formState.merchantReference}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Callback URL:</label>
              <input
                type="url"
                name="callbackUrl"
                value={formState.callbackUrl}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Split Code:</label>
              <input
                type="text"
                name="splitCode"
                value={formState.splitCode}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer ID:</label>
              <input
                type="text"
                name="customer.id"
                value={formState.customer.id}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer First Name:</label>
              <input
                type="text"
                name="customer.firstName"
                value={formState.customer.firstName}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer Last Name:</label>
              <input
                type="text"
                name="customer.lastName"
                value={formState.customer.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer Email:</label>
              <input
                type="email"
                name="customer.email"
                value={formState.customer.email}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer Phone Number:</label>
              <input
                type="text"
                name="customer.phoneNumber"
                value={formState.customer.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer Address:</label>
              <input
                type="text"
                name="customer.address"
                value={formState.customer.address}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer City:</label>
              <input
                type="text"
                name="customer.city"
                value={formState.customer.city}
                onChange={handleChange}CustomerForm
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer State Code:</label>
              <input
                type="text"
                name="customer.stateCode"
                value={formState.customer.stateCode}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer Postal Code:</label>
              <input
                type="text"
                name="customer.postalCode"
                value={formState.customer.postalCode}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Customer Country:</label>
              <select
                name="customer.country"
                value={formState.customer.country}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              >
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Integration Key:</label>
              <input
                type="text"
                name="integrationKey"
                value={integrationKeyData}
                // onChange={handleChange}
                readOnly
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">MCC Category:</label>
              <input
                type="text"
                name="mccCategory"
                value={formState.mccCategory}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-xs">Merchant Descriptor:</label>
              <input
                type="text"
                name="merchantDescriptor"
                value={formState.merchantDescriptor}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full text-xs py-2 px-2"
              />
            </div>
          </div>
          <div className="my-8 flex items-center justify-between">
            <div className="flex items-center">
              <label className="block text-xs">Should Tokenize Card:</label>
              <input
                type="checkbox"
                name="shouldTokenizeCard"
                checked={formState.shouldTokenizeCard}
                onChange={handleChange}
                className="ml-2"
              />
            </div>
            <div className="col-span-1 text-right">
              <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded">
                {/* <a href='https://www.payment.codebytesltd.com'> */}
                  Submit
                {/* </a> */}
              </button>
            </div>

          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default MerchantPopUpForm;