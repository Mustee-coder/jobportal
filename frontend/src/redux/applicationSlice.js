import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",

  initialState: {
    loading: false,
    applicants: [],
  },

  reducers: {

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },

    clearApplicants: (state) => {
      state.applicants = [];
    },
  },
});

export const {
  setLoading,
  setAllApplicants,
  clearApplicants,
} = applicationSlice.actions;

export default applicationSlice.reducer;