"use client";
import styled from "styled-components";
import { useState } from "react";
// import Image from "next/image";

import Title from "../../../components/title";
import colors from "../../../constants/colors";

const OrgCharPage = () => {
  return (
    <>
      <Title
        text={"조직도"}
        hr
        subtitle={
          <>
            대명그룹의 탄탄한 <span>조직 구성</span>
          </>
        }
      />
      <WrapperSection>
        <Circle />
        <RedSquare />
        <ImageContainer>
          <ImageWrapper>
            <Image src="/assets/images/org-chart.png" alt="Organizaion Chart" />
          </ImageWrapper>
        </ImageContainer>
        <ImageContainer>
          <ImageWrapper>
            <Image
              src="/assets/images/subsidary-companies.png"
              alt="Subsidary companies"
            />
          </ImageWrapper>
        </ImageContainer>
      </WrapperSection>
    </>
  );
};

export default OrgCharPage;

const WrapperSection = styled.section`
  background-color: ${colors.black};
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  margin-bottom: 80px;
  gap: 10vh;
`;

const RedSquare = styled.div`
  width: 10rem;
  height: 10rem;
  background: ${colors.red};
  z-index: 0;
  position: absolute;
  right: 10%;
  bottom: -30px;
  @media (max-width: 900px) {
    right: -20px;
    bottom: -20px;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 600px) {
    right: 20px;
    bottom: -20px;
    width: 5rem;
    height: 5rem;
  }
`;

const Circle = styled.div`
  border: 1px solid ${colors.white};
  border-radius: 50%;
  background: transparent;
  z-index: 0;
  width: 10rem;
  height: 10rem;
  position: absolute;
  left: 10%;
  top: 180px;
  @media (max-width: 900px) {
    left: -40px;
    top: 40px;
    width: 90px;
    height: 90px;
  }
  @media (max-width: 600px) {
    left: -10px;
    top: 20px;
    width: 5rem;
    height: 5rem;
  }
`;

const ImageContainer = styled.div`
  background-color: ${colors.white};
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ImageWrapper = styled.div`
  min-width: 350px;
  max-width: 60vw;
  /* min-height: 300px; */

  overflow-x: scroll;
  z-index: 3;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  z-index: 3;
`;
