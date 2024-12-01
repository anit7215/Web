//cart/cartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItem";

const initialState = {
    carts: cartItems,
    totalQuantity: 0,
    totalAmount: 0,
};

export const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        //증가
        increase: (state, { payload }) => {
            const itemId = payload;
            const item = state.carts.find((cartItem) => cartItem.id === itemId);
            if (item) {
                item.amount += 1;
            }
        },
        decrease: (state, { payload }) => {
            const itemId = payload;
            const item = state.carts.find((cartItem) => cartItem.id === itemId);
            if (item) {
                if (item.amount > 1) {
                    item.amount -= 1;
                } else {
                    state.carts = state.carts.filter((cartItem) => cartItem.id !== action.payload);
                }
            }
        },
        removeItem: (state, { payload }) => {
            const itemId = payload;
            state.carts = state.carts.filter((cartItem) => cartItem.id !== itemId);
        },
        clearCart: (state) => {
            state.carts = [];
        },
        calculateTotals: (state) => {
            state.totalQuantity = state.carts.reduce((total, item) => {
                return total + item.amount;
            }, 0);
            state.totalAmount = state.carts.reduce((total, item) => {
                return total + item.price * item.amount;
            }, 0);
        }
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;