// MovieList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Movie from "./movie";

// 영화 데이터 타입 정의 
type MovieType = {
    id: number; 
    title: string; 
    poster_path: string; 
    release_date: string; 
    overview: string; 
}

// MovieList 컴포넌트 props 타입 정의
type MovieListProps = {
    url: string; 
}

const MovieList = ({ url }: MovieListProps) => {
    const [movies, setMovies] = useState<MovieType[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4`, 
                    },
                });
                setMovies(response.data.results); // 영화 데이터 설정
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        getMovies();
    }, [url]);

    if (loading) return <p>Loading...</p>; // 로딩 상태 표시
    if (error) return <p>Error: {error}</p>; // 에러 상태 표시

    return (
        <CardList>
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </CardList>
    );
};

export default MovieList;

// Styled Components
const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start; // 상단 정렬
    min-height: 100vh;
    gap: 20px; // 카드 간의 간격 설정
`;
