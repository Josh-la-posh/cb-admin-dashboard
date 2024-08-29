import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/auth/auth.css';
import { AxiosPrivate } from '../../api/axios';
import AuthInputField from './authInputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const RESET_PASSWORD_URL = '/api/account/change-password';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;

const ChangePasswordForm = () => {
    const axiosPrivate = AxiosPrivate();
    const errRef = useRef();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [NewPasswordFocus, setNewPasswordFocus] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [ConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const result = PWD_REGEX.test(newPassword);
        setValidNewPassword(result);
    }, [newPassword])

    useEffect(() => {
        const result = confirmPassword === newPassword;
        setValidConfirmPassword(result);
    }, [confirmPassword, newPassword])

    useEffect(() => {
        setErrMsg('');
    }, [newPassword, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = PWD_REGEX.test(newPassword);
        const v2 = confirmPassword === newPassword;
        const v3 = oldPassword !== '';


        if (!v1 || !v3) {
            setErrMsg('Password validation Failed');
            return;
        }
        if (!v2) {
            setErrMsg('Password does not match');
            return;
        }
        setLoading(true);

        try {
            const response = await axiosPrivate.post(RESET_PASSWORD_URL,
                JSON.stringify({oldPassword, newPassword, confirmPassword})
            );
            const data = response.data;
            console.log(data);

            if (data.message === 'Successful') {
                setSuccess(true);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            };
        } catch (error) {
            console.log(error)
            if (!error.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Invalid Password');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <div className="">
                <h2 className="text-[20px] font-bold mb-4 text-center mb-6">Reset Password</h2>
                <p ref={errRef} className={errMsg ? "errmsg" :
                    "offscreen"} aria-live='asserive'>{errMsg}</p>
                    {success && <p className='text-green-800 text-xs'>Password Changed Successfully.</p>}
                <form onSubmit={handleSubmit}>

                    <div className="my-4 w-full">
                        <label className="block text-black text-xs lg:text-[13px] mb-1 lg:md-4 flex items-center" htmlFor='password'>
                            Old Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            autoComplete='off'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <AuthInputField
                            label="New Password"
                            type='text'
                            validName={validNewPassword}
                            valueName={newPassword}
                            id="contactEmail"
                            onChange={(e) => setNewPassword(e.target.value)}
                            setOnFocus={setNewPasswordFocus}
                            nameFocus={NewPasswordFocus}
                            errNote={(
                                <>
                                    Password must be 7 and 24 characters
                                    <br />
                                    Password should contain a capital letter
                                    <br />
                                    Password should contain a small letter
                                    <br />
                                    Password should contain a number
                                    <br />
                                    Password should contain a special character
                                </>
                            )}
                        />
                        <AuthInputField
                            label="Confirm Password"
                            type='password'
                            validName={validConfirmPassword}
                            valueName={confirmPassword}
                            id="contactEmail"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            setOnFocus={setConfirmPasswordFocus}
                            nameFocus={ConfirmPasswordFocus}
                            errNote={(
                                <>
                                    Password does not match
                                </>
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-priColor text-white py-2 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
