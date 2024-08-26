import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../../redux/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const LOGIN_URL = '/api/account';
const MERCHANT_URL = '/api/merchant-compliance';
const COMPLIANCE_REG = '/complete-registration';

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState('');


  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(logout());
    setAuth({});
  }, [])

  useEffect(() => {
    dispatch(logout());
  })

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({email, password}),
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      )

        const data = response.data.responseData;
        const accessToken = data.accessToken;

        // // saving access token
        localStorage.setItem('accessToken', accessToken);

        // //saving merchants data
        localStorage.setItem('merchantData', JSON.stringify(data.merchants[0]));

        // saving user data
        localStorage.setItem('userData', JSON.stringify(data.user));

        setAuth({email, password, accessToken});
        toast.success("Login successful");

        // fetching compliance data to route user to log in screen or create password screen

        const merchantCode = data.merchants[0].merchantCode;
        console.log(merchantCode);

        const complianceResponse = await fetch(`${process.env.REACT_APP_API_MERCHANT_BASE_URL}${MERCHANT_URL}/${merchantCode}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
            },
          }
        );
      
        const complianceData = await complianceResponse.json();

        if (complianceData.success === true) {
          dispatch(loginSuccess({accessToken, email}));

          setEmail('');
          setPassword('');
          const from = location.state?.from?.pathname || '/';
          navigate(from, {replace: true});
        } else {
          navigate(COMPLIANCE_REG);
        }
    } catch (err) {
      console.log('finally', JSON.stringify(err.response));
      if (!err.response) {
        dispatch(loginFailure('An unexpected error occurred. Try again'));
      } else {
        if (err.response.data.responseCode === '400') {
          toast.error(err.response.data.message || 'Login failed');
          dispatch(loginFailure(err.response.data.message));
        } else {
          toast.error('Login failed');
          dispatch(loginFailure('Login Failed'));
        }
      }
    }
  };

  return (
    <section className="w-[280px] sm:w-[50%] md:w-[60%] lg:w-[70%] bg-white p-8 rounded-lg shadow-lg mx-auto lg:max-w-2xl overflow-y-auto">
      {/* <p ref={errRef} className={errMsg ? "errmsg" :
        "offscreen"} aria-live='asserive'>{error}</p> */}

      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={userRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[11px] lg:text-[13px] mb-2 flex items-center" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-1 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-black text-[12px] lg:text-sm mb-1 lg:mb-2 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label>
          <a href="#" className="text-[10px] lg:text-[11px] text-blue-800 hover:underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-priColor text-sm text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <div className="text-center mt-4">
          <Link to="/register" className="text-[11px] lg:text-sm text-priColor">Don't have an account? <span className='text-blue-800'>Sign Up</span></Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;