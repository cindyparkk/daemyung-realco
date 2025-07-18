"use client";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import colors from "../../../constants/colors";

import {
  RealEstateData,
  FNBData,
  EntertainmentData1,
  EntertainmentData2,
} from "../../../data/projects";

const sections = ["real-estate", "fnb", "entertainment"];

const ProjectsPage = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const router = useRouter();
  const { params } = useParams(); // This gets the dynamic [params]
  // const [currentIndex, setCurrentIndex] = useState(() => {
  //   const index = sections.indexOf(params);
  //   return index !== -1 ? index : 0;
  // });

  // // On load: scroll to the section based on the URL param
  // useEffect(() => {
  //   const index = sections.indexOf(params);
  //   if (index !== -1 && sectionRefs.current[index]) {
  //     sectionRefs.current[index].scrollIntoView({ behavior: "auto" });
  //     setCurrentIndex(index);
  //   }
  // }, [params]);

  // // Throttle scroll handling with a timer to avoid spamming
  // const scrollTimeout = useRef(null);

  // const handleScroll = () => {
  //   if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

  //   scrollTimeout.current = setTimeout(() => {
  //     const scrollTop = containerRef.current.scrollTop;
  //     const height = window.innerHeight;
  //     const index = Math.round(scrollTop / height);

  //     if (index !== currentIndex) {
  //       setCurrentIndex(index);
  //       router.replace(`/projects/${sections[index]}`);
  //     }
  //   }, 100); // Wait 100ms after scroll ends
  // };

  const [data, setData] = useState([]);
  const [enterPage, setEnterPage] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    switch (params) {
      case "real-estate":
        setData(RealEstateData[dataIndex]);
        break;
      case "fnb":
        setData(FNBData);
        break;
      case "entertainment":
        if (enterPage === 0) setData(EntertainmentData1);
        else if (enterPage === 1) setData(EntertainmentData2);
        break;
      default:
        setData(RealEstateData);
    }
  }, [params, enterPage, dataIndex]);

  const sliceSentences = (text) => {
    if (text && text !== "") {
      return text.replace(/\./g, ".\n");
    } else return text;
  };

  return (
    <>
      {/* <ScrollContainer ref={containerRef} onScroll={handleScroll}>
        {sections.map((section, i) => (
          <Section key={section} ref={(el) => (sectionRefs.current[i] = el)}> */}
      {/* <Title
        text={
          section === "entertainment"
            ? "엔터테인먼트"
            : section === "fnb"
              ? "F&B"
              : "분양대행"
        }
        hr
        subtitle={
          section === "entertainment" ? (
            <>
              대명그룹이 책임지고 담당한 <span>엔터</span> 사업
            </>
          ) : section === "fnb" ? (
            <>
              대명그룹이 책임지고 담당한 <span>F&B</span> 사업
            </>
          ) : (
            <>
              대명그룹이 책임지고 담당한 <span>분양대행</span>
            </>
          )
        }
      /> */}
      <Title
        text={
          params === "entertainment"
            ? "엔터테인먼트"
            : params === "fnb"
              ? "F&B"
              : "분양대행"
        }
        hr={params !== "real-estate" && true}
        subtitle={
          params === "entertainment" ? (
            <>
              대명그룹이 책임지고 담당한 <span>엔터</span> 사업
            </>
          ) : params === "fnb" ? (
            <>
              대명그룹이 책임지고 담당한 <span>F&B</span> 사업
            </>
          ) : (
            <>
              대명그룹이 책임지고 담당한 <span>분양대행</span>
            </>
          )
        }
      />
      <PageContainer>
        {params === "real-estate" ? (
          <div>
            <PageTab
              pageValue={dataIndex}
              data={RealEstateData}
              isArr
              onClick={(idx) => setDataIndex(idx)}
            />
          </div>
        ) : (
          <>
            <LogoBox>
              {data?.logo?.length > 0 &&
                data.logo.map((logo, idx) => (
                  <Logo
                    key={idx}
                    src={logo.src}
                    alt={logo.alt}
                    $isActive={logo.isActive}
                    onClick={() => {
                      if (data?.logo?.length > 1) {
                        setEnterPage(idx);
                      }
                    }}
                  />
                ))}
            </LogoBox>
            <Text>{sliceSentences(data?.intro)}</Text>
            <BannerImageWrapper>
              <Image src={data?.bannerImage?.src} />
            </BannerImageWrapper>
          </>
        )}
        <TextWrapper>
          <p style={{ color: colors.textGrey, fontSize: "14px" }}>
            {data?.brand?.desc}
          </p>
          <BrandName>
            <h4>{data?.brand?.name}</h4>
            <h6>{data?.brand?.location}</h6>
          </BrandName>
        </TextWrapper>
        {params === "real-estate" ? (
          <div style={{ paddingTop: "30px" }}>
            <RealEstateDesc>
              <span>
                <Image src={"/assets/icons/work-icon.svg"} />
              </span>
              <h5>업무</h5>
              <p>{data?.work}</p>
            </RealEstateDesc>
            <RealEstateDesc>
              <span>
                <Image src={"/assets/icons/location-icon.svg"} />
              </span>
              <h5>위치</h5>
              <p>{data?.location}</p>
            </RealEstateDesc>
            <RealEstateDesc>
              <span>
                <Image src={"/assets/icons/area-icon.svg"} />
              </span>
              <h5>연면적</h5>
              <p>{data?.area}</p>
            </RealEstateDesc>
            <RealEstateDesc>
              <span>
                <Image src={"/assets/icons/contract-icon.svg"} />
              </span>
              <h5>계약주체</h5>
              <p>{data?.contractedWith}</p>
            </RealEstateDesc>
          </div>
        ) : (
          <TextWrapper>
            {data?.desc?.map((desc, idx) =>
              data?.isUl ? (
                <ListedDesc key={idx}>
                  <li>{desc}</li>
                </ListedDesc>
              ) : (
                <Text key={idx}>{desc}</Text>
              )
            )}
          </TextWrapper>
        )}
        {data?.images?.length > 0 && (
          <ImageWrapperSection>
            <Circle />
            <RedSquare />
            <ImageWrapper>
              {data?.images?.map((img, idx) => (
                <Image key={idx} src={img.src} alt={img.alt} />
              ))}
            </ImageWrapper>
          </ImageWrapperSection>
        )}
      </PageContainer>
      {/* </Section>
        ))}
      </ScrollContainer> */}
    </>
  );
};

