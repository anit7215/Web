//components/ModalButton.jsx
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import styled from "styled-components";
import { closeModal } from "../features/modal/modalSlice";

const ModalButton=()=>{
    const dispatch=useDispatch();

    return(
        <BtnContainer>
            <Button onClick={()=>{
                dispatch(clearCart());
                // TODO 모달꺼지기
                dispatch(closeModal());
            }}>
                네
            </Button>
            <Button onClick={()=>{
                // TODO 모달꺼지기ㅣ
                dispatch(closeModal());
            }}>
                아니요
            </Button>
        </BtnContainer>
    );
};
export default ModalButton;

const BtnContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 20px; 
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 12px 30px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: navy; 
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #6666ff; 
    }
`;