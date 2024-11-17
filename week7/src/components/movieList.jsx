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
                        Authorization: `Bearer YOUR_API_KEY`
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
    align-items: flex-start;  // 상단 정렬
    min-height: 100vh;
    gap: 20px;  // 카드 간의 간격 설정
`;
