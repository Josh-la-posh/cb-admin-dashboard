import React, { useState } from 'react';
import { loginStart, loginSuccess, loginFailure } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const RESET_PASSWORD_URL = '/api/reset';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTokenSent, setIsTokenSent] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(loading);

        try {
            const response = await axios.post(RESET_PASSWORD_URL,
                JSON.stringify({email}),
                 {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;

            if (data.statusCode === 200) {
                setIsTokenSent(true);
            };
        } catch (error) {
            if (!error.response) {
                setErrMsg('No Server Response');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-[20px] font-bold mb-4 text-center">Forgot Password</h2>
            {errMsg && <p className="text-red-500 text-sm mb-4">{errMsg}</p>}
            {
                !isTokenSent ?
                (
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#0000FF] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Continue'}
                        </button>
                    </form>
                ) :
                (
                    <form onSubmit={handleLogin}>
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
                            className="w-full bg-[#0000FF] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                )
            }
        </div>
    );
};

export default ResetPasswordForm;
