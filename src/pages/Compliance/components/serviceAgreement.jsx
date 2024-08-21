import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { setserviceAgreementComplete } from '../complianceSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const MerchantServiceAgreement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [slaBoolean, setSlaBoolean] = useState(false);
    const { merchantData, isServiceComplete } = useOutletContext();
    const token = localStorage.getItem("accessToken");
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL;

    useEffect(() => {
        // Populate slaBoolean with the merchantData value if available
        if (merchantData && merchantData.slaBoolean !== undefined) {
            setSlaBoolean(merchantData.slaBoolean);
            dispatch(setserviceAgreementComplete());
        }
    }, [merchantData, dispatch, navigate]);

    const handleCheckboxChange = (e) => {
        setSlaBoolean(e.target.checked); // Set slaBoolean to true or false based on checkbox
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!slaBoolean) {
            toast.error("You must agree to the service agreement before saving.");
            return;
        }

        const updatedData = {
            ...merchantData, // Keep the rest of the fields unchanged
            slaBoolean
        };

        try {
            const response = await fetch(
                `${baseUrl}/api/merchant-document`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Service agreement updated successfully:", result);
                dispatch(setserviceAgreementComplete());
                toast.success("Service agreement updated successfully"); // Success toast
                navigate('/home');
            } else {
                console.error("Error updating the service agreement:", response.statusText);
                toast.error("Error updating the service agreement");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error during form submission");
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
                    <p>The Paystack's Merchant Services Agreement is an agreement between you and Paystack. It details Paystack's obligations...</p>
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