// src/features/complianceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    complianceData: {
        // id: "",
        // merchantId: "",
        // aggregatorId: "",
        // merchantCode:"",
        // tradingName:"",
        // businessEmail:"",
        // phoneNumber:"",
        // firstName:"",
        // lastName:"",
        // createdBy:"",
        // createdDate:"",
        // updatedDate:"",
        // v: 0,
        // annualProjectedSalesVolume:"",
        // businessType:"",
        // category:"",
        // description:"",
        // industry:"",
        // staffSize:""
    },
    profileComplete: false,
    contactComplete: false,
    businessComplete: false,
    bankComplete: false,
    serviceAgreementComplete: false,
};

export const complianceSlice = createSlice({
    name: 'compliance',
    initialState,
    reducers: {
        setComplianceData: (state, action) => {
            state.complianceData = {...state.complianceData, ...action.payload};
        },
        setProfileComplete: (state) => {
            const {
                tradingName,
                description,
                staffSize,
                annualProjectedSalesVolume,
                industry,
                category,
                businessType
            } = state.complianceData;
        
            // Check if all required fields are non-empty
            if (
                tradingName.trim() !== '' &&
                description.trim() !== '' &&
                staffSize.trim() !== '' &&
                annualProjectedSalesVolume.trim() !== '' &&
                tradingName.trim() !== '' &&
                industry.trim() !== '' &&
                category.trim() !== '' &&
                businessType.trim() !== ''
            ) {
                state.profileComplete = true;
            } else {
                state.profileComplete = false;
            }
        },
        
        setContactComplete: (state) => {
            const {
                businessEmail,
                phoneNumber,
                officeAddress,
            } = state.complianceData;
            if (
                businessEmail.trim() !== '' &&
                phoneNumber.trim() !== '' &&
                officeAddress.trim() !== ''
            ) {
                state.contactComplete = true;
            } else {
                state.contactComplete = false;
            }
        },
        setBusinessComplete: (state) => {
            state.businessComplete = true;
        },
        setBankComplete: (state) => {
            state.bankComplete = true;
        },
        setserviceAgreementComplete: (state) => {
            state.serviceAgreementComplete = true;
        },
        // Add other setters for each form step
    },
});

export const { setProfileComplete, setContactComplete, setBusinessComplete, setBankComplete, setserviceAgreementComplete, setComplianceData } = complianceSlice.actions;
export default complianceSlice.reducer;