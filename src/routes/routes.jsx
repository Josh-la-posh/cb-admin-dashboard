import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layout/MainLayout';
import Merchants from '../pages/Merchants/Merchants';
import MerchantCredentials from '../pages/Merchants/MerchantCredentials';
import MerchantPopUpForm from '../pages/Merchants/MerchantPopUp';
import LoginPage from '../pages/auth/LoginPage';
// import LoginPage from 
// Import other pages...

const RoutesSystem = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);
    return (
      <Router>
        {
          isLoggedIn === false 
          ? <Routes>
            <Route index element={<LoginPage />}/>
          </Routes>
          : <MainLayout>
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/merchants/merchants" element={<Merchants />} />
            <Route path="/merchant/credentials"  element={<MerchantCredentials />} />
            <Route path="/merchant/credentials/merchantPopUpForm"  element={<MerchantPopUpForm />} />
            {/* Add other routes */}
          </Routes>
        </MainLayout>
        }
      </Router>
    );
};

export default RoutesSystem;
