import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleProduct: null,
  loading: false,
  error: null,
  cartStatus: null, // For tracking add-to-cart actions
  cartItems: null,
};

// Thunk to fetch a single product
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_URL}/api/products/${productId}`
      );
      console.log("log from fetchSingleProduct:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a product to the cart
export const addCart = createAsyncThunk(
  "product/addCart",
  async ({ userId, productId, qty }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_URL}/api/addtocart`,
        {
          userId,
          productId,
          qty,
        },
        { withCredentials: true }
      );
      console.log("Add to cart redux log:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "product/fetchCartItems",
  async (id, { rejectWithValue }) => {
    console.log("userid", id);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_URL}/api/getcartitems/${id}`,
        { withCredentials: true }
      );
      console.log("GetCartItems:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "product/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    console.log("id for delete", userId , productId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_URL}/api/deletecartitem`,
        { userId, productId }
      );
      console.log("Cart item deleted:", response.data);
      return response.data.updatedCart;
    } catch (error) {
      console.error("Error deleting cart item in Redux:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Product slice
const productFilterReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetCartStatus: (state) => {
      state.cartStatus = null; // Reset cart status
    },
  },
  extraReducers: (builder) => {
    // Fetch single product cases
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add to cart cases
    builder
      .addCase(addCart.pending, (state) => {
        state.cartStatus = "loading";
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cartStatus = "success";
      })
      .addCase(addCart.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.error = action.payload;
      });

      // get Cart Items to Show

    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log("Fulfilled action payload:", action.payload);
        state.loading = false;
        state.cartItems = action.payload; // Ensure you're updating `cartItems`
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      //delete cart item and getting return as update cart 
      builder
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log("Fulfilled action payload:", action.payload);
        state.loading = false;
        state.cartItems = action.payload; // Ensure you're updating `cartItems`
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporting the reducer and actions
export const { resetCartStatus } = productFilterReducer.actions;
export default productFilterReducer.reducer;
