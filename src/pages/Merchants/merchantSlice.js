import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
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
  },
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;