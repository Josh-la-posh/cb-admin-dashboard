import React from 'react';

const MerchantServiceAgreement = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
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
                <button type="submit" className='mt-4 bg-priColor text-white py-2 px-4 rounded'>
                    Save
                </button>
            </div>
        </form>
    );
};

export default MerchantServiceAgreement;
