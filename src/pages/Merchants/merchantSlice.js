import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    amount: '',
    currency: 'NGN',
    merchantReference: '',
    callbackUrl: '',
    splitCode: '',
    customer: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: 'Lagos',
      stateCode: '',
      postalCode: '',
      country: 'Nigeria',
    },
    integrationKey: '',
    mccCategory: '',
    merchantDescriptor: '',
    shouldTokenizeCard: false,
  },
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;