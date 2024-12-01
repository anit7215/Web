//components/InputTodo.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/todoSlice';
import styled from 'styled-components';

export default function InputTodo() {
  const dispatch = useDispatch();
  const [todolist, setTodolist] = useState({
    id: 0,
    text: '',
  });

  function handleText(e) {
    setTodolist({ text: e.target.value });
  }

  function onReset() {
    setTodolist({ text: '' });
  }

  return (
    <InputTodoContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== '') {
            dispatch(add(todolist.text));
          } else {
            alert('할 일을 입력해주세요!');
          }
          onReset();
        }}
      >
        <div>
          <TextInput
            type="text"
            value={todolist.text}
            onChange={handleText}
          />
          <SubmitButton type="submit" value="추가" />
        </div>
      </form>
    </InputTodoContainer>
  );
}

const InputTodoContainer = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const TextInput = styled.input`
  width: 60%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid grey;
  border-radius: 10px;
`;

const SubmitButton = styled.input`
  padding: 10px;
  background-color: skyblue;
  color: white;
  border: none;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;