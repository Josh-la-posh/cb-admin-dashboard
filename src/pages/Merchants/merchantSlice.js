import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Store initial state outside the slice
const initialState = {
  amount: '',
  currency: 'NGN',
  merchantReference: uuidv4(),
  narration: "Pay the bearer",
  callbackUrl: 'https://codebytesltd.com',
  splitCode: '',
  customer: {
    id: uuidv4(),
    firstName: 'Smith',
    lastName: 'Ray',
    email: 'test2@example.com',
    phoneNumber: '+234 804 234 4234',
    address: '1 Victoria Island',
    city: 'Lagos',
    stateCode: 'LG',
    postalCode: '100001',
    country: 'Nigeria',
  },
  integrationKey: uuidv4(),
  mccCategory: 0,
  merchantDescriptor: 'Pay the Bearer',
  shouldTokenizeCard: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState, // Reset to initialState
  },
});

export const { updateForm, resetForm } = formSlice.actions;

export default formSlice.reducer;
