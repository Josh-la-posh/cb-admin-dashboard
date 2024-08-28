import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  disputes: []
};

const disputeSlice = createSlice({
  name: 'dispute',
  initialState,
  reducers: {
    disputeData: (state, action) => {
        state.disputes = [...state.disputes, ...action.payload];
    }
  },
});

export const { disputeData } = disputeSlice.actions;

export default disputeSlice.reducer;
