import React from 'react';

const TeamTab = () => {
    return (
        <div className="p-6 bg-white">
            <h2 className="text-md font-medium mb-6">Team</h2>

            <div className="flex items-center justify-between mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Team Members</label>
                </div>
                <div className="space-x-4">
                    <button className="border px-4 py-2 text-black-600 text-[12px] hover:text-blue-800">Enforce 2FA</button>
                    <button className="border px-4 py-2 text-black-600 text-[12px] hover:text-blue-800">Manage roles</button>
                    <button className="bg-blue-600 text-sm text-white px-3 py-2 rounded hover:bg-blue-700">+ Invite someone</button>
                </div>
            </div>

            <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2FA Status</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Joshua Fajobi</td>
                            <td className="px-6 py-4 whitespace-nowrap">joshuamayowa23@yahoo.com</td>
                            <td className="px-6 py-4 whitespace-nowrap">Business Owner</td>
                            <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                            <td className="px-6 py-4 whitespace-nowrap">Aug 17, 2024, 3:21 PM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No actions available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamTab;