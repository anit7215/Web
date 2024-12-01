// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import carts from "../features/cart/cartSlice";

export default configureStore({
    reducer: {
        carts,
    },
});