import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import MoviesPage from "./pages/movies.jsx";
import SearchPage from"./pages/search.jsx";
import RootLayout from "./layout/root-layout.jsx";
import CategoryPage from './pages/category.jsx';
import SignupPage from './pages/signup.jsx';
import LoginPage from './pages/login.jsx';
import MoviesLayout from './layout/movies-layout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // QueryClient를 제대로 임포트
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 2. 연결
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
        children: [
            {
                // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
                index: true,
                element: <HomePage/>
            },
            {
                // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
                //:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의 
                path: 'movies',
                element: <MoviesLayout/>,
                children: [
                    {
                        index:true,
                        element:<CategoryPage/>
                    },
                    {
                        path:':category',
                        element:<MoviesPage/>
                    }
                ]
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'signup',
                element: <SignupPage/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            }
        ]
    },
]);

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
        
  )
}

export default App;

// 없는 경로에 들어온 처리를 해줍니다.
// errorElement: <h1>너는 없는 경로에 들어왔다 ^ㅁ^ 야호~!</h1>


