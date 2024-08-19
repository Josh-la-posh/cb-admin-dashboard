// src/features/complianceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileComplete: false,
  contactComplete: false,
  ownerComplete: false,
  accountComplete: false,
  serviceAgreementComplete: false,
};

export const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    setProfileComplete: (state) => {
      state.profileComplete = true;
    },
    setContactComplete: (state) => {
      state.contactComplete = true;
    },
    setOwnerComplete: (state) => {
      state.ownerComplete = true;
    },
    setAccountComplete: (state) => {
      state.accountComplete = true;
    },
    setserviceAgreementComplete: (state) => {
      state.serviceAgreementComplete = true;
    },
    // Add other setters for each form step
  },
});

export const { setProfileComplete, setContactComplete, setOwnerComplete, setAccountComplete, setserviceAgreementComplete } = complianceSlice.actions;
export default complianceSlice.reducer;
