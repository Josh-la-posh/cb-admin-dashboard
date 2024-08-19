import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAccountComplete } from '../complianceSlice';

const OwnerForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: 'Nigeria',
        idDocument: 'Voter\'s Card',
        idNumber: '',
        fileUpload: null,
        sameAsBusinessAddress: false,
        proofOfAddress: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleCheckboxChange = () => {
        setFormData({ ...formData, sameAsBusinessAddress: !formData.sameAsBusinessAddress });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setAccountComplete());
        navigate('/compliance/account');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label>Name*</label>
                <div className="flex gap-3">
                    <input type="text" className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    <input type="text" className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
            </div>
            <div className='mb-4'>
                <label>Date of Birth*</label>
                <input type="date" className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
            </div>
            <div className='mb-4'>
                <label>Nationality*</label>
                <br />
                <select className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="nationality" value={formData.nationality} onChange={handleInputChange}>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className='mb-4'>
                <label>Identification Document*</label>
                <br />
                <select className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="idDocument" value={formData.idDocument} onChange={handleInputChange}>
                    <option value="Voter's Card">Voter's Card</option>
                    <option value="passport">Passport</option>
                </select>
            </div>
            <div className='mb-4'>
                <label>Voter's ID Number*</label>
                <br />
                <input className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} required />
            </div>
            <div className='mb-4'>
                <label>Upload a copy of your Voter's card</label>
                <input className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' type="file" name="fileUpload" onChange={handleFileUpload} />
            </div>
            <div className='mb-4'>
                <label>Home Address</label>
                <br />
                <div className="flex items-center gap-2 my-2">
                    <input type="checkbox" name="sameAsBusinessAddress" checked={formData.sameAsBusinessAddress} onChange={handleCheckboxChange} />
                    <label className='text-sm'>Same as business address</label>
                </div>
            </div>
            <div className='mb-4'>
                <label>Proof of address*</label>
                <br />
                <input className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' type="file" name="proofOfAddress" onChange={handleFileUpload} required />
            </div>
            <button type="submit" className='mt-4 bg-green-500 text-white py-2 px-4 rounded'>
                Save
            </button>
        </form>
    );
};

export default OwnerForm;
