"use client";
import styled from "styled-components";

import Title from "../../../components/title";
import colors from "../../../constants/colors";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const GreetingsPage = () => {
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <Title
        text={"CEO 인사말"}
        hr
        subtitle={
          <>
            greetings from <span>ceo</span>
          </>
        }
      />
      <TopBannerSection $isMobile={isMobile}>
        <h2>
          "<span>끊임없는 도전</span>과 <span>혁신</span>을 통해
          <br /> <span>인정</span>받는 기업으로 <span>성장</span>해
          나가겠습니다."
        </h2>
      </TopBannerSection>
      <TextWrapperSection $isMobile={isMobile}>
        <Circle />
        <RedSquare />
        <TextSection $isMobile={isMobile}>
          <p>
            2011년 설립이래 지금까지 함께해주신 임직원 여러분들의 노고와 열정,
            그리고 고객 여러분들 열렬한 성원과 관심에 진심으로 감사드립니다.
            <br />
            <br />
            저희 회사는 부동산 분양 대행 사업을 넘어, 실제 상업시설 운영
            노하우와 프랜차이즈, 영화관 운영을 통해 상업 부동산 분야의 새로운
            패러다임을 제시하고 있습니다.
            <br />
            단순히 부동산 상품을 판매하는 것을 넘어, 고객에게 실질적인 가치를
            제공하고 성공적인 투자를 이끌어내는 것을 목표로 하고 있습니다.
            <br />
            <br />
            저희 대명그룹은 두 개의 자회사인 대명FMC, 대명ENT 통해 차별화된
            경쟁력을 확보하고 있습니다.
            <br />
            <br />
            대명FMC는 실제 식음 사업 브랜드를 운영하며 얻은 생생한 경험을
            바탕으로, 상업 부동산에 대한 깊이 있는 이해와 전문성을 제공합니다.
            <br />
            대명ENT는 CGV 멀티플렉스을 직접 운영하며 얻은 상업시설의 앵커시설,
            집객시설의 입점 및 운영 노하우를 통해 고객에게 상업 부동산에 대한
            투자와 신뢰를 드리는 기반이 됩니다.
            <br />
            <br />
            저희 대명그룹은 급변하는 부동산 시장 환경 속에서도 끊임없이 혁신하고
            성장하며, 고객 여러분의 성공적인 투자를 위해 최선을 다할 것을 약속
            드립니다.
            <br />
            <br />
            앞으로도 저희 회사는 고객 여러분의 든든한 파트너로서, 상업 부동산
            분야의 새로운 미래를 함께 만들어 나가겠습니다.
            <br />
            <br />
            감사합니다.
          </p>
          <SignatureSection>
            <SignatureLeft>
              <span>대명리얼코</span>
              <span>대표이사</span>
            </SignatureLeft>
            <SignatureRight>이문수</SignatureRight>
          </SignatureSection>
        </TextSection>
      </TextWrapperSection>
    </>
  );
};

export default GreetingsPage;

const TopBannerSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: ${colors.charcoal};
    line-height: 45px;
    span {
      color: ${colors.red};
    }
  }
  ${(props) =>
    props.$isMobile && {
      width: "85%",
      h2: {
        fontSize: "1.5rem",
      },
    }}
`;

const TextWrapperSection = styled.section`
  background-color: ${colors.black};
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0px;
  margin: 50px 0px 80px 0px;

  ${(props) =>
    props.$isMobile && {
      padding: "30px 0px",
    }}
`;

const TextSection = styled.div`
  background-color: ${colors.white};
  padding: 50px;
  width: 70%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
  color: ${colors.black};
  column-count: 2;
  column-gap: 40px;

  /* h1 {
    font-size: 25px;
    text-align: right;
    margin-top: 50px;
    span {
      font-size: 20px;
      color: ${colors.red};
      margin-right: 10px;
    }
  } */

  @media (max-width: 900px) {
    column-count: 1; // collapse to single column
    column-gap: 0px;
  }

  ${(props) =>
    props.$isMobile && {
      padding: "30px",
      width: "85%",
    }}
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
    right: 10px;
    bottom: -10px;
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

const SignatureSection = styled.div`
  display: flex;
  align-items: center; /* align to bottom for baseline */
  margin-top: 100px;
  justify-content: flex-end;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const SignatureLeft = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* ensure fills the same height as the name */
  text-align: center;
  gap: 2px;

  span:first-child {
    color: ${colors.textGrey}; // style to match image 2
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
  span:last-child {
    color: ${colors.red}; // style to match image 1
    font-size: 19px; // make sure it fills the "대명리얼코" width
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
  }
`;

const SignatureRight = styled.h1`
  color: ${colors.black};
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 5px;
  min-width: 88px; // adjust as needed for visual spacing
  text-align: left;
  padding-left: 15px;
`;

const QuotationMark = styled.span`
  color: ${colors.red};
  font-size: 32px;
  font-family: "KIMM", sans-serif;
  font-weight: 700;
`;
