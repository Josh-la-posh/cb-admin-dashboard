import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import merchantReducer from '../pages/Merchants/merchantSlice'
import complianceReducer from '../pages/Compliance/complianceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    merchant: merchantReducer,
    compliance: complianceReducer
  },
});