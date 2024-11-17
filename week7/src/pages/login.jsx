// login.jsx
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//import useForm from '../hooks/use-form.js';
import axios from 'axios';
import styled from 'styled-components';
import { validateLogin } from '../utils/validate';
import { axiosInstance, setAuthToken } from '../axios-instance'; 
import { useNavigate } from 'react-router-dom';


 // 실습1 버전
const LoginPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
            .max(16, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
            .required('비밀번호를 반드시 입력해주세요.'),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', 
    });
    const navigate = useNavigate(); //페이지 이동을 위한 navigate사용
    const onSubmit = async (data) => {
        try {
            // 로그인 API 요청 - axiosInstance 로 포트번호 맞추기.?
            const response = await axiosInstance.post('/auth/login', {
                email: data.email,
                password: data.password,
            });

            // 서버에서 반환된 토큰을 localStorage에 저장
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            // 로그인 성공 후 메인 페이지로 리디렉션
            navigate('/'); // 메인 페이지로 이동

        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 실패. 이메일과 비밀번호를 다시 확인해주세요!');
        }
    };

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Title>로그인</Title>
            <div>
                <Input type="email"{...register('email')}placeholder='이메일을 입력하세요.'hasError={!!errors.email}/>
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div>
                <Input type="password"{...register('password')}placeholder='비밀번호를 입력하세요.' hasError={!!errors.password}/>
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <Button type="submit" disabled={!isValid}>로그인</Button>
        </Container>
    );
};


export default LoginPage;

const Container = styled.form`
    width: 300px;
    margin: auto;
    padding: 20px;
    
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    color: white;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    height:60px;
    padding: 10px;  
    font-size: 14px;
    box-sizing:border-box;
    padidng-bottom:8px;
    border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')};
    border-radius: 10px;
    outline: none;
     margin-top: 8px;
    &:focus {
        border-color: #4CAF50;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin: 0 0 16px 0;
`;

const Button = styled.button`
    width: 100%;
    height:50px;
    padding: 10px;
    font-size: 14px;
    font-weight:bold;
    color: white;
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'pink')};
    border: none;
    border-radius: 10px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s;
    margin-top: 8px;
    &:hover {
        background-color: ${({ disabled }) => (disabled ? 'gray' : 'pink')};
    }
`;
