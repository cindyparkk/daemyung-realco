"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import ImageCarousel from "../components/imageCarousel";
import colors from "../../../constants/colors";

import { client } from "../../../sanity/lib/client";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

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

const RealEstatePage = () => {
  const router = useRouter();
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  const [realEstateData, setRealEstateData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchRealEstate() {
      const data = await client.fetch(REALESTATE_QUERY, {}, fetchOptions);
      setRealEstateData(data);
      setData(data[0]);
    }
    fetchRealEstate();
  }, []);

  useEffect(() => {
    setData(realEstateData[dataIndex]);
  }, [dataIndex, realEstateData]);

  // Image Modal state
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpenImageModal(true);
  };

  return (
    <>
      <Title
        text="분양대행"
        subtitle={
          <>
            대명그룹이 책임지고 담당한 <span>분양대행</span>
          </>
        }
      />
      <PageContainer>
        {realEstateData.length > 1 && (
          <div
            style={{
              width: isMobile ? "100%" : "50%",
              padding: isMobile ? "0px 20px 20px 20px" : undefined,
            }}
          >
            <PageTab
              pageValue={dataIndex}
              data={realEstateData}
              isArr
              onClick={(idx) => setDataIndex(idx)}
            />
          </div>
        )}

        {data && (
          <>
            <div
              style={{
                paddingTop: "30px",
                width: isMobile ? "85%" : undefined,
              }}
            >
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/work-icon.svg"} />
                  </span>
                  <h5>업무</h5>
                </div>
                <p>{data.work}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/location-icon.svg"} />
                  </span>
                  <h5>위치</h5>
                </div>
                <p>{data.location}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/area-icon.svg"} />
                  </span>
                  <h5>연면적</h5>
                </div>
                <p>{data.area}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/contract-icon.svg"} />
                  </span>
                  <h5>계약주체</h5>
                </div>
                <p>{data.contractedWith}</p>
              </RealEstateDesc>
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
                        alt={`분양대행 이미지 ${idx + 1}`}
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

export default RealEstatePage;

// Styled Components copied from original code

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 50px 0px;
  gap: 20px;
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
  grid-template-columns: repeat(2, 1fr);
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
