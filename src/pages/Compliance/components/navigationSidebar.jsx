// src/components/Sidebar.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const compliance = useSelector((state) => state.compliance);

    const steps = [
        { name: 'Profile', path: '/compliance/profile', complete: compliance.profileComplete },
        { name: 'Contact', path: '/compliance/contact', complete: compliance.contactComplete },
        { name: 'Owner', path: '/compliance/owner', complete: compliance.ownerComplete },
        { name: 'Account', path: '/compliance/account', complete: compliance.accountComplete },
        { name: 'Service Agreement', path: '/compliance/service-agreement', complete: compliance.serviceAgreementComplete },
    ];

    return (
        <div className="w-64 p-3">
            <ul>
                {steps.map((step, index) => (
                    <li key={index} className="flex items-center mb-4">
                        <Link to={step.path} className="flex items-center">
                            <span className="mr-2">
                                {step.complete ? (
                                    <svg
                                        className="w-6 h-6 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
                                )}
                            </span>
                            <div className="text-xs lg:text-sm">{step.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;