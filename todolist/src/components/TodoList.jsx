// props를 호출했을 때 
import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const { todos, setSearchQuery } = useContext(TodoContext);
    const [searchInput, setSearchInput] = useState("");

    // props에서 tech 배열을 받음
    const { tech } = props;

    // debounce 적용
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <div className="todo-list-container">
            {/* tech 배열이 주어지면 이를 리스트로 출력 */}
            <ul>
                {tech && tech.length > 0 ? (
                    tech.map((item, index) => (
                        <li key={index} style={{ listStyle: "none" }}>
                            {item}
                        </li>
                    ))
                ) : (
                    <p>기술 목록이 없습니다.</p>
                )}
            </ul>

            {/* TodoList가 기존 todos 배열을 처리 */}
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
 