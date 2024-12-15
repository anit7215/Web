import styled from "styled-components";
import { Category } from "../mocks/category";
import { Link } from "react-router-dom";
import React from "react";

type CategoryItem = {
    id: number;
    link: string;
    image: string;
    title: string;
};

type CardProps = {
    backgroundImage: string;
};

const Select = () => {
    return (
        <ImageContainer>
            {Category.results.map((category:CategoryItem) => (
                <Link key={category.id} to={category.link}>
                    <Card 
                        style={{ backgroundImage: `url(${category.image})` }} 
                    >
                        <CategoryTitle>{category.title}</CategoryTitle>
                    </Card>
                </Link>
            ))}
        </ImageContainer>
    );
};

export default Select;

const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    align-items: center;
    gap: 20px; /* 카드 간 간격 */
`;

const Card = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center; 
    border-radius: 10px;
    color: white;
    overflow: hidden;
    margin: 10px;
    width: 340px; /* 카드 너비 */
    height: 180px; /* 카드 높이 */
    background-size: cover;
    background-position: center; /* 배경 이미지 중앙 정렬 */
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.05); /* hover 시 크기 확대 */
    }
    &:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        transition: background-color 0.3s ease;
    }
`;

const CategoryTitle = styled.h3`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%); /* 글씨 중앙 정렬 */
    color: white;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.5); /* 배경을 더 어둡게 설정 */
    border-radius: 5px;
    z-index: 1; /* 글씨가 배경 위에 오도록 설정 */
`;
