import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CartContainer from "./components/CartContatiner"; 
import Footer from "./components/Footer"; 
import Navbar from "./components/Navbar"; 
import { calculateTotals } from "./features/cart/cartSlice"; 
import Modal from "./components/Modal";

const App = () => {
    const dispatch = useDispatch();
    // Modal 상태 가져오기
    const { isOpen } = useSelector((state) => state.modal);  // modal 상태를 가져옴


    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch]);

    return (
        <AppWrapper>
            <Navbar /> 
            <CartContainer /> 
            <Footer /> 
            {isOpen && (<Modal><h3>담아두신 모든 음반을 삭제하시겠습니까?</h3></Modal>
      )}
        </AppWrapper>
    );
};

export default App;

const AppWrapper = styled.div`
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    min-height: 100vh;
    padding: 20px;
`;
