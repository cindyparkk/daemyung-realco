"use client";
import styled from "styled-components";
import { useState } from "react";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import CustomAccordion from "../../../components/accordion";

import FBValues from "../../../data/f&bValues";
import colors from "../../../constants/colors";
import menu_KO from "../../../constants/routes";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const ServicesFBPage = () => {
  const isMobile = useClientMediaQuery("(max-width: 600px)");
  return (
    <>
      <Title
        text={"F&B"}
        hr
        subtitle={
          <>
            <span>맛</span>과 <span>경험</span>, <span>혁신</span>과{" "}
            <span>가치</span>를 함께 만들어가는 대명그룹
          </>
        }
      />
      <TitleDescSection $isMobile={isMobile}>
        <p>
          대명그룹은 단순한 외식업을 넘어, 외식 브랜드 운영부터 메뉴 개발,
          프랜차이즈 사업, 글로벌 진출까지
          <br />
          F&B 산업 전반을 아우르는 종합 솔루션을 제공합니다.
        </p>
      </TitleDescSection>
      <PageContainer $isMobile={isMobile}>
        <PageTab pageValue={2} data={menu_KO[1].submenu} isRouter isFullWidth />
        <BannerImageWrapper $isMobile={isMobile}>
          <BannerImage src="/assets/images/f&b-banner.jpg" alt="Banner Image" />
        </BannerImageWrapper>
        <TextWrapper>
          <p>
            철저한 시장 분석, 완벽한 브랜드 기획, 차별화된 마케팅 전략 등
            체계적인 운영 시스템을 바탕으로
            <br />
            식문화의 트렌드를 주도하며, 고객과 파트너사의 성공을 함께
            만들어갑니다.
            <br />
            <br />
            또한, F&B 운영을 통해 축적된 상권 분석 능력과 소비자 유입 동선 설계
            노하우 등은 <br />
            대명그룹이 상업시설 분양 분야에서도 두각을 나타내는 핵심 경쟁력으로
            작용하고 있습니다. <br />
            상업시설 분양에 필요한 전략적 요소들을 정확히 이해하고 적용할 수
            있는 역량을 갖추고 있으며, <br />
            대명그룹은 단순히 브랜드를 유치하는 수준을 넘어, 상업시설 분양에
            최적화된 전략을 제공합니다.
          </p>
        </TextWrapper>
        <AccordionSection>
          <CustomAccordion dataItems={FBValues} />
        </AccordionSection>
      </PageContainer>
    </>
  );
};

export default ServicesFBPage;

const TitleDescSection = styled.section`
  padding-bottom: 50px;
  text-align: center;
  color: ${colors.black};
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

const BannerImageWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  height: 60vh;
  overflow: hidden;
  margin-top: 50px;

  ${(props) =>
    props.$isMobile && {
      minHeight: "200px",
      height: "20vh",
    }}
`;

const BannerImage = styled.img`
  width: 100%;
  display: block;
`;

const TextWrapper = styled.div`
  text-align: center;
  padding: 50px 0px;
  border-bottom: 1px solid ${colors.red};
  color: ${colors.black};
  p {
    font-weight: 300;
    line-height: 1.5;
  }
`;

const AccordionSection = styled.section`
  padding: 50px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
