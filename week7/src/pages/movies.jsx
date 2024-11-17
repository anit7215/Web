import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieList from "../components/movieList";
import SkeletonLoader from "../components/skeleton"; 
import LoadingSpinner from '../components/loadingSpinner'; 
import { useInView } from "react-intersection-observer"; 

const MoviesPage = () => {
    const { category } = useParams(); // 동적 경로의 category 파라미터 가져오기

    const apiUrls = {
        "popular": "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=",
        "now-playing": "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=",
        "top-rated": "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=",
        "up-coming": "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=",
    };

    const url = apiUrls[category];

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPreviousData,
        fetchPreviousPage,
    } = useInfiniteQuery({
        queryKey: ["movies", category], 
        queryFn: async ({ pageParam = 1 }) => {
            const response = await fetch(`${url}${pageParam}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            return await response.json();
        },
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : false;
        },
        getPreviousPageParam: (firstPage) => {
            return firstPage.page > 1 ? firstPage.page - 1 : false;
        }
    });

    // 로딩 처리
    const [loadingDelay, setLoadingDelay] = useState(true);
    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => setLoadingDelay(false), 1000); 
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    // 에러 처리
    if (isError) {
        return <div style={{ color: 'white' }}>에러 발생: {error.message}</div>;
    }

    // IntersectionObserver 설정
    const lastElementRef = useRef();
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 1.0, // 화면 하단에 도달 시 트리거
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading && loadingDelay) {
        return (
            <div style={{ color: 'white' }}>
                <SkeletonLoader active paragraph={{ rows: 10 }} />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <LoadingSpinner size="large" />
                </div>
            </div>
        );
    }

    if (!data?.pages) {
        return <div>영화 데이터를 찾을 수 없습니다.</div>;
    }
    console.log(data.pages);


    return (
        <div style={{ padding: '20px' }}>
            <MovieList movies={data.pages.flatMap(page => page.results)} />
            
            {isFetchingNextPage && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <SkeletonLoader />
                    <LoadingSpinner />
                </div>
            )}

            {hasNextPage && (
                <div ref={ref} style={{ height: '20px' }} />
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button 
                    onClick={() => fetchPreviousPage()} 
                    disabled={data.pages[0].page === 1}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        backgroundColor: data.pages[0].page === 1 ? '#ccc' : 'pink',
                        color: '#fff',
                        border: 'none',
                        cursor: data.pages[0].page === 1 ? 'not-allowed' : 'pointer',
                    }}
                >
                    이전
                </button>
                <button 
                    onClick={() => fetchNextPage()} 
                    disabled={!hasNextPage}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        backgroundColor: hasNextPage ? 'hotpink' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        cursor: hasNextPage ? 'pointer' : 'not-allowed',
                    }}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default MoviesPage;
