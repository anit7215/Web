// movie.jsx
import React from "react";
import styled from "styled-components";

type MovieProps = {
    movie: {
        poster_path: string; 
        title: string;     
        release_date: string;
        overview: string;    
    };
}

const Movie = ({ movie }:MovieProps) => { 
   
    return (
        <Card>
            <CardImg 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
            />
            <Overlay/>
            <Title>
                {movie.title}
            </Title>
            <Date>
                {movie.release_date}
            </Date>
            <Overview>
                {movie.overview}
            </Overview>
        </Card>
    );
};

export default Movie;

const Card = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    color:white;
    overflow:hidden;
    margin:20px;
    width: 100px;
    height:200px;
`;

const CardImg = styled.img`
    object-fit:cover;
    border-radius: 20px;
`;

const Overlay=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4); 
    opacity: 0;
    transition: opacity 0.3s; 
    
    ${Card}:hover & {
        opacity: 1; /* 마우스 오버 시 오버레이 보이게 */
    }
`;

const Title=styled.h2`
    margin:10px 0px 0px 0px;
    font-size:12px;
`
const Date=styled.h2`
    font-size:9px;
`
const Overview=styled.h4`
    font-size:6px;
`