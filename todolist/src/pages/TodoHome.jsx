import styled from "styled-components";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useTodos } from "../context/TodoContext";
import Error from "../components/Error";
import Loading from "../components/Loading";


const TodoHomePage=()=>{
    const {isLoading, error}=useTodos();

    if(isLoading){
        return <Loading/>
    }

    if (error) {
        return <Error/>
    }

    return (
        <>
            <Header><TodoForm /></Header>
            <section><TodoList /></section>
        </>
    );
};

export default TodoHomePage;

