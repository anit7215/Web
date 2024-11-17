import { axiosInstance } from "../../axios-instance";

const useGetMovies = async ()=>{
    const {data} = await axiosInstance.get('/movies/${category}?language=ko-KRS&page=${pageParam}')

    return data;
}

export {useGetMovies}