export default ProjectsPage;

const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  width: 100%;
`;

const Section = styled.div`
  padding-top: 64px;
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.$padding ? props.$padding : "0px 0px 50px 0px")};
  gap: 20px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 80px;
  width: auto;
  overflow: hidden;
`;

const Logo = styled.img`
  height: 100%;
  width: auto;
  display: block;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};

  &:hover {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    cursor: ${(props) => !props.$isActive && "pointer"};
  }
`;

const Text = styled.p`
  width: 55%;
  font-size: 14px;
  text-align: center;
  padding: 10px 0px;
  white-space: pre-line;
  line-height: 1.75;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  z-index: 3;
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  /* margin-top: 50px; */
  margin: 20px 0px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.div`
  /* padding-bottom: 20px; */
  display: flex;
  align-items: center;

  h4 {
    color: ${colors.red};
    font-weight: bold;
    font-size: 28px;
    margin-right: 15px;
  }

  h6 {
    font-size: 14px;
  }
`;

const ListedDesc = styled.ul`
  li {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

const RealEstateDesc = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    width: 25px;
    height: auto;
  }

  h5 {
    color: ${colors.red};
    font-weight: bold;
    font-size: 18px;
    margin-left: 5px;
    margin-right: 15px;
  }
`;

const ImageWrapperSection = styled.section`
  background-color: ${colors.black};
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0px;
  margin: 50px 0px 80px 0px;
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Always 2 columns */
  gap: 16px;
  width: 60%;
  z-index: 3;
`;

const RedSquare = styled.div`
  width: 10rem;
  height: 10rem;
  background: ${colors.red};
  z-index: 0;
  position: absolute;
  right: 80px;
  bottom: -30px;
  @media (max-width: 900px) {
    right: -20px;
    bottom: -20px;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 600px) {
    right: -10px;
    bottom: -10px;
    width: 40px;
    height: 40px;
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
  left: 70px;
  top: 180px;
  @media (max-width: 900px) {
    left: -40px;
    top: 40px;
    width: 90px;
    height: 90px;
  }
  @media (max-width: 600px) {
    left: -20px;
    top: 20px;
    width: 60px;
    height: 60px;
  }
`;
