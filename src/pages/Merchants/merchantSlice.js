import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    amount: '',
    currency: 'NGN',
    merchantReference: 'reference #1',
    callbackUrl: 'www.google.com',
    splitCode: '',
    customer: {
      id: 'csr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      phoneNumber: '+234 804 234 4234',
      address: '1 Victoria Island',
      city: 'Lagos',
      stateCode: 'LG',
      postalCode: '100001',
      country: 'Nigeria',
    },
    integrationKey: '',
    mccCategory: '1984',
    merchantDescriptor: 'Pay the Bearer',
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