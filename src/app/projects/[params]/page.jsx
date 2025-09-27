"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import ImageCarousel from "../components/imageCarousel";
import colors from "../../../constants/colors";

import { client } from "../../../sanity/lib/client";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

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

const fetchOptions = { next: { revalidate: 30 } };

const ProjectsPage = () => {
  const { params } = useParams(); // dynamic [params]
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  const [fnbData, setFnbData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const projectData = await client.fetch(query, {}, fetchOptions);
      setFnbData(projectData.filter((obj) => obj.category === "fnb"));
      setEntertainmentData(
        projectData.filter((obj) => obj.category === "entertainment")
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!params || (params !== "fnb" && params !== "entertainment")) return;
    if (params === "fnb") setData(fnbData[dataIndex]);
    else if (params === "entertainment") setData(entertainmentData[dataIndex]);
  }, [params, dataIndex, fnbData, entertainmentData]);

  const showPageTabs =
    (params === "fnb" && fnbData.length > 1) ||
    (params === "entertainment" && entertainmentData.length > 1);

  // Image modal state
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpenImageModal(true);
  };

  return (
    <>
      <Title
        text={params === "entertainment" ? "엔터테인먼트" : "F&B"}
        hr={true}
        subtitle={
          params === "entertainment" ? (
            <>
              대명그룹이 책임지고 담당한 <span>엔터</span> 사업
            </>
          ) : (
            <>
              대명그룹이 책임지고 담당한 <span>F&B</span> 사업
            </>
          )
        }
      />
      <PageContainer>
        {showPageTabs && (
          <div
            style={{
              width: isMobile ? "100%" : "50%",
              padding: isMobile ? "0px 20px 20px 20px" : undefined,
            }}
          >
            <PageTab
              pageValue={dataIndex}
              data={params === "fnb" ? fnbData : entertainmentData}
              isArr
              onClick={(idx) => setDataIndex(idx)}
              isFullWidth={params === "entertainment"}
            />
          </div>
        )}

        {data && (
          <>
            <LogoBox>
              <Logo src={data.logo?.src} alt={data.logo?.alt} />
            </LogoBox>
            <Text style={{ textAlign: "center" }} $isMobile={isMobile}>
              {data.intro}
            </Text>
            <BannerImageWrapper>
              <Image src={data.bannerImage?.src} />
            </BannerImageWrapper>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <TextWrapper
                $isMobile={isMobile}
                style={{ alignItems: "center" }}
              >
                <p style={{ color: colors.textGrey, fontSize: "14px" }}>
                  {data.brand?.desc}
                </p>
                <BrandName>
                  <h4>{data.brand?.name}</h4>
                  <h6>{data.brand?.location}</h6>
                </BrandName>
              </TextWrapper>

              <TextWrapper style={{ alignItems: "left", paddingLeft: "50px" }}>
                {data.desc?.map((desc, idx) =>
                  params === "fnb" ? (
                    <ListedDesc key={idx} $isMobile={isMobile}>
                      <li>{desc}</li>
                    </ListedDesc>
                  ) : (
                    <Text
                      key={idx}
                      style={{
                        width: isMobile ? "85%" : "50vw",
                        textAlign: "left",
                      }}
                      $isMobile={isMobile}
                    >
                      {desc}
                    </Text>
                  )
                )}
              </TextWrapper>
            </div>

            {data.images?.length > 0 && (
              <>
                <ImageWrapperSection>
                  <Circle />
                  <RedSquare />
                  <ImageWrapper $isMobile={isMobile}>
                    {data.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img.url}
                        alt={`${data.brand?.name} 이미지 ${idx + 1}`}
                        onClick={() => handleImageClick(idx)}
                      />
                    ))}
                  </ImageWrapper>
                </ImageWrapperSection>
                <ImageCarousel
                  images={data.images}
                  open={openImageModal}
                  onClose={() => setOpenImageModal(false)}
                  startIndex={selectedIndex}
                />
              </>
            )}
          </>
        )}
      </PageContainer>
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
  padding: 10px 0px;
  white-space: pre-line;
  line-height: 1.75;
  color: ${colors.black};
  ${(props) =>
    props.$isMobile && {
      width: "90%",
    }};
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
  justify-content: center;
  ${(props) =>
    props.$isMobile && {
      width: "85%",
    }}
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
    text-align: center;
  }

  h6 {
    font-size: 14px;
    color: ${colors.charcoal};
  }
`;

const ListedDesc = styled.ul`
  text-align: left;
  li {
    font-size: 14px;
    margin-bottom: 5px;
    color: ${colors.black};
  }
  ${(props) =>
    props.$isMobile && {
      width: "70%",
    }}
`;

const RealEstateDesc = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  div {
    display: flex;
    align-items: center;
    span {
      width: 25px;
      height: auto;
    }
  }

  h5 {
    color: ${colors.red};
    font-weight: bold;
    font-size: 18px;
    margin-left: 5px;
    margin-right: 15px;
    overflow: hidden;
    white-space: nowrap;
  }

  p {
    text-align: center;
    color: ${colors.black};
  }

  ${(props) =>
    props.$isMobile && {
      flexDirection: "column",
      div: {
        margin: "10px 0px",
      },
    }}
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

  ${(props) =>
    props.$isMobile && {
      gridTemplateColumns: "1fr",
      width: "85%",
    }}
`;

const RedSquare = styled.div`
  width: 10rem;
  height: 10rem;
  background: ${colors.red};
  z-index: 0;
  position: absolute;
  right: 15%;
  bottom: -30px;
  @media (max-width: 900px) {
    right: -20px;
    bottom: -20px;
    width: 5rem;
    height: 5rem;
  }
  @media (max-width: 600px) {
    right: -10px;
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
  left: 15%;
  top: 180px;
  @media (max-width: 900px) {
    left: -40px;
    top: 40px;
    width: 5rem;
    height: 5rem;
  }
  @media (max-width: 600px) {
    left: -20px;
    top: 20px;
    width: 5rem;
    height: 5rem;
  }
`;
