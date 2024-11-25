import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children, disabled }) => {
  return <StyledButton onClick={onClick} disabled={disabled}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  margin: 2px 3px;
  padding: 10px 10px;
  border: none;
  border-radius: 40px;
  background-color: yellowgreen;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: green;
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
