import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../pages/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

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
        localStorage.setItem('userData', JSON.stringify(data.responseData.user));
        // Store the token in local storage
        localStorage.setItem('accessToken', data.responseData.accessToken);

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
          navigate('/home');
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
    <div className="w-[80%] h-[100%] sm:w-[50%] md:w-[60%] lg:w-[70%] bg-white p-8 rounded-lg shadow-lg mx-auto lg:max-w-2xl overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-black text-[13px] mb-2 flex items-center" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-[13px] mb-2 flex items-center" htmlFor="password">
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
          <label className="block text-black text-sm mb-2 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label>
          <a href="#" className="text-[11px] text-[#0000FF] hover:underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-priColor text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <div className="text-center mt-4">
          <Link to="/register" className="text-sm text-blue-500 hover:underline">Don't have an account? <span className='text-[#0000FF]'>Sign Up</span></Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;