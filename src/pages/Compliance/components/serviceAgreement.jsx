import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setserviceAgreementComplete, setComplianceData } from '../../../redux/complianceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AxiosPrivate } from '../../../api/axios';

const COMPLIANCE_DOC_URL = '/api/merchant-document';

const MerchantServiceAgreement = () => {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [slaBoolean, setSlaBoolean] = useState(false);

    const complianceData = useSelector((state) => state.compliance.complianceData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setComplianceData({ [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setSlaBoolean(e.target.checked); // Set slaBoolean to true or false based on checkbox
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!slaBoolean) {
            toast.error("You must agree to the service agreement before saving.");
            return;
        }

        try {
            // Post the updated data using fetch
            const response = await axiosPrivate.post(COMPLIANCE_DOC_URL,
                JSON.stringify({ ...complianceData })
            );
            if (response.status !== 200) {
                throw new Error('Failed to update profile data');
            }
            dispatch(setserviceAgreementComplete());
            toast.success("Service agreement updated successfully"); // Success toast
            navigate('/');
        } catch (error) {
            toast.error("Error updating the service agreement");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='text-[12px]'>
                <h2>Merchant Service Agreement</h2>
                <p>Kindly read through and accept the merchant service agreement.</p>
                <div className="alert alert-warning">
                    Please ensure that the information you provide is correct. DO NOT ACCEPT THIS AGREEMENT IF YOUR DETAILS ARE INCORRECT.
                </div>
                <div>
                    <h3>Services Agreement</h3>
                    <p>The MoneyXpay's Merchant Services Agreement is an agreement between you and MoneyXpay. It details MoneyXpay's obligations...</p>
                </div>
                <div>
                    <h3>Accept Agreement</h3>
                    <p>By signing this agreement, I am accepting this agreement on behalf of Posh Tech...</p>
                </div>
                <div>
                    <label>Contracting Entity</label>
                    <input type="text" defaultValue="Posh Tech" required />
                </div>
                <div>
                    <label>Company Address</label>
                    <input type="text" defaultValue="Lagos Nigeria 8 Yaba Lagos" required />
                </div>
                <div>
                    <label>Website</label>
                    <input type="text" defaultValue="www.poshtech.com" required />
                </div>

                {/* Checkbox for SLA agreement */}
                <div className="mt-4">
                    <input
                        type="checkbox"
                        id="slaAgreement"
                        checked={slaBoolean}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="slaAgreement" className="ml-2">
                        I have read the service agreement and I agree
                    </label>
                </div>

                <button type="submit" className='mt-4 bg-priColor text-white py-2 px-4 rounded'>
                    Save
                </button>
            </div>
        </form>
    );
};

export default MerchantServiceAgreement;