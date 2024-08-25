import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; 

export default axios.create({
    baseURL: process.env.REACT_APP_API_MERCHANT_BASE_URL
});

// export const axiosPrivate = axios.create({
//     baseURL: process.env.REACT_APP_API_MERCHANT_BASE_URL,
//     headers: { 'Content-Type': 'application/json'},
//     withCredentials: true,
// });

export const AxiosPrivate = () => {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = axios.create({
        baseURL: process.env.REACT_APP_API_MERCHANT_BASE_URL,
        headers: { 
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
         },
        withCredentials: true,
    });
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
          (config) => {
            if (!config.headers['Authorization']) {
              config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
            }
            return config;
          },
          (error) => Promise.reject(error)
        );
    
        const responseIntercept = axiosPrivate.interceptors.response.use(
          (response) => response,
          (error) => {
            if (error.response?.status === 401) {
              setAuth({}); // Clear auth state (log out the user)
              navigate('/login'); // Redirect to login page
            }
            return Promise.reject(error);
          }
        );
    
        return () => {
          axiosPrivate.interceptors.request.eject(requestIntercept);
          axiosPrivate.interceptors.response.eject(responseIntercept);
        };
      }, [auth, navigate, setAuth]);

    return axiosPrivate;
};