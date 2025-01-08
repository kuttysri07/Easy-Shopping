import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the login slice
const initialState = {
  loading: false,
  User: null,
  error: null,
};

// Async thunk for user signup
export const userSignup = createAsyncThunk(
  "login/userSignup",
  async ({ email, password, name }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_URL}/auth/signup`,
        { email, password, name }
      );
      return response.data;
    } catch (error) {
      throw Error(error.response ? error.response.data.message : error.message);
    }
  }
);

// Async thunk for user login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw Error(error.response ? error.response.data.message : error.message);
    }
  }
);

export const userLogout = createAsyncThunk("login/userLogout", async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_URL}/auth/logout`,
      {},
      { withCredentials: true }
    ); // Ensure cookies are sent

    console.log("respose of logout", response.data);
    return response.data;
  } catch (error) {
    throw Error(error.response ? error.response.data.message : error.message);
  }
});

export const checkStatus = createAsyncThunk("login/checkStatus", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_URL}/auth/status`,
      { withCredentials: true }
    );

    return response.data
  } catch (error) {
    throw Error(error.response ? error.response.data.message : error.message);
  }
});

// Login slice definition
const loginReducer = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      // Cases for userLogin
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.User = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Cases for userSignup
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.User = action.payload;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      // Cases for userLogout
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.User = null; // Reset user data on successful logout
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      // Cases for userLogout
      .addCase(checkStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkStatus.fulfilled, (state ,action) => {
        state.loading = false;
        state.User = action.payload; // Reset user data on successful logout
      })
      .addCase(checkStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loginReducer.reducer;
