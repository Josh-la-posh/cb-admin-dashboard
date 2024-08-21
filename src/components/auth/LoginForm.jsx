import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../../pages/auth/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

const LOGIN_URL = '/Account';
const MERCHANT_URL = '/merchant-compliance';
const COMPLIANCE_REG = '/complete-registration';

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';




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
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // try {
    //   const response = await axios.post(LOGIN_URL,
    //     JSON.stringify({email, password}),
    //     {
    //       headers: {
    //         'Accept': '*/*',
    //         'Content-Type': 'application/json',
    //       },
    //       withCredentials: true
    //     })

    //     const data = response.data.responseData;
    //     const accessToken = data.accessToken;

    //     console.log('finally', JSON.stringify(data));
        
    //     // saving access token
    //     localStorage.setItem('accessToken', accessToken);

    //     //saving merchants data
    //     localStorage.setItem('merchantData', JSON.stringify(data.merchants[0]));

    //     setAuth({email, password, accessToken});

        

    //     // fetching compliance data to route user to log in screen or create password screen

    //     const merchantCode = data.merchants[0].merchantCode;

    //     const complianceRequest = await axios.get(`${MERCHANT_URL}/${merchantCode}`,
    //       {
    //         headers: {
    //           'Authorization': `Bearer ${accessToken}`,
    //           'Accept': 'application/json',
    //         }
    //       }
    //     )
    //     const complianceData = complianceRequest.data;

    //     if (complianceData.success === true) {
    //       dispatch(loginSuccess(email));

    //       setEmail('');
    //       setPassword('');
    //       navigate(from, {replace: true});
    //     } else {
    //       navigate(COMPLIANCE_REG);
    //     }
    // } catch (err) {
    //   console.log('finally', JSON.stringify(err));
    //   if (!err.response) {
    //     dispatch(loginFailure('An unexpected error occurred. Try again'));
    //   } else {
    //     // const errResponse = err.response.data;
    //     // console.log(JSON.stringify(errResponse));

    //     if (err.response.data.responseCode === '400') {
    //       dispatch(loginFailure(err.response.data.message));
    //     } else {
    //       dispatch(loginFailure('Login Failed'));
    //     }
    //   }

    //   errRef.current.focus();
    // }

    try {
      const response = await fetch(`https://merchant-api.codebytesltd.com/api/Account`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // console.log("Data", data)
      // console.log("Data-Code", data.responseData.merchants[0].merchantCode)

      if (data.requestSuccessful) {
        // Store the merchant data as a string in local storage
        localStorage.setItem('merchantData', JSON.stringify(data.responseData.merchants[0]));

        const accessToken = data.responseData.accessToken;
        // Store the token in local storage
        localStorage.setItem('accessToken', accessToken);

        setAuth({email, password, accessToken});

        try {
          const responseDemo = await fetch('https://merchant-api.pelpay.ng/api/Account', {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: "ofolarin@chamsswitch.com", password: "Daddydof@4143bdm" }),
          });

          const dataDemo = await responseDemo.json();

          if (dataDemo.requestSuccessful) {
            // Store the token in local storage
            localStorage.setItem('accessTokenDemo', dataDemo.responseData.accessToken);
          } else {
            // Handle failure (e.g., display an error message)
            // dispatch(loginFailure(data.message || 'Login failed'));
          }
        } catch (error) {
          // Handle unexpected errors
          // dispatch(loginFailure('An unexpected error occurred'));
        }
        // Store the token in local storage
        // localStorage.setItem('accessToken', data.responseData.accessToken);

        // // Dispatch success action
        // dispatch(loginSuccess({ email }));

        // Fetch merchant compliance data
        const merchantCode = data.responseData.merchants[0].merchantCode; // Replace with the actual merchant code
        const complianceResponse = await fetch(`https://merchant-api.codebytesltd.com/api/merchant-compliance/${merchantCode}`, {
          headers: {
            'Authorization': `Bearer ${data.responseData.accessToken}`,
            'Accept': 'application/json',
          },
        });

        const complianceData = await complianceResponse.json();

        if (complianceData.success) {
          // Dispatch success action
          dispatch(loginSuccess({ email }));

          // Redirect to home or dashboard
          navigate(from, {replace: true});
        } else {
          // Redirect to the step form page
          navigate('/complete-registration');
        }
      } else {
        dispatch(loginFailure(data.message || 'Login failed'));
      }
    } catch (error) {
      dispatch(loginFailure('An unexpected error occurred'));
    }
  };

  return (
    <section className="w-[280px] sm:w-[50%] md:w-[60%] lg:w-[70%] bg-white p-8 rounded-lg shadow-lg mx-auto lg:max-w-2xl overflow-y-auto">
      <p ref={errRef} className={error ? "errmsg" :
        "offscreen"} aria-live='asserive'>{error}</p>

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
