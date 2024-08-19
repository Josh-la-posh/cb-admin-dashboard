// src/components/ProfileForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfileComplete } from '../complianceSlice';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tradingName: '',
    description: '',
    staffSize: '1-5',
    salesVolume: '',
    industry: 'Digital services',
    category: 'Web development and programming',
    businessType: 'Starter Business',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setProfileComplete());
    navigate('/compliance/contact');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Trading Name</label>
        <input
          type="text"
          name="tradingName"
          value={formData.tradingName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Staff Size</label>
        <select
          name="staffSize"
          value={formData.staffSize}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
        >
          <option>1-5</option>
          <option>6-10</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Annual Projected Sales Volume</label>
        <input
          type="text"
          name="salesVolume"
          value={formData.salesVolume}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Business Type</label>
        <input
          type="text"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  );
};

export default ProfileForm;
