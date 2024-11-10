// MoviesPage.jsx
import MovieList from "../components/movieList";
import { useParams } from "react-router-dom";

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

    return <MovieList url={url} />;
};

export default MoviesPage;