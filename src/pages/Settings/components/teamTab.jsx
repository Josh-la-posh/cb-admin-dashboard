import React, { useEffect, useState } from 'react';

const TeamTab = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        // Retrieve data from local storage
        const user = JSON.parse(localStorage.getItem('userData'));
        const merchant = JSON.parse(localStorage.getItem('merchantData'));

        // Check if both user and merchant exist
        if (user && merchant) {
            // Map data to teamMembers
            const members = [{
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: merchant.businessType, // Example, replace with actual role if available
                twoFAStatus: user.isEmailConfirmed ? 'Enabled' : 'Disabled',
                lastLogin: user.createdDate, // Replace with actual last login if available
                actions: 'No actions available' // Adjust if needed
            }];

            setTeamMembers(members);
        }
    }, []);
    
    return (
        <div className="p-6 bg-white">
            <h2 className="text-md font-medium mb-6">Team</h2>

            <div className="flex items-center justify-between mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Team Members</label>
                </div>
                <div className="space-x-4">
                    {/* <button className="border px-4 py-2 text-black-600 text-[12px] hover:text-blue-800">Enforce 2FA</button>
                    <button className="border px-4 py-2 text-black-600 text-[12px] hover:text-blue-800">Manage roles</button> */}
                    <button className="bg-priColor text-sm text-white px-3 py-2 rounded hover:bg-blue-700">+ Invite someone</button>
                </div>
            </div>

            <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-[11px] text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-2 text-left text-[11px] text-gray-500 uppercase tracking-wider">Email Address</th>
                            <th className="px-4 py-2 text-left text-[11px] text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-4 py-2 text-left text-[11px] text-gray-500 uppercase tracking-wider">2FA Status</th>
                            <th className="px-4 py-2 text-left text-[11px] text-gray-500 uppercase tracking-wider">Last Login</th>
                            <th className="px-4 py-2 text-left text-[11px] text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                        {teamMembers.length > 0 ? (
                            teamMembers.map((member, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4 whitespace-nowrap">{member.name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{member.email}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{member.role}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{member.twoFAStatus}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{member.lastLogin}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{member.actions}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No team members found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamTab;