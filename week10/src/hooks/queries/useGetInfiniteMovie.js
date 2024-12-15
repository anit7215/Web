import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetInfiniteMovie = (url) => {
  const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get(`${url}&page=${pageParam}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4`, 
      }
    });
    console.log("API 응답 데이터:", response.data); 
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["movies", url], 
    queryFn: fetchMovies, 
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export default useGetInfiniteMovie;
