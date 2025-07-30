"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Title from "../../../components/title";
import NewsTable from "./components/newsTable";

import { client } from "../../../sanity/lib/client";

const NewsPage = () => {
  const [data, setData] = useState([]);
  const NEWS_QUERY = `*[_type == "newsItem"]{
  _id,
  title,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  publishedAt,
  source,
  link
} | order(publishedAt desc)`;

  const fetchOptions = { next: { revalidate: 30 } };

  useEffect(() => {
    async function fetchData() {
      const newsData = await client.fetch(NEWS_QUERY, {}, fetchOptions);
      setData(newsData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Title
        text={"뉴스&소식"}
        hr
        subtitle={
          <>
            대명그룹의 <span>최신 이슈</span>를 전달합니다
          </>
        }
      />
      <PageContainer>
        <NewsTable data={data} />
      </PageContainer>
    </>
  );
};

export default NewsPage;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
`;
