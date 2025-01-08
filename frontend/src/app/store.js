import {configureStore} from "@reduxjs/toolkit";
import productSlice from "../Components/Redux/Products/products.Slice.js"
import productFilterReducer from "../Components/Redux/Products/ProductFilter.js";
import loginReducer from "../Components/Redux/auth/auth.login.js"

const store = configureStore({
   reducer:{
    products:productSlice,
    product:productFilterReducer,
    login:loginReducer
   }
})


export default store;