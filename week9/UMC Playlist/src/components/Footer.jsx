import React from "react";
import styled from "styled-components";


const Footer = () => {
  return (
    <FooterWrapper>
      <p>University MakeUs Challenge</p>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  text-align: center;
  margin-top: 50px;
  padding: 10px 0;
  background-color: #333;
  color: #fff;

  p {
    margin: 0;
    font-size: 14px;
  }
`;