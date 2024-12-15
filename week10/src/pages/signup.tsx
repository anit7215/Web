// signup.tsx
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from '../axios-instance';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 유효성 검사를 위한 스키마 정의
const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 반드시 입력해주세요.'),
    password: yup
        .string()
        .min(8, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
        .max(16, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
        .required('비밀번호를 반드시 입력해주세요.'),
    passwordCheck: yup
        .string()
        .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.') // 비밀번호와 일치하는지 확인
        .required('비밀번호 검증 또한 필수 입력요소입니다.'),
});

type FormData = {
    email: string;
    password: string;
    passwordCheck: string;
};

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange', // 입력 시 즉시 유효성 검사를 수행
    });

    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 사용

    // 폼 제출 함수
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data.email, data.password, data.passwordCheck);
        try {
            // 회원가입 API 요청
            const response = await axiosInstance.post('/auth/register', {
                email: data.email,
                password: data.password,
                passwordCheck: data.passwordCheck,
            });
            // 회원가입 성공 후 로그인 페이지로 리디렉션
            console.log("회원가입 성공: ", response.data);
            alert('회원가입이 완료되었습니다!');
            navigate('/login'); // 로그인 페이지로 이동
        } catch (error) {
            console.log("회원가입 실패: ", error);
            alert('회원가입 실패. 다시 시도해주세요!');
        }
    };

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Title>회원가입</Title>
            <div>
                <Input
                    type="email"
                    {...register('email')}
                    placeholder="이메일을 입력하세요."
                    hasError={!!errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div>
                <Input
                    type="password"
                    {...register('password')}
                    placeholder="비밀번호를 입력하세요."
                    hasError={!!errors.password}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div>
                <Input
                    type="password"
                    {...register('passwordCheck')}
                    placeholder="비밀번호를 다시 입력해주세요!"
                    hasError={!!errors.passwordCheck}
                />
                {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}
            </div>

            <Button type="submit" disabled={!isValid}>제출</Button>
        </Container>
    );
};

export default SignupPage;


const Container = styled.form`
    width: 300px;
    margin: auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    color: hotpink;
    margin-bottom: 20px;
`;

const Input = styled.input<{ hasError: boolean }>`
    width: 100%;
    height: 60px;
    padding: 10px;
    font-size: 14px;
    box-sizing: border-box;
    padding-bottom: 8px;
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

const Button = styled.button<{ disabled: boolean }>`
    width: 100%;
    height: 50px;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
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
