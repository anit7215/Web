import styled from "styled-components";
import {Category} from "../mocks/category";
import {Link} from "react-router-dom";

const Select = () => {
    return (
        <ImageContainer>
            {Category.results.map((category) => (
                <Link key={category.id} to={category.link}> {/* Link에 key 추가 */}
                <Card 
                    style={{ backgroundImage: `url(${category.image})` }} // 배경 이미지 설정
                >
                    <CategoryTitle>{category.name}</CategoryTitle>
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
`;
