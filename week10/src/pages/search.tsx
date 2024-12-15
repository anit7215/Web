import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

type movieType={
    id:number;
    poster_path:string;
    title:string;
}
const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchparams] = useSearchParams({
        mq: ''
    });

    const mq = searchParams.get('mq');

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
    };

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    };

    useEffect(() => {
        if (mq) {
            const fetchMovies = async () => {
                setIsLoading(true);
                setIsError(false);
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`, {
                        headers: {
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMTI1ODM0Ni41Njk0MDQ0LCJzdWIiOiI2NzE3YTgxNThlMDVhOGM5YTg0ZDM2ZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TdQa9c2ka5Ao7cQo6EhS4U9RrpoqpwFL92Y2kWGIMg0',
                            'accept': 'application/json'
                        }
                    });
                    const data = await response.json();
                    setMovies(data.results);
                } catch (error) {
                    setIsError(true);
                    console.error('Error fetching movies:', error);
                }
                setIsLoading(false);
            };

            fetchMovies();
        }
    }, [mq]);

    return (
        <Search>
            <SearchContainer>
                <input
                    placeholder="영화 제목을 입력해주세요..."
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieWithKeyboard}
                />
                <button onClick={handleSearchMovie}>검색</button>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error loading movies.</p>}
            </SearchContainer>

            <SearchResultsContainer>
                {mq && movies.length === 0 && !isLoading && !isError && (
                    <p>해당하는 검색어 "{mq}"에 해당하는 데이터가 없습니다</p>
                )}
                {isLoading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <MovieItem key={index}>
                            <SkeletonImage />
                            <SkeletonText />
                        </MovieItem>
                    ))
                    : movies.map((movie:movieType) => (
                        <MovieItem key={movie.id}>
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}
                            <div>
                                <h3>{movie.title}</h3>
                            </div>
                        </MovieItem>
                    ))}
            </SearchResultsContainer>
        </Search>
    );
};

export default SearchPage;

const Search = styled.div`
    display:flex;
    flex-direction:column;
`
const SearchContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    margin-left: 20px;
    input {
        flex: 1;
        padding: 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
    }
    button {
        width: 80px;
        background-color: pink;
        color: white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;

const SearchResultsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30px;
    margin-left: 20px;
    color: white;
`;

const MovieItem = styled.div`
    display: flex;
    width: 150px;
    margin-bottom: 20px;
    text-align: center;
    flex-wrap: wrap;
    justify-content:space-evenly; 
    align-items: left;
    
    img {
        width: 100%;
        border-radius: 5px;
    }

    h3 {
        font-size: 14px;
        margin-top: 10px;
    }
`;

const SkeletonImage = styled.div`
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 5px;
    animation: skeleton-loading 1.5s infinite ease-in-out;
`;

const SkeletonText = styled.div`
    width: 60%;
    height: 20px;
    margin-top: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    animation: skeleton-loading 1.5s infinite ease-in-out;
`;

const SkeletonAnimation = `
    @keyframes skeleton-loading {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #cfcfcf;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
`;