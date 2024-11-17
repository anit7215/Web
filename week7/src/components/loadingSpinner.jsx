// src/components/loadingSpinner.jsx
import React from 'react';
import { TailSpin } from 'react-loader-spinner'; // 로딩 스피너 임포트

const LoadingSpinner = () => {
  return (
    <div>
      <TailSpin height="50" width="50" color="#fff" />
    </div>
  );
};

export default LoadingSpinner; 
