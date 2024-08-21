import React, { useState, useRef, useEffect } from 'react';
import '../../pages/auth/auth.css';
import { Link } from 'react-router-dom';
import AuthInputField from './authInputField';
import axios from '../../api/axios';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BUSINESS_REGEX = /^[a-zA-Z0-9\s\-']{3,50}$/;
const NAME_REGEX = /^[a-zA-Z]{2,24}$/;
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_@]{3,24}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;
const PHONE_REGEX = /^[0-9\s\-()]{10,15}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const REGISTER_URL = '/onboard';

// Sample data for dropdowns
const countries = [
    { isoCode: 'NG', name: 'Nigeria' },
    { isoCode: 'US', name: 'United States' },
    { isoCode: 'GB', name: 'United Kingdom' },
    // Add more countries as needed
];

const industryCategories = [
    { id: 1, name: 'Fintech' },
    { id: 2, name: 'Agriculture' },
    { id: 3, name: 'Healthcare' },
    // Add more industries as needed
];

const RegisterForm = () => {
    // const userRef = useRef();
    // const emailRef = useRef();
    const errRef = useRef();

    const [validBusinessName,setValidBusinessName] = useState(false);
    const [businessNameFocus,setBusinessNameFocus] = useState(false);

    const [validContactEmail,setValidContactEmail] = useState(false);
    const [contactEmailFocus,setContactEmailFocus] = useState(false);

    const [validContactPhoneNumber,setValidContactPhoneNumber] = useState(false);
    const [contactPhoneNumberFocus,setContactPhoneNumberFocus] = useState(false);

    const [validContactFirstName,setValidContactFirstName] = useState(false);
    const [contactFirstNameFocus,setContactFirstNameFocus] = useState(false);

    const [validContactLastName,setValidContactLastName] = useState(false);
    const [contactLastNameFocus,setContactLastNameFocus] = useState(false);

    // const [validIndustryCategoryId,setValidIndustryCategoryId] = useState(false);
    // const [industryCategoryIdFocus,setIndustryCategoryIdFocus] = useState(false);

    // const [validCountry,setValidCountry] = useState(false);
    // const [countryFocus,setCountryFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const [formData, setFormData] = useState({
        country: 'NG',
        businessName: '',
        contactEmail: '',
        contactPhoneNumber: '',
        contactFirstName: '',
        contactLastName: '',
        industryCategoryId: 1,
    });



    // useEffect(() => {
    //   userRef.current.focus();
    // }, [])

    useEffect(() => {
        const result = BUSINESS_REGEX.test(formData.businessName);
        setValidBusinessName(result);
    }, [formData.businessName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(formData.contactEmail);
        setValidContactEmail(result);
    }, [formData.contactEmail])

    useEffect(() => {
        const result = PHONE_REGEX.test(formData.contactPhoneNumber);
        setValidContactPhoneNumber(result);
    }, [formData.contactPhoneNumber])

    useEffect(() => {
        const result = NAME_REGEX.test(formData.contactFirstName);
        setValidContactFirstName(result);
    }, [formData.contactFirstName])

    useEffect(() => {
        const result = NAME_REGEX.test(formData.contactLastName);
        setValidContactLastName(result);
    }, [formData.contactLastName])

    useEffect(() => {
        setErrMsg('');
    }, [formData.businessName, formData.contactEmail, formData.contactFirstName, formData.contactLastName, formData.contactPhoneNumber])
    


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = BUSINESS_REGEX.test(formData.businessName);
        const v2 = EMAIL_REGEX.test(formData.contactEmail);
        const v3 = PHONE_REGEX.test(formData.contactPhoneNumber);
        const v4 = NAME_REGEX.test(formData.contactFirstName);
        const v5 = NAME_REGEX.test(formData.contactLastName);


        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg('Invalid Entry');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(formData),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })

                setSuccess(true);
        } catch (err) {
            const errResponse = err.response.data;
                    
            if (errResponse?.responseCode === '500') {
                setErrMsg('User credentials already exit.');
            } else if (!err.response) { 
                setErrMsg('No Server Response');
            } else {
                setErrMsg('An error occured. Try again later');
            }

            errRef.current.focus();
        } finally {
            setLoading(false);
        }





    //     try {
    //         const response = await fetch(`${process.env.REACT_APP_API_MERCHANT_BASE_URL}/onboard`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         const data = await response.json();

    //         if (data.success) {
    //             alert('Registration successful');
    //         } else {
    //             setError(data.message || 'Registration failed');
    //         }
    //     } catch (error) {
    //         setError('An unexpected error occurred');
    //     } finally {
    //         setLoading(false);
    //     }
    };

    return (
        <>
            {
                success ? (
                    <section className='w-[280px] sm:w-[400px] lg:w-[60%] bg-white p-6 lg:p-8 rounded-lg shadow-lg mx-auto lg:max-w-2xl'>
                        <div className='flex items-center justify-center w-120px h-[120px] mb-8'>
                            <FontAwesomeIcon icon={faCircleCheck} size='5x' style={{color:'green'}} />
                        </div>
                        <p className='mb-4 text-[12px] text-center'>Your account has been created successfully!!!.</p>
                        <p className='mb-12 text-sm text-center'>Click the link sent to your mail to confirm your account.</p>
                        
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-[11px] lg:text-sm text-blue-500 hover:underline">Otherwise, proceed to <span className='text-[#0000FF]'>Log in</span></Link>
                        </div>



                    </section>
                ) : (
                <section className="w-[280px] sm:w-[400px] lg:w-[60%] bg-white p-6 lg:p-8 rounded-lg shadow-lg mx-auto lg:max-w-2xl">
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live='asserive'>{errMsg}</p>

                    <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-6">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <AuthInputField 
                            label="Business Name"
                            type='text'
                            validName={validBusinessName}
                            valueName={formData.businessName}
                            id="businessName"
                            onChange={handleChange}
                            setOnFocus={setBusinessNameFocus}
                            nameFocus={businessNameFocus}
                            errNote={(
                                <>
                                    Business name is required.
                                    <br />
                                    Business name must be between 3 and 50 characters.
                                    <br />
                                    Business name can only contain letters, numbers, spaces, hyphens, and apostrophes.
                                    <br />
                                    Business name cannot start or end with a space.
                                </>
                                )}
                            />
                        <div className="block md:flex md:space-x-4">
                        <AuthInputField 
                            label="Email"
                            type='email'
                            validName={validContactEmail}
                            valueName={formData.contactEmail}
                            id="contactEmail"
                            onChange={handleChange}
                            setOnFocus={setContactEmailFocus}
                            nameFocus={contactEmailFocus}
                            errNote={(
                                <>
                                    Enter a valid email address
                                </>
                                )}
                            />


                        <AuthInputField 
                            label="Phone Number"
                            type='tel'
                            validName={validContactPhoneNumber}
                            valueName={formData.contactPhoneNumber}
                            id="contactPhoneNumber"
                            onChange={handleChange}
                            setOnFocus={setContactPhoneNumberFocus}
                            nameFocus={contactPhoneNumberFocus}
                            errNote={(
                                <>
                                    Please enter a valid phone number (10 to 15 digits).
                                </>
                                )}
                            />
                        </div>
                        <div className="block md:flex md:space-x-4">


                        <AuthInputField 
                            label="First Name"
                            type='text'
                            validName={validContactFirstName}
                            valueName={formData.contactFirstName}
                            id="contactFirstName"
                            onChange={handleChange}
                            setOnFocus={setContactFirstNameFocus}
                            nameFocus={contactFirstNameFocus}
                            errNote={(
                                <>
                                    First name is required.
                                    <br />
                                    First name must be between 2 and 24 characters.
                                    <br />
                                    First name can only contain letters and .
                                    <br />
                                    First name cannot contain spaces.
                                </>
                                )}
                            />

                            <AuthInputField 
                                label="Last Name"
                                type='text'
                                validName={validContactLastName}
                                valueName={formData.contactLastName}
                                id="contactLastName"
                                onChange={handleChange}
                                setOnFocus={setContactLastNameFocus}
                                nameFocus={contactLastNameFocus}
                                errNote={(
                                    <>
                                        Last name is required.
                                        <br />
                                        Last name must be between 2 and 24 characters.
                                        <br />
                                        Last name can only contain letters and .
                                        <br />
                                        Last name cannot contain spaces.
                                    </>
                                    )}
                                />
                        </div>
                        <div className="mb-4">
                            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="country">
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-3 py-1 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                {countries.map((country) => (
                                    <option key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="industryCategoryId">
                                Industry Category
                            </label>
                            <select
                                id="industryCategoryId"
                                name="industryCategoryId"
                                value={formData.industryCategoryId}
                                onChange={handleChange}
                                className="w-full px-3 py-1 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                {industryCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-priColor text-sm text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            disabled={loading || !validBusinessName || !validContactEmail || !validContactFirstName || !validContactLastName || !validContactPhoneNumber ? true : false}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-[11px] lg:text-sm text-priColor">Don't have an account? <span className='text-blue-800'>Log In</span></Link>
                        </div>
                    </form>
                </section>)
            }
        </>
    );
};

export default RegisterForm;
