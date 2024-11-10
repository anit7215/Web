import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Nav>
            <Logo to="/">YONGCHA</Logo>
            <ButtonContainer>
                <Login to="/login">
                    로그인
                </Login>
                <Signup to="/signup">
                    회원가입
                </Signup>
            </ButtonContainer>
            
        </Nav>
    );
};

export default Navbar;

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    padding: 10px 20px;
`;

const Logo = styled(Link)`
    color: pink;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Login = styled(Link)`
    background-color: ${props => props.color || 'gray'};
    border: none;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        background-color: pink;
    }
`;

const Signup = styled(Link)`
    background-color: ${props => props.color || 'gray'};
    border: none;
    border-radius: 10px;
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        background-color: pink;
    }
`;
