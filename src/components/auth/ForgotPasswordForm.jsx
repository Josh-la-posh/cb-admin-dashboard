import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/auth/auth.css';
import axios from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import AuthInputField from './authInputField';

const FORGOT_PASSWORD_URL = '/api/account/forgot-password';
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPasswordForm = () => {
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTokenSent, setIsTokenSent] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [email])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(FORGOT_PASSWORD_URL,
                JSON.stringify({email}),
                 {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;
            console.log(data)

            if (data.message === 'Successful') {
                setIsTokenSent(true);
            };
        } catch (error) {
            if (!error.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(error.response.data.message)
            }

            errRef.current.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            {
                !isTokenSent ?
                (
                    <form onSubmit={handleLogin}>
                        <h2 className="text-[20px] mb-8 font-bold mb-4 text-center">Forgot Password</h2>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live='asserive'>{errMsg}</p>
                        <div className="mb-4">
                            <AuthInputField
                                label="Email"
                                type='email'
                                validName={validEmail}
                                valueName={email}
                                id="contactEmail"
                                onChange={(e) => setEmail(e.target.value)}
                                setOnFocus={setEmailFocus}
                                nameFocus={emailFocus}
                                errNote={(
                                    <>
                                        Enter a valid email address
                                    </>
                                )}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-priColor text-white py-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Continue'}
                        </button>
                    </form>
                ) :
                (
                    <div className="text-[13px]">
                        <div className="flex flex-col justify-center items-center gap-6 py-[20px] px-[40px] mb-8">
                            <FontAwesomeIcon icon={faCheckCircle} size='4x' style={{color: 'green'}} />
                            <p className='text-[13px] text-center'>Kindly click the link that was sent to your mail to reset your password.</p>
                        </div>
                        <Link to='/login' className='text-blue-800 hover:underline'>Go back to Login</Link>
                    </div>
                )
            }
        </div>
    );
};

export default ForgotPasswordForm;
