import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import ConfirmEmailPage from '../pages/auth/ConfirmEmailPage';
import ContactForm from '../pages/Compliance/components/contactStep';
import ProfileForm from '../pages/Compliance/components/profileStep';
import OwnerForm from '../pages/Compliance/components/ownerStep';
import AccountForm from '../pages/Compliance/components/accountStep';
import MerchantServiceAgreement from '../pages/Compliance/components/serviceAgreement';
import Compliance from '../pages/Compliance/Compliance';

const RoutesSystem = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Router>
      {
        isLoggedIn === false
          ? <Routes>
            <Route index element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='confirm-email' element={<ConfirmEmailPage />} />
            <Route path='complete-registration' element={<RegisterMultiStepPage />} />
          </Routes>
          : <MainLayout>
            <Routes>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/merchants/merchants" element={<Merchants />} />
              {/* <Route path="/merchant/credentials" element={<MerchantCredentials />} /> */}
              <Route path="/merchant/credentials/:merchantCode" element={<MerchantCredentials />} />
              <Route path="/merchant/credentials/merchantPopUpForm" element={<MerchantPopUpForm />} />
              {/* Add other routes */}
              <Route path="/transaction" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />

              {/* Compliance Routes */}

              <Route path="/compliance" element={<Compliance />} >
                <Route path="contact" element={<ContactForm />} />
                <Route path="profile" element={<ProfileForm />} />
                <Route path="owner" element={<OwnerForm />} />
                <Route path="account" element={<AccountForm />} />
                <Route path="service-agreement" element={<MerchantServiceAgreement />} />
                <Route index element={<Navigate to='profile' />} />
              </Route>

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

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Dashboard from '../pages/Dashboard';
// import MainLayout from '../layout/MainLayout';
// import Merchants from '../pages/Merchants/Merchants';
// import MerchantCredentials from '../pages/Merchants/MerchantCredentials';
// import MerchantPopUpForm from '../pages/Merchants/MerchantPopUp';
// import LoginPage from '../pages/auth/LoginPage';
// import RegisterPage from '../pages/auth/RegisterPage';
// import RegisterMultiStepPage from '../pages/auth/RegisterMultiStepPage';
// import Customers from '../pages/Customers/Customers';
// import Transactions from '../pages/Transactions/Transactions';
// import Settings from '../pages/Settings/Settings';
// import ConfirmEmailPage from '../pages/auth/ConfirmEmailPage';
// import ContactForm from '../pages/Compliance/components/contactStep';
// import ProfileForm from '../pages/Compliance/components/profileStep';
// import OwnerForm from '../pages/Compliance/components/ownerStep';
// import AccountForm from '../pages/Compliance/components/accountStep';
// import MerchantServiceAgreement from '../pages/Compliance/components/serviceAgreement';
// import Compliance from '../pages/Compliance/Compliance';
// import { loginSuccess } from '../pages/auth/authSlice'; // Assuming you have a loginSuccess action to set the state

// const RoutesSystem = () => {
//   const dispatch = useDispatch();
//   const { isLoggedIn } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Check if accessToken exists in localStorage
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       // If a token exists, set isLoggedIn to true
//       dispatch(loginSuccess({ accessToken: token }));
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       {
//         !isLoggedIn
//           ? <Routes>
//             <Route index element={<LoginPage />} />
//             <Route path='register' element={<RegisterPage />} />
//             <Route path='confirm-email' element={<ConfirmEmailPage />} />
//             <Route path='complete-registration' element={<RegisterMultiStepPage />} />
//             {/* Redirect any unknown routes to login */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//           : <MainLayout>
//             <Routes>
//               <Route path="/home" element={<Dashboard />} />
//               <Route path="/customers" element={<Customers />} />
//               <Route path="/merchants/merchants" element={<Merchants />} />
//               <Route path="/merchant/credentials/:merchantCode" element={<MerchantCredentials />} />
//               <Route path="/merchant/credentials/merchantPopUpForm" element={<MerchantPopUpForm />} />
//               <Route path="/transaction" element={<Transactions />} />
//               <Route path="/settings" element={<Settings />} />

//               {/* Compliance Routes */}
//               <Route path="/compliance" element={<Compliance />}>
//                 <Route path="contact" element={<ContactForm />} />
//                 <Route path="profile" element={<ProfileForm />} />
//                 <Route path="owner" element={<OwnerForm />} />
//                 <Route path="account" element={<AccountForm />} />
//                 <Route path="service-agreement" element={<MerchantServiceAgreement />} />
//                 <Route index element={<Navigate to='profile' />} />
//               </Route>

//               {/* Redirect any unknown routes to /home */}
//               <Route path="*" element={<Navigate to="/home" />} />
//             </Routes>
//           </MainLayout>
//       }
//     </Router>
//   );
// };

// export default RoutesSystem;
