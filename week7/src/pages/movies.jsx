import MovieList from "../components/movieList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const MoviesPage = () => {
    const { category } = useParams(); // 동적 경로의 category 파라미터 가져오기

    // category에 따라 URL을 설정하는 매핑 객체
    const apiUrls = {
        "popular": "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        "now-playing": "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
        "top-rated": "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
        "up-coming": "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1"
    };

    // 현재 category에 맞는 URL을 전달
    const url = apiUrls[category];

    if (!url) {
        return <div><h1 style={{ color: 'white' }}>잘못된 카테고리입니다.</h1></div>;
    }

    // useQuery를 활용한 데이터 요청
    const {
        data: movies,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["movies", category], // 쿼리 키
        queryFn: async () => {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4` 
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            console.log(data); // API 응답 내용 확인
            return data;
        },
    });

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <div style={{ color: 'white' }}>
                <h1>로딩 중...</h1>
            </div>
        );
    }

    // 에러 상태 처리
    if (isError) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>에러 발생: {error.message}</h1>
            </div>
        );
    }

    console.log(movies?.results); // 영화 데이터 확인

    if (movies && movies.results) {
        return <MovieList url={url} />;
    } else {
        return <div>영화 데이터를 찾을 수 없습니다.</div>;
    }
};

export default MoviesPage;
