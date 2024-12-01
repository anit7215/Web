//components/TodoList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, complete } from '../redux/todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function TodoList() {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const trash = <FontAwesomeIcon icon={faTrashCan} />;

  return (
    <TodoListContainer>
      {todolist.map((todo) => (
        <TodoItem key={todo.id}>
          <TodoCheckbox
            type="checkbox"
            onChange={() => dispatch(complete(todo.id))}
          />
          <TodoText complete={todo.complete}>{todo.text}</TodoText>
          <DeleteButton onClick={() => dispatch(remove(todo.id))}>
            {trash}
          </DeleteButton>
        </TodoItem>
      ))}
    </TodoListContainer>
  );
}

const TodoListContainer = styled.ul`
  margin: 20px auto;
  width: 60%;
`;

const TodoItem = styled.li`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 100px;    
  margin-bottom: 10px;
`;

const TodoCheckbox = styled.input`
  margin-right: 10px;
`;

const TodoText = styled.div`
  flex-grow: 1;
  ${({ complete }) =>
    complete &&
    `
    text-decoration: line-through;
    color: gray;
  `}
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;