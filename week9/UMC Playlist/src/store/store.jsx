// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import carts from "../features/cart/cartSlice";
import modalReducer from "../features/modal/modalSlice";

export default configureStore({
    reducer: {
        carts,
        modal: modalReducer, 
    },
});