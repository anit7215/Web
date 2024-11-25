import React from 'react';

const Input = ({ onChange, value, placeholder }) => {
  return (
    <input 
      type="text" 
      onChange={onChange} 
      value={value} 
      placeholder={placeholder} 
    />
  );
};

export default Input;
