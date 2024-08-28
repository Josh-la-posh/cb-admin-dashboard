import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivate } from '../../api/axios';

const CHANGE_PASSWORD_URL = '/api/change';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;

const ChangePasswordForm = () => {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');


    const [validContactPhoneNumber, setValidContactPhoneNumber] = useState(false);
    const [contactPhoneNumberFocus, setContactPhoneNumberFocus] = useState(false);


    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [focusNewPassword, setFocusNewPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const result = PWD_REGEX.test(newPassword);
        setValidNewPassword(result);
    }, [newPassword])

    useEffect(() => {
        setErrMsg('');
    }, [newPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosPrivate.post(CHANGE_PASSWORD_URL,
                JSON.stringify({oldPassword, newPassword}),
            );
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log('Couldn\'t complete your request')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg border w-full max-w-lg">
            <h2 className="text-xl font-bold mb-12">Change Password</h2>
            {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPass">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="oldPass"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPass">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPass"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conPass">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="conPass"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-priColor text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
