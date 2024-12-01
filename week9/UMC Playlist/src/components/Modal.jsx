// components/Modal.jsx
import ModalButton from "./ModalButton";
import styled from "styled-components";

const Modal=({children})=>{
    return (
        <ModalContainer onClick={(e)=>{}}>
            <ModalContent>
                {children}
                <ModalButton />
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%; 
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
