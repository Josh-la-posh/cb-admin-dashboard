import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layout/MainLayout';
import Merchants from '../pages/Merchants/Merchants';
import MerchantCredentials from '../pages/Merchants/MerchantCredentials';
import MerchantPopUpForm from '../pages/Merchants/MerchantPopUp';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import RegisterMultiStepPage from '../pages/auth/RegisterMultiStepPage';
import Customers from '../pages/Customers/Customers';
import Transactions from '../pages/Transactions/Transactions';
import Settings from '../pages/Settings/Settings';

const RoutesSystem = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Router>
      {
        isLoggedIn === false
          ? <Routes>
              <Route index element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
              <Route path='complete-registration' element={<RegisterMultiStepPage />} />
          </Routes>
          : <MainLayout>
            <Routes>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/merchants/merchants" element={<Merchants />} />
              <Route path="/merchant/credentials" element={<MerchantCredentials />} />
              <Route path="/merchant/credentials/merchantPopUpForm" element={<MerchantPopUpForm />} />
              {/* Add other routes */}
              <Route path="/transaction" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainLayout>
      }
    </Router>

    // <Router>

    //   <Routes>
    //     <Route index element={<LoginPage />} />
    //   </Routes>
    //   <MainLayout>
    //     <Routes>
    //       <Route path="/home" element={<Dashboard />} />
    //       <Route path="/merchants/merchants" element={<Merchants />} />
    //       <Route path="/merchant/credentials" element={<MerchantCredentials />} />
    //       <Route path="/merchant/credentials/merchantPopUpForm" element={<MerchantPopUpForm />} />
    //       {/* Add other routes */}
    //       <Route path="/transaction" element={<Transactions />} />
    //     </Routes>
    //   </MainLayout>
    // </Router>
  );
};

export default RoutesSystem;
