// category.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryPage = () => {
    return (
        <CategoryContainer>
            <CategoryLink to="/movies/now-playing">현재 상영중</CategoryLink>
            <CategoryLink to="/movies/popular">인기 있는</CategoryLink>
            <CategoryLink to="/movies/top-rated">높은 평가</CategoryLink>
            <CategoryLink to="/movies/up-coming">개봉 예정</CategoryLink>
        </CategoryContainer>
    );
};

export default CategoryPage;
const CategoryContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
`;

const CategoryLink = styled(Link)`
    padding: 20px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #333;
    border-radius: 5px;
    background-color: #f7f7f7;
    
    &:hover {
        background-color: #e7e7e7;
    }
`;
