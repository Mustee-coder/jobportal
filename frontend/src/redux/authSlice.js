import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    user: null,
    error: null,
  },

  reducers: {

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  setError,
  clearUser,
} = authSlice.actions;

export default authSlice.reducer;