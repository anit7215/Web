import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

type AuthContextType = {
    isLogin: boolean;
    email: string | null;
    logout: () => void;
};


const Navbar = () => {
    const navigate = useNavigate();
    const { isLogin, email, logout } = useAuth() as AuthContextType;  // 이메일을 AuthContext에서 가져옴

    // 로그 출력: isLogin과 email 값 확인
    console.log("isLogin:",isLogin, "email:",email);

    const handleLogout = () => {
        logout();  // 로그아웃 함수 호출
        console.log("로그아웃됨, 이메일 상태 초기화");
        navigate('/login');  // 로그인 페이지로 이동
    };

    return (
        <Nav>
            <Logo to="/">CATFLIX</Logo>
            <ButtonContainer>
                {isLogin ? ( // 로그인 상태일 때
                    <>
                        <Nickname>안녕하세요, {email}님!</Nickname>
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    </>
                ) : ( // 비로그인 상태일 때
                    <>
                        <Login to="/login">로그인</Login>
                        <Signup to="/signup">회원가입</Signup>
                    </>
                )}
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

const Nickname = styled.span`
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
`;

const LogoutButton = styled.button`
    background-color: gray;
    border: none;
    border-radius: 10px;
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    color: white;
    font-weight: bold;

    &:hover {
        background-color: pink;
    }
`;
