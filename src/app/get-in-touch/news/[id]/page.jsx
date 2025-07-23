"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Title from "../../../../components/title";
import CustomButton from "../../../../components/button";
import colors from "../../../../constants/colors";

import { client } from "../../../../sanity/lib/client";

const NewsArticlePage = () => {
  const [data, setData] = useState({});
  const query = `*[_id == $id][0]{
  _id,
  title,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  publishedAt,
  source,
  link,
  bodyText,
  author
}`;
  const { id } = useParams();
  const router = useRouter();
  const params = { id: id };

  useEffect(() => {
    async function fetchData() {
      const newsData = await client.fetch(query, params);
      setData(newsData);
    }
    fetchData();
  }, []);

  console.log(data);

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
        <BackButton onClick={() => router.back()}>
          <Image
            src={"/assets/icons/left-icon.svg"}
            alt={"Back Icon"}
            width={20}
            height={20}
          />
          <h5>목록</h5>
        </BackButton>
        <ArticleTitle>
          <h1>{data.title}</h1>
          <p>
            {data.publishedAt} | <span>{data.source}</span> {data.author}
          </p>
        </ArticleTitle>
        {data.image?.asset && (
          <BannerImageWrapper>
            <BannerImage src={data.image.asset.url} alt={data.image.alt} />
          </BannerImageWrapper>
        )}
        <p style={{ padding: "30px 0px", whiteSpace: "pre-line" }}>
          {data.bodyText}
        </p>
        <SourceWrapper>
          {data?.link && (
            <div>
              <span>출처: </span>{" "}
              <p>
                <Link
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.source}
                </Link>
              </p>
            </div>
          )}
          <CustomButton
            text={"목록으로 돌아가기"}
            onClick={() => router.back()}
          />
        </SourceWrapper>
      </PageContainer>
    </>
  );
};

export default NewsArticlePage;

const PageContainer = styled.div`
  width: 90%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  padding-bottom: 50px;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: -20px;
  padding-bottom: 15px;
  color: ${colors.textGrey};
  h5 {
    font-size: 16px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity ease-in-out 0.15s;
  }
`;

const ArticleTitle = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  width: 100%;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 2.5rem;
    margin: 20px 0;
    text-align: center;
    width: 90%;
    line-height: 1.25;
  }
  p {
    color: ${colors.textGrey};
    span {
      font-weight: bold;
    }
  }
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  max-height: 450px;
  overflow: hidden;
  margin-top: 50px;
`;

const BannerImage = styled.img`
  width: 100%;
  display: block;
`;

const SourceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  div {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }

  span {
    font-weight: bold;
    color: ${colors.red};
    margin-right: 10px;
  }

  p {
    border-bottom: 1px solid ${colors.black};
    font-weight: 300;
    &:hover {
      color: ${colors.red};
      border-bottom: 1px solid ${colors.red};
      transition: color 0.12s;
    }
  }
`;
