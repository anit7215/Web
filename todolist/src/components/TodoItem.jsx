import React, { useContext, useState } from 'react';
import { TodoContext } from "../context/TodoContext";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TodoItem = ({ todo }) => {
  const { deleteTodo, updateTodo, toggleTodoChecked } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const handleSave = () => {
    updateTodo(todo.id, editText, editContent); // 수정된 내용 업데이트
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id); // 삭제 함수 호출
  };

  const handleCheckboxChange = () => {
    toggleTodoChecked(todo.id); // 완료 여부 토글
  };

  return (
    <TodoItemContainer>
      {isEditing ? (
        <EditMode>
          <EditInput
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)} // 로컬 제목 상태 업데이트
          />
          <EditTextarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)} // 로컬 내용 상태 업데이트
          />
          <div className="edit-buttons">
            <UpdateButton onClick={handleSave}>저장</UpdateButton>
            <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
          </div>
        </EditMode>
      ) : (
        <ViewMode>
          <Checkbox
            type="checkbox"
            checked={todo.checked}
            onChange={handleCheckboxChange} // 체크박스 상태 변경
          />
          <Link to={`/todo/${todo.id}`}>
            <TodoTitle>{todo.title}</TodoTitle>
          </Link>
          <TodoContent>{todo.content}</TodoContent>
          <Status>{todo.checked ? '완료' : '미완료'}</Status>
          <ViewButtons>
            <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
            <EditButton onClick={handleDelete}>삭제</EditButton>
          </ViewButtons>
        </ViewMode>
      )}
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const TodoTitle = styled.h3`
  font-size: 1.5rem;
  cursor: pointer; /* 제목 클릭 가능 */
`;

const TodoContent = styled.p`
  font-size: 1rem;
`;

const EditMode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const EditButton = styled.button`
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  transition: background-color 0.3s ease, opacity 0.3s ease;
`;

const UpdateButton = styled(EditButton)`
  background-color: #5866fb; /* 파란색 */
  color: white;

  &:hover {
    background-color: #4756cc;
  }
`;

const CancelButton = styled(EditButton)`
  background-color: #ff655a; /* 빨간색 */
  color: white;

  &:hover {
    background-color: #e64b42;
  }
`;

const ViewMode = styled.div``;

const Status = styled.div`
  font-size: 1rem;
  margin-top: 5px;
`;

const ViewButtons = styled.div`
  margin-top: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;
