import NowPlaying from '../assets/img/river.png'; 
import Popular from '../assets/img/sky.jpg';
import TopRated from '../assets/img/skyscrapers.jpg';
import Upcoming from '../assets/img/waves.jpg';

export const Category = {
    results: [
        {
            id: 1,
            title: "현재 상영중인",
            image: NowPlaying, 
            overview: "현재 상영중인",
            link:"now-playing"
        },
        {
            id: 2,
            title: "인기있는",
            image: Popular, 
            overview: "인기있는",
            link:"popular"
        },
        {
            id: 3,
            title: "높은 평가를 받은",
            image: TopRated, 
            overview: "높은 평가를 받은",
            link:"top-rated"
        },
        {
            id: 4,
            title: "개봉 예정중인",
            image:Upcoming, 
            overview: "개봉 예정중인",
            link:"up-coming"
        },
        
    ],
};

