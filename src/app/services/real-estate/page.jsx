"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";
import StepCard from "./components/stepCard";

import menu_KO from "../../../constants/routes";
import colors from "../../../constants/colors";
import RealEstateSteps from "../../../data/realEstateSteps";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";
import { client } from "../../../sanity/lib/client";

const CATEGORY_QUERY = `*[_type == "real-estate-category"] | order(_createdAt asc){ _id, title, _createdAt }`;

const fetchOptions = { next: { revalidate: 30 } };

const ServicesRealEstatePage = () => {
  const router = useRouter();
  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const [categories, setCategories] = useState([]);

  // Fetch categories
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

  const handleButtonClick = async (index) => {
    router.push(`/projects/real-estate/${index}`);
  };

  return (
    <>
      <Title
        text={"분양대행"}
        hr
        subtitle={
          <>
            <span>분양</span>의 <span>시작</span>부터 <span>마무리까지</span>,
            대명그룹이 함께합니다
          </>
        }
      />
      <TitleDescSection $isMobile={isMobile}>
        <p>
          대명그룹은 다년간의 숙련된 경험과 차별화 된 마케팅 노하우, 체계적인
          운영 시스템을 제공하여
          <br />
          클라이언트가 만족할 수 있는 최적의 맞춤형 분양 솔루션을 제공합니다.
        </p>
      </TitleDescSection>
      <PageContainer $isMobile={isMobile}>
        <PageTab
          pageValue={0}
          data={menu_KO[1].submenu.slice(1)}
          isRouter
          isFullWidth
        />
        <BannerImageWrapper $isMobile={isMobile}>
          <BannerImage
            src="/assets/images/real-estate-banner.jpg"
            alt="Banner Image"
          />
        </BannerImageWrapper>
        <TitleWrapper>
          <hr
            style={{
              width: "20%",
              border: `0.5px solid ${colors.darkGrey}`,
            }}
          />
          <h3>분양대행 사업분야</h3>
          <hr
            style={{
              width: "20%",
              border: `0.5px solid ${colors.darkGrey}`,
            }}
          />
        </TitleWrapper>
        <ButtonGroup $isMobile={isMobile}>
          {categories.map((cat, idx) => (
            <TabButton key={cat._id} onClick={() => handleButtonClick(idx)}>
              {cat.title}
            </TabButton>
          ))}
        </ButtonGroup>
        <TitleWrapper>
          <hr
            style={{
              width: "20%",
              border: `0.5px solid ${colors.darkGrey}`,
            }}
          />
          <h3>분양대행 프로세스</h3>
          <hr
            style={{
              width: "20%",
              border: `0.5px solid ${colors.darkGrey}`,
            }}
          />
        </TitleWrapper>
        <StepCardWrapper $isMobile={isMobile}>
          {RealEstateSteps.map((item, idx) => (
            <StepCard key={idx} data={item} />
          ))}
        </StepCardWrapper>
      </PageContainer>
    </>
  );
};

export default ServicesRealEstatePage;

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
  min-height: 350px;
  height: 30vh;
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

const StepCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Always 3 columns
  grid-template-rows: repeat(2, 1fr); // Always 2 rows
  gap: 30px;
  justify-items: center;
  align-items: center;
  padding-top: 20px;

  @media (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 20px;
  }

  // Responsive override for mobile
  ${(props) =>
    props.$isMobile &&
    `
      grid-template-columns: 1fr;
      grid-template-rows: none;
      gap: 20px;
    `}
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin: 30px 0px;
  h3 {
    letter-spacing: 0.5rem;
    font-size: 12px;
    color: ${colors.darkGrey};
    text-align: center;
    /* width: 100%; */
    margin-right: -0.5rem;
  }
`;

// Buttons container
const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
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
  padding: 8px 20px;
  font-size: 16px;
  color: ${colors.red};
  background-color: transparent;
  border: 2px solid ${colors.red};
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${colors.red};
    color: ${colors.white};
  }
`;
