import React, { useState } from 'react';

const ContactTab = () => {
  const [contactData, setContactData] = useState({
    disputeEmails: ['joshuamayowa23@yahoo.com'],
    supportEmail: 'joshuamayowa23@yahoo.com',
    generalEmail: 'joshuamayowa23@yahoo.com',
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setContactData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleDisputeEmailAdd = () => {
    setContactData(prevData => ({
      ...prevData,
      disputeEmails: [...prevData.disputeEmails, '']
    }));
  };

  const handleDisputeEmailChange = (index, value) => {
    setContactData(prevData => {
      const newEmails = [...prevData.disputeEmails];
      newEmails[index] = value;
      return { ...prevData, disputeEmails: newEmails };
    });
  };

  const handleDisputeEmailRemove = (index) => {
    setContactData(prevData => {
      const newEmails = prevData.disputeEmails.filter((_, i) => i !== index);
      return { ...prevData, disputeEmails: newEmails };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., API call)
    console.log('Contact data submitted:', contactData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6">
      <h2 className="text-md font-medium mb-6">Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              As soon as a dispute (chargeback or fraud claim) is raised for a transaction
              or more support is required from your team, Paystack will notify you via
              email in the email addresses that you specify below.
            </p>
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Dispute emails
            </label>
            {contactData.disputeEmails.map((email, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleDisputeEmailChange(index, e.target.value)}
                  className="border rounded-l text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleDisputeEmailRemove(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-r hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDisputeEmailAdd}
                className="text-blue-500 text-[12px] hover:text-blue-600 text-sm focus:outline-none"
              >
                Add more emails
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="supportEmail" className="block text-[12px] font-medium text-gray-700 mb-1">
              Support email
            </label>
            <input
              type="email"
              id="supportEmail"
              value={contactData.supportEmail}
              onChange={(e) => handleInputChange(e, 'supportEmail')}
              className="border rounded text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="generalEmail" className="block text-[12px] font-medium text-gray-700 mb-1">
              General email
            </label>
            <input
              type="email"
              id="generalEmail"
              value={contactData.generalEmail}
              onChange={(e) => handleInputChange(e, 'generalEmail')}
              className="border rounded text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="border border-blue-500 text-black text-sm px-4 py-2 rounded hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactTab;