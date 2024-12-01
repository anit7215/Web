import React from 'react';
import styled from 'styled-components';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';



function App() {
  return (
    <AppContainer>
      <Title>😴 Todo List 😴</Title>
      <InputTodo />
      <TodoList />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333; /* 텍스트 색상 */
`;