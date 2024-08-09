import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);


  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulate an API call (replace with real API call)
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        dispatch(loginSuccess({ email }));
        alert('Login successful');
        // Redirect or show success message


        navigate('/home');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label>
          <a href="#" className="text-sm text-[#0000FF] hover:underline">Forgot password?</a>
          </div> 
        <button
          type="submit"
          className="w-full bg-[#0000FF] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-[#0000FF] hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;