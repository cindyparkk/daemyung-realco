"use client";
import styled from "styled-components";
import { useState } from "react";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import StepCard from "./components/stepCard";

import colors from "../../../constants/colors";
import { RealEstateSteps } from "../../../constants/staticData";

const ServicesRealEstatePage = () => {
  return (
    <>
      <Title
        text={"분양대행"}
        hr
        subtitle={
          <>
            <span>분양</span>의 <span>시작</span>부터 <span>마무리까지</span>,
            대명그룹이 함께합니다
          </>
        }
      />
      <TitleDescSection>
        <p>
          대명그룹은 다년간의 숙련된 경험과 차별화 된 마케팅 노하우, 체계적인
          운영 시스템을 제공하여
          <br />
          클라이언트가 만족할 수 있는 최적의 맞춤형 분양 솔루션을 제공합니다.
        </p>
      </TitleDescSection>
      <PageContainer>
        <PageTab pageValue={1} />
        <BannerImageWrapper>
          <BannerImage
            src="/assets/images/real-estate-banner.jpg"
            alt="Banner Image"
          />
        </BannerImageWrapper>
        <StepCardWrapper>
          {RealEstateSteps.map((item, idx) => (
            <StepCard key={idx} data={item} />
          ))}
        </StepCardWrapper>
      </PageContainer>
    </>
  );
};

export default ServicesRealEstatePage;

const TitleDescSection = styled.section`
  padding-bottom: 50px;
  text-align: center;
  p {
    font-weight: 300;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 50px 50px 50px;
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  max-height: 450px;
  overflow: hidden;
  margin-top: 50px;
`;

const BannerImage = styled.img`
  width: 100%;
  display: block;
`;

const StepCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 50px;
`;
