import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import MainLayout from '../layout/MainLayout';
import Merchants from '../pages/Merchants/Merchants';
import MerchantCredentials from '../pages/Merchants/MerchantCredentials';
import MerchantPopUpForm from '../pages/Merchants/MerchantPopUp';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ConfirmEmailPage from '../pages/auth/ConfirmEmailPage';
import RegisterMultiStepPage from '../pages/auth/RegisterMultiStepPage';
import Customers from '../pages/Customers/Customers';
import Transactions from '../pages/Transactions/Transactions';
import Settings from '../pages/Settings/Settings';
import ComplianceLayout from '../pages/Compliance/Compliance';
import ProfileForm from '../pages/Compliance/components/profileStep';
import ContactForm from '../pages/Compliance/components/contactStep';
import MerchantServiceAgreement from '../pages/Compliance/components/serviceAgreement';
import RequireAuth from '../components/auth/RequireAuth';
import { Route, Routes, Navigate } from 'react-router-dom';
import BankAccount from '../pages/Settlement/BankAccount';
import Configuration from '../pages/Settlement/Configuration';
import AllSettlement from '../pages/Settlement/AllSettlement';
import Disputes from '../pages/Disputes/Disputes';
import Invoices from '../pages/Invoices/Invoices';
import BankForm from '../pages/Compliance/components/bankStep';
import BusinessForm from '../pages/Compliance/components/businessStep';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';

const RoutesSystem = () => {
  return (
    <Routes>

      {/* public routes */}

      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/confirm-email' element={<ConfirmEmailPage />} />
      <Route path='/complete-registration' element={<RegisterMultiStepPage />} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />

      {/* protected routes */}

      <Route element={<RequireAuth />}>
        <Route path='/' element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="/merchant/credentials/:merchantCode" element={<MerchantCredentials />} />
          <Route path="merchant/credentials/merchantPopUpForm" element={<MerchantPopUpForm />} />

          <Route path="/settlement" >
            <Route path='all' element={<AllSettlement />} />
            <Route path='bank-account' element={<BankAccount />} />
            <Route path='configuration' element={<Configuration />} />
          </Route>


          {/* Add other routes */}
          <Route path="transaction" element={<Transactions />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<Settings />} />
          <Route path='/change-password' element={<ChangePasswordPage />} />

          {/* Compliance Routes */}

          <Route path="compliance" element={<ComplianceLayout />} >
            <Route path="contact" element={<ContactForm />} />
            <Route path="profile" element={<ProfileForm />} />
            <Route path="bank" element={<BankForm />} />
            <Route path="business" element={<BusinessForm />} />
            <Route path="service-agreement" element={<MerchantServiceAgreement />} />
            <Route index element={<Navigate to='profile' />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesSystem;