"use client";
import styles from "./page.module.css";
import React from "react";
import styled from "styled-components";

import colors from "../constants/colors";
import CustomButton from "../components/button";
import Title from "../components/title";
import Carousel from "../components/carousel";

export default function Home() {
  const MainWrapper = styled.main`
    background: #fff;
    padding-top: 64px; /* Height of your fixed header */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const HeroSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 48px;
    width: 80%;
  `;

  const HeroTitle = styled.h1`
    font-size: 4rem;
    color: ${colors.red};
    margin-bottom: 8px;
    letter-spacing: 2px;
  `;

  const HeroSubtitle = styled.h2`
    font-size: 1.1rem;
    color: ${colors.black};
    margin-bottom: 32px;
  `;

  const HeroImageWrapper = styled.div`
    width: 100%;
    max-width: 80vw;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `;

  const Image = styled.img`
    width: 100%;
    display: block;
  `;

  const RedSquare = styled.div`
    position: absolute;
    top: 150px;
    right: 120px;
    width: 10rem;
    height: 10rem;
    background: ${colors.red};
    z-index: 0;
  `;

  const Circle = styled.div`
    position: absolute;
    top: 400px;
    left: 90px;
    width: 10rem;
    height: 10rem;
    border: 1px solid ${colors.black};
    border-radius: 50%;
    background: transparent;
    z-index: 0;
  `;

  const VisionSection = styled.section`
    background: ${colors.black};
    color: ${colors.white};
    margin-top: -100px;
    padding: 100px 0px 20px 0px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    width: 100%;
    /* z-index: 1; */
  `;

  const VisionContent = styled.div`
    max-width: 80%;
    margin-right: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const VisionTitle = styled.div`
    h1 {
      font-size: 2.5rem;
      margin-bottom: 32px;
    }
    h3 {
      letter-spacing: 0.5rem;
      font-size: 12px;
      margin-bottom: 10px;
    }
  `;

  const ValueList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 30px 0;
  `;

  const ValueItem = styled.li`
    background: #222;
    border-radius: 8px;
    margin-bottom: 18px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  `;

  const ValueIcon = styled.span`
    font-size: 1.6rem;
    margin-right: 18px;
  `;

  const ValueText = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const ValueTitle = styled.h1`
    font-size: 20px;
    color: #fff;
  `;

  const ValueDesc = styled.h2`
    font-size: 14px;
    color: #bbb;
    margin-top: 10px;
  `;

  const VisionImageWrapper = styled.div`
    min-width: 320px;
    max-width: 380px;
    min-height: 300px;

    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin-top: 100px;
    z-index: 3;
  `;

  const BusinessSection = styled.section`
    background: ${colors.white};
    /* margin-top: -100px; */
    z-index: 2;
    width: 100%;
    /* padding: 100px 0px 20px 0px; */
  `;

  const NewsSection = styled.section`
    background: ${colors.lightGrey};
    padding: 20px 0px 0px 0px;
    width: 100%;
  `;

  return (
    <MainWrapper>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>DAEMYUNG</HeroTitle>
        <HeroSubtitle>대명 그룹의 새로운 시작.</HeroSubtitle>
        <HeroImageWrapper>
          <Image src="/assets/images/hero-image.jpg" alt="Daemyung Hero" />
        </HeroImageWrapper>
        <RedSquare />
        <Circle />
      </HeroSection>

      {/* Vision & Values Section */}
      <VisionSection>
        <VisionContent>
          <VisionTitle>
            <h3>DAEMYUNG'S</h3>
            <h1>비전 및 핵심 가치</h1>
          </VisionTitle>
          <ValueList>
            <ValueItem>
              <ValueIcon>🤝</ValueIcon>
              <ValueText>
                <ValueTitle>신뢰와 전문성</ValueTitle>
                <ValueDesc>Trust & Expertise</ValueDesc>
              </ValueText>
            </ValueItem>
            <ValueItem>
              <ValueIcon>💡</ValueIcon>
              <ValueText>
                <ValueTitle>혁신과 트렌딩 리더십</ValueTitle>
                <ValueDesc>Innovation & Trend Leadership</ValueDesc>
              </ValueText>
            </ValueItem>
            <ValueItem>
              <ValueIcon>🔗</ValueIcon>
              <ValueText>
                <ValueTitle>시너지와 융합</ValueTitle>
                <ValueDesc>Synergy & Integration</ValueDesc>
              </ValueText>
            </ValueItem>
          </ValueList>
          <CustomButton text={"LEARN MORE"} />
        </VisionContent>
        <VisionImageWrapper>
          <Image
            src="/assets/images/hero-image-2.jpg"
            alt="Daemyung Building"
          />
        </VisionImageWrapper>
      </VisionSection>

      {/* 사업분야 Section */}
      <BusinessSection>
        <Title
          text={"사업분야"}
          desc={
            "다년간의 숙련된 경험을 바탕으로 다양한 솔루션 및 시스템을 제공합니다."
          }
        />
        <Carousel />
      </BusinessSection>

      {/* 뉴스 & 소식 Section */}
      <NewsSection>
        <Title text={"뉴스 & 소식"} />
      </NewsSection>
    </MainWrapper>
  );
}
