// home.jsx
import MovieList from "../components/movieList";

const HomePage = () => {
    return (
        <>
        <h1>Home Page 야호~!</h1>
        {<MovieList url={`${import.meta.env.VITE_TMDB_MOVIE_API_URL}/movie/top_rated`}/>} 
        </>
        
    );
};

export default HomePage;