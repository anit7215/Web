import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { TodoContextProvider } from "./context/TodoContext";
import TodoHomePage from "./pages/TodoHome";
import TodoPage from "./pages/TodoPage";
import NotFound from "./pages/NotFound";
import RootLayout from "./layouts/RootLayout";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/todo" replace />,
  },
  {
    path: "/todo",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TodoHomePage />,
      },
      {
        path: ":id",
        element: <TodoPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoContextProvider>
        <RouterProvider router={router} />
      </TodoContextProvider>
    </QueryClientProvider>
  );
}

export default App;
