import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';

export default axios.create({
    baseURL: process.env.REACT_APP_API_MERCHANT_BASE_URL
});

// export const axiosPrivate = axios.create({
//     baseURL: process.env.REACT_APP_API_MERCHANT_BASE_URL,
//     headers: { 'Content-Type': 'application/json'},
//     withCredentials: true,
// });

export const AxiosPrivate = () => {
  const refresh = useRefreshToken();
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
          async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401 && !prevRequest?.sent) {
                prevRequest.sent = true;
                try {
                  const newAccessToken = await refresh();
                  prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                  return axiosPrivate(prevRequest);
                } catch (refreshError) {
                  setAuth({});
                  navigate('/login', {replace: true});
                }  
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