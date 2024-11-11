import axios from "axios";

const axiosInstance=axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4`,
    },
    
})


// 토큰을 설정하는 함수
const setAuthToken = (token) => {
    if (token) {
        // 토큰이 있으면 헤더에 추가
        axiosInstance.defaults.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU5M2Y2YTg3ZjE3Nzk2NTdmZjYyMjliNzU1NWE5NiIsIm5iZiI6MTczMDAzODI1Ny4zMjAxNTcsInN1YiI6IjY3MTdhODE1OGUwNWE4YzlhODRkMzZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLVjVxyqWXBp0_Nsg7IQ0wZKtR24EpoGWu4M-2cbmH4`;
    } else {
        // 토큰이 없으면 Authorization 헤더 제거
        delete axiosInstance.defaults.headers['Authorization'];
    }
};

export { axiosInstance, setAuthToken };