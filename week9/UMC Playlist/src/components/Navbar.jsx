import { useSelector } from "react-redux";
import styled from "styled-components";
import { CartIcon } from "../constants/icon";

const Navbar = () => {
    const { totalQuantity } = useSelector((store) => store.carts);

    return (
        <Nav>
            <NavCenter>
                <h3>UMC PlayList</h3>
                <NavContainer>
                    <CartIcon />
                    <TotalAmount>{totalQuantity}</TotalAmount>
                </NavContainer>
            </NavCenter>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
    margin:0 auto;
    width: 580px;
    border-radius:20px 20px 0 0;
    background-color: skyblue;
    color: white;
    padding: 15px 30px;
`;

const NavCenter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const TotalAmount = styled.div`
    color: white;
`;
