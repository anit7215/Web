import React, { useState } from "react";
import styled from "styled-components";


const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    addTodo(title, description);
    setTitle("");
    setDescription("");
    };

    return (
    <Form onSubmit={handleSubmit}>
        <Input
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <Input
        type="text"
        placeholder="내용을 입력해주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">ToDo 생성</Button>
    </Form>
    );
};

export default TodoForm;

const Form = styled.form`
    margin-bottom: 20px;
`;