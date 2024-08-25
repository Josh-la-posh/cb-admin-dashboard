import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import merchantReducer from '../pages/Merchants/merchantSlice'
import complianceReducer from './complianceSlice';
import transactionSlice from './transactionSlice';
import customerSlice from './customerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    merchant: merchantReducer,
    compliance: complianceReducer,
    transaction: transactionSlice,
    customer: customerSlice
  },
});