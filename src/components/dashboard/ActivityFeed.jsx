import React from 'react';

const ActivityFeed = () => {
    const activities = [
        { id: 1, message: 'User Josh Dof completed a payment of ₦120.00', time: '2 hours ago' },
        { id: 2, message: 'Failed transaction for ₦45.50', time: '4 hours ago' },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <ul className="mt-4 space-y-4">
                {activities.map((activity) => (
                    <li key={activity.id} className="flex justify-between">
                        <span className="text-gray-700">{activity.message}</span>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;
