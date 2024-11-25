// TodoContext.jsx
import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

export const TodoContext = createContext();  // 여기에서 TodoContext를 export 해야 함

export function TodoContextProvider({ children }) {
  const queryClient = useQueryClient();

  // Todos 조회
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await useFetch("/todo");
      return response.data;
    },
  });

  // Todo 상세 조회
  const fetchTodoById = async (id) => {
    const response = await useFetch(`/todo/${id}`);
    return response.data;
  };

  // Todo 추가
  const addTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      const response = await useFetch("/todo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
    },
  });

  const addTodo = (todo) => {
    addTodoMutation.mutate(todo);
  };

  // Todo 삭제
  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      await useFetch(`/todo/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });

  const deleteTodo = (id) => {
    deleteTodoMutation.mutate(id);
  };

  // Todo 수정
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, updatedTodo }) => {
      const response = await useFetch(`/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    },
  });

  const updateTodo = (id, updatedTodo) => {
    updateTodoMutation.mutate({ id, updatedTodo });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        addTodo,
        deleteTodo,
        updateTodo,
        fetchTodoById,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
