import Movie from './movie.jsx';
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieList = ({ url }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4`
                    }
                });
                setMovies(response.data.results); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
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

const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;  // 가운데 정렬보다 상단 정렬이 더 자연스러울 수 있음
    min-height: 100vh;
    gap: 20px;  // 카드 간의 간격 설정
`;


// const CardList = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content:space-evenly; 
//     align-items: center;
// `;