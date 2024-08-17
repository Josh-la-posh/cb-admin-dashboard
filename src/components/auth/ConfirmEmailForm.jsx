import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../pages/auth/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ConfirmEmailForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from query parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        if (token) {
            setToken(token);
        }
    }, [location.search]);

    const handleConfirmEmail = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await fetch(`${baseUrl}/api/account/confirm-email`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, confirmPassword, token }),
            });

            const data = await response.json();

            if (data.requestSuccessful) {
                // Store tokens and merchant data in local storage if needed
                localStorage.setItem('accessToken', data.responseData.accessToken);
                // dispatch(loginSuccess({ email: data.responseData.email }));

                // Redirect to the desired page
                navigate('/');
            } else {
                dispatch(loginFailure(data.message || 'Confirmation failed'));
            }
        } catch (error) {
            dispatch(loginFailure('An unexpected error occurred'));
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Confirm Email</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleConfirmEmail}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
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
                    {loading ? 'Confirming...' : 'Confirm Email'}
                </button>
            </form>
        </div>
    );
};

export default ConfirmEmailForm;
