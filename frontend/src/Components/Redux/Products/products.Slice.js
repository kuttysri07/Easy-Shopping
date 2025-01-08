import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${import.meta.env.VITE_REACT_URL}/api/products`);
  console.log("log from slice",response.data);
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;

