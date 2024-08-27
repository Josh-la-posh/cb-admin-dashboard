import React, { useState } from 'react';
import ProfileTab from './components/profileTab';
import ContactTab from './components/contactTab';
import AccountsTab from './components/accountTab';
import TeamTab from './components/teamTab';
import APIKeysTab from './components/apiKeysTab';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'contact', label: 'Contact' },
        { id: 'accounts', label: 'Accounts' },
        // { id: 'preferences', label: 'Preferences' },
        { id: 'team', label: 'Team' },
        { id: 'apikeys', label: 'API Keys & Webhooks' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab />;
            case 'contact':
                return <ContactTab />;
            case 'accounts':
                return <AccountsTab />;
            //   case 'preferences':
            //     return <PreferencesTab />;
            case 'team':
                return <TeamTab />;
            case 'apikeys':
                return <APIKeysTab />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800 mb-8">Settings</h1>
            <div className="overflow-x-auto">
                <div className="flex border-b min-w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`py-2 px-4 text-sm ${activeTab === tab.id
                                    ? 'border-b-2 border-priColor text-priColor'
                                    : 'text-gray-400'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-[50px] min-w-[600px]">{renderTabContent()}</div>
        </div>
    );
};

export default Settings;