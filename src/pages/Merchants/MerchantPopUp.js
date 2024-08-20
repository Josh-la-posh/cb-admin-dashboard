import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../../pages/Merchants/merchantSlice';

const MerchantPopUpForm = ({ isModalOpen, closeModal, credentials }) => {
  console.log("creddd", credentials)
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

    const nameParts = name.split('.');

    const updatedFormState = nameParts.reduceRight((acc, part, index) => {
      return index === nameParts.length - 1
        ? { [part]: type === 'checkbox' ? checked : value }
        : { [part]: acc };
    }, {});

    dispatch(updateForm(updatedFormState));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/advice`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
      });
      const data = await response.json();
      if (data.requestSuccessful) {
        // Open the payment URL in a new tab
        window.open(data.responseData.paymentUrl, '_blank');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="max-h-screen fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full h-[95%] overflow-auto">
      <div className='flex justify-between border-b pb-5 mb-5'>
        <p>Create Advice</p>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
        <form onSubmit={handleSubmit}>
          <div className='h-[calc(88vh-100px)] flex flex-col justify-between'>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={formState.amount}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Currency:</label>
                <select
                  name="currency"
                  value={formState.currency}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                >
                  <option value="NGN">NGN</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Merchant Reference:</label>
                <input
                  type="text"
                  name="merchantReference"
                  value={formState.merchantReference}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Callback URL:</label>
                <input
                  type="url"
                  name="callbackUrl"
                  value={formState.callbackUrl}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Split Code:</label>
                <input
                  type="text"
                  name="splitCode"
                  value={formState.splitCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer ID:</label>
                <input
                  type="text"
                  name="customer.id"
                  value={formState.customer.id}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer First Name:</label>
                <input
                  type="text"
                  name="customer.firstName"
                  value={formState.customer.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer Last Name:</label>
                <input
                  type="text"
                  name="customer.lastName"
                  value={formState.customer.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer Email:</label>
                <input
                  type="email"
                  name="customer.email"
                  value={formState.customer.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer Phone Number:</label>
                <input
                  type="text"
                  name="customer.phoneNumber"
                  value={formState.customer.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer Address:</label>
                <input
                  type="text"
                  name="customer.address"
                  value={formState.customer.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer City:</label>
                <input
                  type="text"
                  name="customer.city"
                  value={formState.customer.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer State Code:</label>
                <input
                  type="text"
                  name="customer.stateCode"
                  value={formState.customer.stateCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer Postal Code:</label>
                <input
                  type="text"
                  name="customer.postalCode"
                  value={formState.customer.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Customer Country:</label>
                <select
                  name="customer.country"
                  value={formState.customer.country}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                >
                  <option value="Nigeria">Nigeria</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Integration Key:</label>
                <input
                  type="text"
                  name="integrationKey"
                  value={integrationKeyData}
                  // onChange={handleChange}
                  readOnly
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">MCC Category:</label>
                <input
                  type="text"
                  name="mccCategory"
                  value={formState.mccCategory}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-[14px]">Merchant Descriptor:</label>
                <input
                  type="text"
                  name="merchantDescriptor"
                  value={formState.merchantDescriptor}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label className="block text-[14px]">Should Tokenize Card:</label>
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
      </div>
    </div>
  );
};

export default MerchantPopUpForm;