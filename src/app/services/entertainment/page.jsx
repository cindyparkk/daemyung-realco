"use client";
import styled from "styled-components";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";

import menu_KO from "../../../constants/routes";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const ServicesEntPage = () => {
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <Title
        text={"엔터테인먼트"}
        hr
        subtitle={
          <>
            <span>안정성</span>과 <span>수익성</span>을 함께 쌓아가는 대명그룹
          </>
        }
      />
      <TitleDescSection $isMobile={isMobile}>
        <p>
          대명그룹은 단순한 분양을 넘어, ‘운영의 관점에서 바라본 상업시설’
          이라는 시각으로
          <br />
          투자자와 임차인 모두에게 안정성과 수익성을 갖춘 성공적인 상업 부동산
          솔루션을 제공합니다.
        </p>
      </TitleDescSection>
      <PageContainer $isMobile={isMobile}>
        <PageTab pageValue={3} data={menu_KO[1].submenu} isRouter />
        <FlexBox $isMobile={isMobile}>
          <ImageWrapper $height={"80px"}>
            <Image
              src="/assets/images/logo/friends_screen-logo.jpeg"
              alt="Friends Screen Logo"
            />
          </ImageWrapper>
          <ImageWrapper $height={"80px"}>
            <Image src="/assets/images/logo/cgv-logo.svg" alt="CGV Logo" />
          </ImageWrapper>
        </FlexBox>
        <FlexBox $isMobile={isMobile}>
          <ImageWrapper $height={"320px"}>
            <Image
              src="/assets/images/enter-banner-1.jpg"
              alt="Friends Screen Banner"
            />
          </ImageWrapper>
          <ImageWrapper $height={"320px"}>
            <Image src="/assets/images/enter-banner-2.jpg" alt="CGV Banner" />
          </ImageWrapper>
        </FlexBox>
        <TextWrapper>
          <p>
            CGV 멀티플렉스 영화관과 스크린골프장을 직접 기획·운영하며 축적한{" "}
            <br />
            상업시설 입지 선정, 상권 분석, 고객 유입 전략, 운영 수익 모델 등
            실질적인 노하우를 바탕으로 <br />
            상업용 부동산 분양 및 투자 분야에서 신뢰를 쌓아왔습니다.
            <br />
            <br />
            단순한 데이터 분석을 넘어, 실제 상권에서 고객 흐름을 파악하고 매출을
            창출하며 <br />
            시설을 안정적으로 운영해 본 ‘현장 중심’의 경험은 대명그룹만의
            차별화된 경쟁력입니다.
          </p>
        </TextWrapper>
      </PageContainer>
    </>
  );
};

export default ServicesEntPage;

const TitleDescSection = styled.section`
  padding-bottom: 50px;
  text-align: center;
  p {
    font-weight: 300;
  }
  ${(props) =>
    props.$isMobile && {
      width: "85%",
    }}
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 50px 50px 50px;
  ${(props) =>
    props.$isMobile && {
      padding: "0px 20px 20px 20px",
    }}
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px 0px 20px 0px;
  ${(props) =>
    props.$isMobile && {
      flexDirection: "column",
    }}
`;

const ImageWrapper = styled.div`
  height: ${(props) => props.$height};
  width: auto;
  overflow: hidden; // hides any overflow for non-matching aspect ratios
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: auto;
  display: block;
`;

const TextWrapper = styled.div`
  text-align: center;
  padding: 50px 0px;
  p {
    font-weight: 300;
    line-height: 1.5;
  }
`;
