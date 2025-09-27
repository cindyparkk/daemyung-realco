"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Title from "../../../../components/title";
import PageTab from "../../../../components/pageTab";
import ImageCarousel from "../../components/imageCarousel";
import ImageCarouselInline from "../../components/inlineImageCarousel";
import colors from "../../../../constants/colors";

import { client } from "../../../../sanity/lib/client";
import useClientMediaQuery from "../../../../hooks/useClientMediaQuery";
import useTransitionRouter from "../../../../hooks/useTransitionRouter";

const REALESTATE_QUERY_BY_CATEGORY = (categoryId) => `
*[_type == "project" && category._ref == "${categoryId}"] {
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
} | order(dateRange desc)
`;

const CATEGORY_QUERY = `*[_type == "real-estate-category"] | order(_createdAt asc){ _id, title, _createdAt }`;

const fetchOptions = { next: { revalidate: 30 } };

const RealEstatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const isTablet = useClientMediaQuery("(max-width: 850px)");

  // Extract tab index from pathname (last segment)
  const pathSegments = pathname.split("/");
  const tabParam = pathSegments[pathSegments.length - 1];
  const dataIndex =
    tabParam && !isNaN(parseInt(tabParam)) ? parseInt(tabParam) : 0;

  const [categories, setCategories] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // Fetch categories once
  useEffect(() => {
    async function fetchCategories() {
      const projectCategories = await client.fetch(
        CATEGORY_QUERY,
        {},
        fetchOptions
      );
      setCategories(projectCategories);
    }
    fetchCategories();
  }, []);

  // Fetch projects when categories or tab changes
  useEffect(() => {
    async function fetchProjects() {
      if (categories.length > 0 && categories[dataIndex]) {
        const projectsByCategory = await client.fetch(
          REALESTATE_QUERY_BY_CATEGORY(categories[dataIndex]._id),
          {},
          fetchOptions
        );
        setFilteredProjects(projectsByCategory);
        setSelectedProjectIndex(0);
      }
    }
    fetchProjects();
  }, [categories, dataIndex]);

  // Ensure valid project index
  useEffect(() => {
    if (selectedProjectIndex >= filteredProjects.length) {
      setSelectedProjectIndex(0);
    }
  }, [filteredProjects, selectedProjectIndex]);

  const currentProject = filteredProjects[selectedProjectIndex];

  // Image Modal state
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpenImageModal(true);
  };

  //   const { push } = useTransitionRouter();

  const handleButtonClick = async (index) => {
    router.push(`/projects/real-estate/${index}`);
  };

  console.log(currentProject);

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
        {/* Buttons for tab selection */}
        <ButtonGroup $isMobile={isMobile}>
          {categories.map((cat, idx) => (
            <TabButton
              key={cat._id}
              $active={idx === dataIndex}
              onClick={() => handleButtonClick(idx)}
            >
              {cat.title}
            </TabButton>
          ))}
        </ButtonGroup>

        <div
          style={{
            width: "100%",
            padding: isMobile ? "0px 20px 20px 20px" : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PageTab
            pageValue={selectedProjectIndex}
            data={filteredProjects}
            isArr
            onClick={(idx) => setSelectedProjectIndex(idx)}
          />
        </div>

        {currentProject && (
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
                <p>{currentProject.work}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/location-icon.svg"} />
                  </span>
                  <h5>위치</h5>
                </div>
                <p>{currentProject.location}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/area-icon.svg"} />
                  </span>
                  <h5>연면적</h5>
                </div>
                <p>{currentProject.area}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/contract-icon.svg"} />
                  </span>
                  <h5>계약주체</h5>
                </div>
                <p>{currentProject.contractedWith}</p>
              </RealEstateDesc>
              <RealEstateDesc $isMobile={isMobile}>
                <div>
                  <span>
                    <Image src={"/assets/icons/calendar-icon.svg"} />
                  </span>
                  <h5>진행기간</h5>
                </div>
                <p>{currentProject.dateRange}</p>
              </RealEstateDesc>
            </div>

            {currentProject.images?.length > 0 && (
              <>
                <ImageWrapperSection>
                  {!isTablet && (
                    <>
                      <Circle />
                      <RedSquare />
                    </>
                  )}
                  <ImageCarouselInline
                    images={currentProject.images}
                    onImageClick={(idx) => handleImageClick(idx)}
                  />
                </ImageWrapperSection>

                {/* Full-size modal carousel */}
                <ImageCarousel
                  images={currentProject.images}
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
  margin: 50px 0px 0px 0px;
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
  right: 30px;
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
  left: 10px;
  top: 20px;
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

// Buttons container
const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;

  ${(props) =>
    props.$isMobile &&
    `
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `}
`;

// Single tab button
const TabButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: ${(props) => (props.$active ? colors.white : colors.red)};
  background-color: ${(props) => (props.$active ? colors.red : "transparent")};
  border: 2px solid ${colors.red};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};

  &:hover {
    background-color: ${colors.red};
    color: ${colors.white};
  }
`;
