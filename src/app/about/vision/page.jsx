"use client";
import styled from "styled-components";
import { useState } from "react";

import Title from "../../../components/title";
import CustomAccordion from "../../../components/accordion";

// hooks / constants
import colors from "../../../constants/colors";
import coreValues_KO from "../../../data/coreValues";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const VisionPage = () => {
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <Title
        text={"비전 & 핵심가치"}
        hr
        subtitle={
          <>
            대명그룹을 이루는 <span>비전</span>과 <span>핵심가치</span>
          </>
        }
      />
      <TopBannerSection $isMobile={isMobile}>
        <h2>"경계를 넘어, 새로운 가치를 창조하다"</h2>
        <p>
          우리는 분양대행, F&B, 엔터테인먼트 분야에서 기존의 틀을 뛰어넘는
          혁신적인 전략과 차별화된 서비스를 제공합니다.
          <br />각 산업의 경계를 허물고 유기적으로 연결함으로써 고객과
          파트너에게 새로운 경험과 가치를 제공합니다.
        </p>
      </TopBannerSection>
      {/* <BannerImageWrapper $isMobile={isMobile}>
        <BannerImage
          src="/assets/images/vision-banner.jpg"
          alt="Banner Image"
        />
      </BannerImageWrapper> */}
      <AccordionSection>
        <CustomAccordion dataItems={coreValues_KO} allOpenDefault={true} />
      </AccordionSection>
    </>
  );
};

export default VisionPage;

const TopBannerSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: ${colors.red};
    line-height: 1.5;
  }
  p {
    font-weight: 300;
    font-size: 14px;
    color: ${colors.black};
  }
  ${(props) =>
    props.$isMobile && {
      width: "85%",
    }}
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  min-height: 550px;
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

const AccordionSection = styled.section`
  background-color: ${colors.lightGrey};
  /* padding: 80px 0px; */
  margin-top: 30px;
  padding: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
