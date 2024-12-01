import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CartContainer from "./components/CartContatiner"; 
import Footer from "./components/Footer"; 
import Navbar from "./components/Navbar"; 
import { calculateTotals } from "./features/cart/cartSlice"; 

const App = () => {
    const dispatch = useDispatch();

    // Redux 상태 초기화를 위해 useEffect 사용
    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch]);

    return (
        <AppWrapper>
            <Navbar /> 
            <CartContainer /> 
            <Footer /> 
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
