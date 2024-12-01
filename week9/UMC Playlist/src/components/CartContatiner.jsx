import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CartItem from "./CartItem";
import { clearCart, calculateTotals } from "../features/cart/cartSlice";

const CartContainer = () => {
  const { carts, totalQuantity, totalAmount } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [carts, dispatch]);

  if (carts.length === 0) {
    return <Title>당신이 선택한 음반</Title>;
  }

  return (
    <CartContainerWrapper>
      <Title>UMC PlayList</Title>
      {carts.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <FooterWrapper>
        <hr />
        <h4>
          총 금액: {totalAmount.toLocaleString()}원
        </h4>
        <button onClick={() => dispatch(clearCart())}>장바구니 비우기</button>
      </FooterWrapper>
    </CartContainerWrapper>
  );
};

export default CartContainer;
const CartContainerWrapper = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const FooterWrapper = styled.footer`
  margin-top: 20px;
  text-align: center;

  button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #ff6b6b;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #ff5252;
    }
  }
`;