"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useTransitionRouter from "../hooks/useTransitionRouter";

// components
import colors from "../constants/colors";
import CustomButton from "../components/button";
import Title from "../components/title";
import Carousel from "../components/carousel";
import NewsCarousel from "../components/newsCarousel";

// sanity
import { client } from "../sanity/lib/client";

// hooks
import useClientMediaQuery from "../hooks/useClientMediaQuery";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const NEWS_QUERY = `*[_type == "newsItem"]{
  _id,
  title,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  publishedAt,
  source,
  link
} | order(publishedAt desc)`;

  const options = { next: { revalidate: 30 } };

  useEffect(() => {
    async function fetchData() {
      const news = await client.fetch(NEWS_QUERY, {}, options);
      setNewsData(news);
    }
    fetchData();
  }, []);

  const { push } = useTransitionRouter();

  const handleRouting = async (path) => {
    await push(path);
  };

  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const isTablet = useClientMediaQuery("(max-width: 850px)");
  return (
    <>
      {/* Hero Section */}
      <HeroSection $isTablet={isTablet}>
        <h1>DAEMYUNG</h1>
        <h2>대명 그룹의 새로운 시작.</h2>
        <HeroImageWrapper $isTablet={isTablet}>
          {/* <Image src="/assets/images/hero-image.jpg" alt="Hero Image" /> */}
          <video
            autoPlay
            muted
            loop
            playsInline
            // poster="/assets/images/hero-image-2.jpg"
            preload="none"
          >
            <source
              src="https://ik.imagekit.io/x6pjpxa9a/%E1%84%92%E1%85%A9%E1%86%B7%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC_1080p.mp4?updatedAt=1758938348126"
              type="video/mp4"
            />
          </video>
        </HeroImageWrapper>
        {!isTablet && (
          <>
            <RedSquare />
            <Circle />
          </>
        )}
      </HeroSection>

      {/* Vision & Values Section */}
      <VisionSection $isTablet={isTablet}>
        <VisionContent $isTablet={isTablet}>
          <VisionTitle>
            <h3>DAEMYUNG'S</h3>
            <h1>비전 및 핵심 가치</h1>
          </VisionTitle>
          <ValueList $isTablet={isTablet}>
            <ValueItem>
              <ValueIcon
                src={"/assets/icons/trust-icon.svg"}
                alt={"Turst Icon"}
              />
              <ValueText>
                <ValueTitle>신뢰와 전문성</ValueTitle>
                <ValueDesc>Trust & Expertise</ValueDesc>
              </ValueText>
            </ValueItem>
            <ValueItem>
              <ValueIcon
                src={"/assets/icons/innovation-icon.svg"}
                alt={"Turst Icon"}
              />
              <ValueText>
                <ValueTitle>혁신과 트렌딩 리더십</ValueTitle>
                <ValueDesc>Innovation & Trend Leadership</ValueDesc>
              </ValueText>
            </ValueItem>
            <ValueItem>
              <ValueIcon
                src={"/assets/icons/synergy-icon.svg"}
                alt={"Turst Icon"}
              />
              <ValueText>
                <ValueTitle>시너지와 융합</ValueTitle>
                <ValueDesc>Synergy & Integration</ValueDesc>
              </ValueText>
            </ValueItem>
          </ValueList>
          <CustomButton
            text={"LEARN MORE"}
            onClick={() => handleRouting("/about/vision")}
          />
        </VisionContent>
        <VisionImageWrapper>
          <Image
            loading="lazy"
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
        <Carousel
          isButton
          // isHoverAnimation={!isMobile}
        />
      </BusinessSection>

      {/* 뉴스 & 소식 Section */}
      {newsData?.length > 0 && (
        <NewsSection>
          <Title text={"뉴스 & 소식"} />
          <NewsCarousel news={newsData} />
        </NewsSection>
      )}
    </>
  );
};

export default Home;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 48px 0px 48px 0px;
  width: 90%;
  h1 {
    font-size: 4rem;
    color: ${colors.red};
    margin-bottom: 8px;
    letter-spacing: 2px;
  }
  h2 {
    font-size: 1.1rem;
    color: ${colors.black};
    margin-bottom: 32px;
  }
  ${(props) =>
    props.$isTablet && {
      padding: "45px 0px",
      width: "100%",
      alignItems: "center",
      h1: {
        fontSize: "3rem",
      },
    }}
`;

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  overflow: hidden;

  & > video {
    width: 100%;
    max-width: 95vw;
    height: auto;
    object-fit: contain;
    display: block;
  }

  ${(props) =>
    props.$isTablet && {
      maxWidth: "100vw",
      "& > video": {
        width: "100vw",
        minWidth: "100vw",
        maxWidth: "100vw",
      },
    }}
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const RedSquare = styled.div`
  position: absolute;
  top: 150px;
  right: 30px;
  width: 10rem;
  height: 10rem;
  background: ${colors.red};
  z-index: 0;
`;

const Circle = styled.div`
  position: absolute;
  top: 400px;
  left: 30px;
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
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  /* z-index: 1; */
  ${(props) =>
    props.$isTablet && {
      flexDirection: "column",
      padding: "100px 20px 20px",
      alignItems: "center",
    }}
`;

const VisionContent = styled.div`
  max-width: 80%;
  margin-right: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) =>
    props.$isTablet && {
      margin: "0px",
      maxWidth: "95%",
    }}
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

const ValueList = styled.div`
  padding: 0;
  margin: ${(props) => (props.$isTablet ? "0px" : "0 0 30px 0")};
`;

const ValueItem = styled.div`
  background: #222;
  border-radius: 8px;
  margin-bottom: 18px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ValueIcon = styled.img`
  /* font-size: 1.6rem; */
  width: 35px;
  height: auto;
  margin-right: 18px;
  opacity: 0.8;
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
