"use client";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import ImageCarousel from "../components/imageCarousel";
import colors from "../../../constants/colors";

import { client } from "../../../sanity/lib/client";

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
  const [realEstateData, setRealEstateData] = useState([]);
  const [fnbData, setFnbData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);

  const query = `*[_type == "otherProject"]{
  _id,
  label,
  category,
  logo{
    "src": src.asset->url,
    alt
  },
  intro,
  bannerImage{
    "src": src.asset->url,
    alt
  },
  brand{
    name,
    desc,
    location
  },
  desc,
  images[]{
    "url": asset->url
  }
}`;

  const REALESTATE_QUERY = `*[_type == "project"]{
  _id,
  label,
  category,
  dateRange,
  work,
  location,
  area,
  contractedWith,
  images[]{
    "url": asset->url
  }
} | order(dateRange desc)`;

  const fetchOptions = { next: { revalidate: 30 } };

  useEffect(() => {
    async function fetchData() {
      const projectData = await client.fetch(query, {}, fetchOptions);
      const REALESTATEData = await client.fetch(
        REALESTATE_QUERY,
        {},
        fetchOptions
      );
      setFnbData(projectData.filter((obj) => obj.category === "fnb"));
      setEntertainmentData(
        projectData.filter((obj) => obj.category === "entertainment")
      );
      setRealEstateData(REALESTATEData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    switch (params) {
      case "real-estate":
        setData(realEstateData[dataIndex]);
        break;
      case "fnb":
        setData(fnbData[dataIndex]);
        break;
      case "entertainment":
        setData(entertainmentData[dataIndex]);
        break;
      default:
        setData(realEstateData);
    }
  }, [params, dataIndex, realEstateData, fnbData, entertainmentData]);

  const sliceSentences = (text) => {
    if (text && text !== "") {
      return text.replace(/\./g, ".\n");
    } else return text;
  };

  const showPageTabs =
    params === "real-estate" ||
    (params === "fnb" && fnbData.length > 1) ||
    (params === "entertainment" && entertainmentData.length > 1);

  // Image Modal props
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpenImageModal(true);
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
        {showPageTabs && (
          <div>
            <PageTab
              pageValue={dataIndex}
              data={
                params === "fnb"
                  ? fnbData
                  : params === "entertainment"
                    ? entertainmentData
                    : realEstateData
              }
              isArr
              onClick={(idx) => {
                setDataIndex(idx);
              }}
            />
          </div>
        )}
        {params !== "real-estate" && (
          <>
            <LogoBox>
              <Logo src={data?.logo?.src} alt={data?.logo?.alt} />
            </LogoBox>
            <Text>{data?.intro}</Text>
            <BannerImageWrapper>
              <Image src={data?.bannerImage?.src} />
            </BannerImageWrapper>
          </>
        )}
        <TextWrapper>
          <p style={{ color: colors.textGrey, fontSize: "14px" }}>
            {params === "real-estate" ? data?.dateRange : data?.brand?.desc}
          </p>
          <BrandName>
            <h4>
              {params === "real-estate" ? data?.label : data?.brand?.name}
            </h4>
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
              params === "fnb" ? (
                <ListedDesc key={idx}>
                  <li>{desc}</li>
                </ListedDesc>
              ) : (
                <Text key={idx} style={{ width: "55%" }}>
                  {desc}
                </Text>
              )
            )}
          </TextWrapper>
        )}
        {data?.images?.length > 0 && (
          <>
            <ImageWrapperSection>
              <Circle />
              <RedSquare />
              <ImageWrapper>
                {data?.images?.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.url}
                    alt={`${data?.brand?.name} 이미지 ${idx + 1}`}
                    onClick={() => handleImageClick(idx)}
                  />
                ))}
              </ImageWrapper>
            </ImageWrapperSection>
            <ImageCarousel
              images={data?.images}
              open={openImageModal}
              onClose={() => setOpenImageModal(false)}
              startIndex={selectedIndex}
            />
          </>
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
`;

const Text = styled.p`
  /* width: 55%; */
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

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.12s;
  }
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
