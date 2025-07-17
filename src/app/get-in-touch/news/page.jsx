"use client";
import styled from "styled-components";
import { useState } from "react";

import Title from "../../../components/title";
import NewsTable from "./components/newsTable";

import colors from "../../../constants/colors";

const newsData = [
  {
    id: 1,
    image: "/assets/images/hero-image.jpg",
    title: "[뉴스 제목1]",
    source: "[매체명]",
    date: "2024.05.01",
  },
  {
    id: 2,
    title: "[뉴스 제목2]",
    source: "[매체명]",
    date: "2024.05.01",
  },
  {
    id: 3,
    image: "",
    title: "[뉴스 제목3]",
    source: "[매체명]",
    date: "2024.05.01",
  },
  {
    id: 4,
    image: "/news-img1.jpg",
    title: "[뉴스 제목4]",
    source: "[매체명]",
    date: "2024.05.01",
  },
  {
    id: 5,
    image: "/news-img1.jpg",
    title: "[뉴스 제목5]",
    source: "[매체명]",
    date: "2024.05.01",
  },
];

const NewsPage = () => {
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
        <NewsTable data={newsData} />
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
