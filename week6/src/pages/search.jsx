import styled from 'styled-components';
const SearchPage = () => {
    return (
        <SearchContainer>
            <input placeholder="영화 제목을 입력해주세요..." />
            <button>검색</button>
        </SearchContainer>
        
    );
};

export default SearchPage;

const SearchContainer=styled.div`
    display:flex;
    justify-conent:center;
    input{
        flex: 1;
        padding:15px;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        border: 1px solid rgb(220,220,220);
    }
    button{
        width: 80px;
        background-color:pink;
        color:white;
        cursor:pointer;
        border:none;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
    }
`
