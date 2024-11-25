import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useTodos } from "../context/TodoContext";

const TodoPage=()=>{
    const { id } = useParams();
    console.log("id:", id);

    const {fetchTodoById}=useTodos();

    const { data: selectedTodo, isLoading, error } = useQuery({
        queryKey: ["todoDetail", id], // 객체 형태로 전달
        queryFn: ()=>fetchTodoById(id),
    });
    console.log(selectedTodo);

    if(isLoading){
        return <Loading />
    }
    if (error) {
        return <Error/>
    }
    if (!selectedTodo) return <div>할 일을 찾을 수 없습니다.</div>;

    return(
        <>
            <TodoDetail todo={selectedTodo} />
        </>
    );
};

export default TodoPage;
