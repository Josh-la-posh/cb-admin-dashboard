// src/features/complianceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    complianceData: {
        merchantId: "",
        aggregatorId: "",
        merchantCode: "",
        tradingName: "",
        description: "",
        staffSize: "",
        annualProjectedSalesVolume: "",
        industry: "",
        category: "",
        businessType: "",
        businessEmail: "",
        phoneNumber: "",
        officeAddress: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        idDocument: "",
        idNumber: "",
        sameAsBusinessAddress: true,
        documentName: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
        sla: "",
        slaBoolean: true,
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
            const { 
                firstName,
                lastName,
                dateOfBirth,
                nationality,
                idDocument,
                idNumber,
                sameAsBusinessAddress,
                documentName,
            } = state.complianceData;
            if (
                firstName.trim() !== '' &&
                lastName.trim() !== '' &&
                dateOfBirth.trim() !== '' &&
                nationality.trim() !== '' &&
                idDocument.trim() !== '' &&
                idNumber.trim() !== '' && 
                sameAsBusinessAddress.trim() !== '' &&
                documentName.trim() !== ''
            ) {
                state.businessComplete = true;
            } else {
                state.businessComplete = false;
            }
        },
        setBankComplete: (state) => {
            const { 
                bankName,
                accountName,
                accountNumber,
            } = state.complianceData;
            if (
                bankName.trim() !== '' &&
                accountName.trim() !== '' &&
                accountNumber.trim() !== ''
            ) {
                state.bankComplete = true;
            } else {
                state.bankComplete = false;
            }
        },
        setserviceAgreementComplete: (state) => {
            const {slaBoolean} = state.complianceData;
            if (slaBoolean === true) {
                state.serviceAgreementComplete = true;
            } else {
                state.serviceAgreementComplete = false;
            }
        },
        // Add other setters for each form step
    },
});

export const { setProfileComplete, setContactComplete, setBusinessComplete, setBankComplete, setserviceAgreementComplete, setComplianceData } = complianceSlice.actions;
export default complianceSlice.reducer;