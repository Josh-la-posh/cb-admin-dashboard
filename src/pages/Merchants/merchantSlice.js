import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    amount: '',
    currency: 'NGN',
    merchantReference: 'reference-yup',
    narration: "Pay the bearer",
    callbackUrl: 'https://codebytesltd.com',
    splitCode: '',
    customer: {
      id: 'tup',
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
    integrationKey: '0992ac17-5808-4835-a8a9-8831d6b0eda6',
    mccCategory: 0,
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