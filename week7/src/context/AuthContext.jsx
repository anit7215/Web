import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    const [email, setEmail] = useState(localStorage.getItem('email') || '');  // 상태로 이메일 관리

    // 로그인
    const login = (email, accessToken, refreshToken) => {
        setIsLogin(true);
        setAccessToken(accessToken);
        
        // localStorage에 값 저장
        localStorage.setItem('accessToken', accessToken); 
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', email);  // 이메일을 localStorage에 저장

        // 콘솔로 값 확인
        console.log("로그인한 이메일:", email);  // 이메일 값 확인
        console.log("localStorage email:", localStorage.getItem('email'));  // localStorage에서 이메일 확인

        setEmail(email.split('@')[0]);  // 이메일 앞부분만 상태로 저장
        console.log("setEmail 후 이메일 상태:", email.split('@')[0]);  // 상태 확인
    };

    // 로그아웃
    const logout = () => {
        setIsLogin(false);
        setAccessToken(null);
        setEmail('');  // 이메일 상태 초기화
        localStorage.removeItem('email');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // 로그아웃 후 상태 확인
        console.log("로그아웃 후 이메일 상태:", email);  // 로그아웃 후 이메일 상태 확인
    };

    return (
        <AuthContext.Provider value={{ isLogin, email, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
