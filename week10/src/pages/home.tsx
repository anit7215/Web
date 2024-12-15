// home.jsx
import MovieList from "../components/movieList";
import React from 'react';

const HomePage = () => {
    return (
        <>
        <h1>Home Page 야호~!</h1>
        {<MovieList url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" />} 
        </>
        
    );
};

export default HomePage;