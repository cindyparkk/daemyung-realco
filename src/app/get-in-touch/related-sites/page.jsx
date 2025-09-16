"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Title from "../../../components/title";
import SiteCard from "./components/siteCard";

import colors from "../../../constants/colors";

import { client } from "../../../sanity/lib/client";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const RelatedSitesPage = () => {
  const [siteData, setSiteData] = useState([]);

  const RELATEDSITE_QUERY = `*[_type == "relatedSite"]{
  title,
  category,
  "logoUrl": logo.src.asset->url,
  "logoAlt": logo.alt,
  link
}`;
  const fetchOptions = { next: { revalidate: 30 } };

  useEffect(() => {
    async function fetchData() {
      const siteData = await client.fetch(RELATEDSITE_QUERY, {}, fetchOptions);
      const grouped = siteData.reduce((acc, obj) => {
        const key = obj.category;
        if (!acc[key]) acc[key] = [];
        acc[key].push(obj);
        return acc;
      }, {});
      const groupedArray = Object.entries(grouped).map(([category, sites]) => ({
        category,
        sites,
      }));
      setSiteData(groupedArray.reverse());
    }
    fetchData();
  }, []);

  const isMobile = useClientMediaQuery("(max-width: 600px)");

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
          <SiteCardWrapper $isMobile={isMobile}>
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
  padding: 50px 10px;
`;

const SiteCardWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  ${(props) =>
    props.$isMobile && {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}
`;
