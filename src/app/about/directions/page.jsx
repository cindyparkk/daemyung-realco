"use client";
import styled from "styled-components";
import Image from "next/image";

import Title from "../../../components/title";
import colors from "../../../constants/colors";
import KakaoMap from "./components/kakaoMap";

import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const DirectionsPage = () => {
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <Title text={"오시는 길"} hr subtitle={<>daemyung</>} />
      <PageWrapper>
        <KakaoMap address={"경기도 광명시 일직동 514"} />
        <DirectionsWrapper $isMobile={isMobile}>
          <Directions>
            <DirectionsTitle>
              <h1>주소 및 연락처</h1>
            </DirectionsTitle>
            <p>주소:</p>
            <ul>
              <li>
                [도로명주소] 경기도 광명시 일직로 43, G237호 (일직동, GIDC몰)
              </li>
              <li>[지번주소] 경기도 광명시 일직동 514</li>
            </ul>
            <p>연락처:</p>
            <ul>
              <li>[전화] 02-6672-1115</li>
              <li>[팩스] 02-6672-1116</li>
            </ul>
          </Directions>
          <Directions style={{ marginTop: isMobile && "20px" }}>
            <DirectionsTitle>
              <h1>대중교통 이용시</h1>
            </DirectionsTitle>
            <IconBox>
              <Image
                src={"/assets/icons/subway-icon.svg"}
                alt={"Subway Icon"}
                width={25}
                height={24}
              />
              <p>지하철</p>
            </IconBox>
            <p>KTX 광명역 하차 → 5번 출구 650m 도보 11분</p>
            <IconBox>
              <Image
                src={"/assets/icons/bus-icon.svg"}
                alt={"Bus Icon"}
                width={23}
                height={23}
              />
              <p>버스</p>
            </IconBox>
            <p>
              GIDC 지식산업센터, 코스트코 광명점, 중앙대학교 광명병원 정류장
              하차
              <br />
              (KTX 광명역 : 17, 12, 77, 8-2, 1-1, 102, 75, 3)
              <br />
              (관악역 : 1-1, 12)
            </p>
          </Directions>
        </DirectionsWrapper>
      </PageWrapper>
    </>
  );
};

export default DirectionsPage;

const PageWrapper = styled.section`
  padding: 0px 50px 50px 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DirectionsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5vw;
  padding-top: 50px;

  ${(props) =>
    props.$isMobile && {
      flexDirection: "column",
    }}
`;

const Directions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;

  p,
  ul,
  li {
    font-weight: 300;
    line-height: 30px;
  }

  ul {
    margin-left: 20px;
  }
`;

const DirectionsTitle = styled.div`
  border-bottom: 1px solid ${colors.red};
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 10px;

  h1 {
    font-size: 1.5rem;
    color: ${colors.red};
  }
`;

const IconBox = styled.div`
  border: 1px solid ${colors.red};
  border-radius: 20px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-height: 36px;

  p {
    font-weight: 300;
    color: ${colors.red};
  }
`;
