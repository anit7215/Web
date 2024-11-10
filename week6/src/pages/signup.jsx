// signup.jsx
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//import useForm from '../hooks/use-form.js';
import styled from 'styled-components';

const SignupPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
            .max(16, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
            .required('비밀번호를 반드시 입력해주세요.'),
        passwordCheck: yup
            .string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.') // 비밀번호와 일치하는지 확인
            .required('비밀번호 검증 또한 필수 입력요소입니다.'),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // 입력 시 즉시 유효성 검사를 수행
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출:', data);
    };

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Title>회원가입</Title>
            <div>
                <Input type="email"{...register('email')}placeholder='이메일을 입력하세요.'hasError={!!errors.email}/>
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div>
                <Input type="password"{...register('password')}placeholder='비밀번호를 입력하세요.' hasError={!!errors.password}/>
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
            <div>
                <Input type="password"{...register('passwordCheck')}placeholder='비밀번호를 다시 입력해주세요!' hasError={!!errors.passwordCheck}/>
                {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}
            </div>

            <SubmitButton type="submit" value="제출" disabled={!isValid} />
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
    color: #333;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    height:60px;
    padding: 10px;  
    font-size: 14px;
    box-sizing:border-box;
    padding-bottom:8px;
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

const SubmitButton = styled.input`
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
