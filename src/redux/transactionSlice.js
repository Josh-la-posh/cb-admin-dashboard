import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: []
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    transactionData: (state, action) => {
        state.transactions = [...state.transactions, ...action.payload];
    }
  },
});

export const { transactionData } = transactionSlice.actions;

export default transactionSlice.reducer;
