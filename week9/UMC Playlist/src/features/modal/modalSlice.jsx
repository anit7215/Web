//features/modal/modalSlice.jsx
import { createSlice } from "@reduxjs/toolkit"


const initialState={
    isOpen:false,
}

const modalSlice=createSlice({
    name:'madal',
    initialState,
    reducers:{
        // TODO 모델 열기
        openModal:(state, action)=>{
            state.isOpen=true;
        },
        // TODO 모델 열기
        closeModal:(state, action)=>{
            state.isOpen=false;
        }

    }
})


export const {openModal, closeModal}=modalSlice.actions;
export default modalSlice.reducer;