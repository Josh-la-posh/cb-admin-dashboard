import React, { useState } from 'react';

const AccountsTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState(null);

  const handleActivationRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsActivated(true);
    } catch (err) {
      setError('Failed to complete activation request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-md font-medium mb-6">Payout Accounts</h2>
        {!isActivated ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Complete your activation request and take your business live to manage bank and mobile money
              accounts for your business.
            </p>
            <button
              onClick={handleActivationRequest}
              disabled={isLoading}
              className={`${
                isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              } text-sm text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? 'Processing...' : 'Complete activation request'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </>
        ) : (
          <p className="text-sm text-blue-500">Your account is activated! You can now manage your payout accounts.</p>
        )}
      </div>
    </div>
  );
};

export default AccountsTab;