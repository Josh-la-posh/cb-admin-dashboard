import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    customers: []
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        customerData: (state, action) => {
            state.customers = [...state.customers, ...action.payload];
        }
    }
});

export const { customerData } = customerSlice.actions;

export default customerSlice.reducer;