import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../pages/auth/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ConfirmEmailForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,23}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError('Password must be 6-23 characters long, contain at least one uppercase letter, one number, and one special character.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmEmail = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        if (!validatePassword(password) || confirmPassword !== password) {
            setPasswordError('Please fix the errors before submitting.');
            return;
        }

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
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                        required
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                        required
                    />
                    {confirmPasswordError && <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#272662] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={loading || passwordError || confirmPasswordError || !password || !confirmPassword}
                >
                    {loading ? 'Confirming...' : 'Confirm Email'}
                </button>
            </form>
        </div>
    );
};

export default ConfirmEmailForm;
