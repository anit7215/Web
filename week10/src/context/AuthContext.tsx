import { createContext, useState, useContext, ReactNode } from 'react';
import React from 'react';

// AuthContext의 타입 정의
type AuthContextType = {
    isLogin: boolean;
    email: string;
    accessToken: string | null;
    login: (email: string, accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

// 초기값을 undefined로 설정하고, Provider에서 값을 제공
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken') || null);
    const [email, setEmail] = useState<string>(localStorage.getItem('email') || '');  // 상태로 이메일 관리

    // 로그인
    const login = (email: string, accessToken: string, refreshToken: string) => {
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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
