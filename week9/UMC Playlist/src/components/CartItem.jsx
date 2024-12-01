import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <CartItemWrapper>
      <ItemInfo>
        <ItemImage>
          <img src={img} alt={title} />
        </ItemImage>
        <div>
          <h4>{title}</h4>
          <p>{singer}</p>
          <p>{parseInt(price).toLocaleString()}원</p>
        </div>
      </ItemInfo>
      <ControlsWrapper>
        <Controls>
        <button onClick={() => amount > 1 ? dispatch(decrease(id)) : dispatch(removeItem(id))}>-</button>
          <span>{amount}</span>
          <button onClick={() => dispatch(increase(id))}>+</button>
        </Controls>
      </ControlsWrapper>
    </CartItemWrapper>
  );
};

export default CartItem;

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ItemImage = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    object-fit: cover;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: skyblue;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
    margin: 0 5px;

    &:hover {
      background-color: gold;
    }
  }

  span {
    margin: 0 10px;
    font-size: 16px;
  }
`;
