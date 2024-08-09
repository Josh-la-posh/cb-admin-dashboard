import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import merchantReducer from '../pages/Merchants/merchantSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    merchant: merchantReducer
  },
});
