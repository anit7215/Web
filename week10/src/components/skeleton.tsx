import React from 'react';
import styled from 'styled-components';

const SkeletonLoader = () => {
    return (
        <SkeletonContainer>
            <SkeletonImage />
            <SkeletonText />
        </SkeletonContainer>
    );
};

const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    margin-bottom: 20px;
`;

const SkeletonImage = styled.div`
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 5px;
    animation: skeleton-loading 1.5s infinite ease-in-out;
`;

const SkeletonText = styled.div`
    width: 60%;
    height: 20px;
    margin-top: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    animation: skeleton-loading 1.5s infinite ease-in-out;
`;

const SkeletonAnimation = `
    @keyframes skeleton-loading {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #cfcfcf;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
`;

export default SkeletonLoader;
