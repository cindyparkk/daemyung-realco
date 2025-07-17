"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Title from "../../../components/title";
import SiteCard from "./components/siteCard";

import colors from "../../../constants/colors";

const TEST_DATA = [
  {
    category: "분양대행",
    sites: [
      {
        logo: "/assets/images/logo/cgv-logo.svg",
        website: "https://cgv.co.kr/",
        alt: "CGV Logo",
      },
      {
        logo: "/assets/images/logo/cgv-logo.svg",
        website: "https://cgv.co.kr/",
        alt: "CGV Logo",
      },
    ],
  },
  {
    category: "F&B",
    sites: [
      {
        logo: "/assets/images/logo/cgv-logo.svg",
        website: "https://cgv.co.kr/",
        alt: "CGV Logo",
      },
      {
        logo: "/assets/images/logo/cgv-logo.svg",
        website: "https://cgv.co.kr/",
        alt: "CGV Logo",
      },
    ],
  },
  {
    category: "엔터테인먼트",
    sites: [
      {
        logo: "/assets/images/logo/cgv-logo.svg",
        website: "https://cgv.co.kr/",
        alt: "CGV Logo",
      },
      {
        logo: "/assets/images/logo/cgv-logo.svg",
        website: "https://cgv.co.kr/",
        alt: "CGV Logo",
      },
    ],
  },
];

const RelatedSitesPage = () => {
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
    setSiteData(TEST_DATA);
  }, []);

  return (
    <>
      <Title
        text={"관련 사이트"}
        hr
        subtitle={
          <>
            대명그룹과 <span>관련된 사이트</span>를 안내드립니다
          </>
        }
      />
      <PageContainer>
        <SiteSection>
          <SiteCardWrapper>
            {siteData &&
              siteData.map((data, idx) => (
                <SiteCard
                  key={idx}
                  category={data.category}
                  data={data.sites}
                />
              ))}
          </SiteCardWrapper>
        </SiteSection>
      </PageContainer>
    </>
  );
};

export default RelatedSitesPage;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SiteSection = styled.section`
  background-color: ${colors.black};
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

const SiteCardWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
