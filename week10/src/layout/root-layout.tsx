import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styled from "styled-components";
import React from 'react';



const RootLayout = () => {
  return (
    <Container>
      <Navbar />
      <Main>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Container>
  );
};

export default RootLayout;
const Container = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex: 1; 
  background-color:black;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;