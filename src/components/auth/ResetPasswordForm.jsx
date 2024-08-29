import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/auth/auth.css';
import axios from '../../api/axios';
import AuthInputField from './authInputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const RESET_PASSWORD_URL = '/api/account/reset-password';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;

const ResetPasswordForm = () => {
    const errRef = useRef();
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

        if (!v1) {
            setErrMsg('Password validation Failed');
            return;
        }
        if (!v2) {
            setErrMsg('Password does not match');
            return;
        }



        setLoading(true);

        try {
            const response = await axios.post(RESET_PASSWORD_URL,
                JSON.stringify({newPassword, confirmPassword}),
                 {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;

            if (data.statusCode === 200) {
                setSuccess(true);
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
            {!success ? 
                (
                    <div className="">
                        <h2 className="text-[20px] font-bold mb-4 text-center mb-6">Reset Password</h2>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live='asserive'>{errMsg}</p>
                        <form onSubmit={handleSubmit}>
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
                )
             :
                (
                    <div className="text-[13px]">
                        <div className="flex flex-col justify-center items-center gap-6 py-[20px] px-[40px] mb-4">
                            <FontAwesomeIcon icon={faCheckCircle} size='4x' style={{color: 'green'}} />
                            <p className='text-[13px] text-center'>Password Reset Successful.</p>
                        </div>
                        <Link to='/login' className='text-blue-800 hover:underline'>Proceed to Login</Link>
                    </div>
                )}
        </div>
    );
};

export default ResetPasswordForm;
