"use client";
import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import { client, urlFor } from "../../../sanity/lib/client";

import Title from "../../../components/title";
import colors from "../../../constants/colors";
import TimelineSection from "./components/timelineSection";

const HistoryPage = () => {
  const sectionRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [timelineData, setTimelineData] = useState([]);
  const TIMELINE_QUERY = `*[
    _type == "timeline" && defined(year)
  ] | order(year desc)[0...12]{
    year,
    image,
    fields[] { month, text }
  }`;
  const fetchOptions = { next: { revalidate: 30 } };

  useEffect(() => {
    async function fetchData() {
      const timelineData = await client.fetch(TIMELINE_QUERY, {}, fetchOptions);
      setTimelineData(timelineData);
    }

    fetchData();
    sectionRefs.current = sectionRefs.current.slice(0, timelineData.length);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sectionRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (idx !== -1) setActiveIdx(idx);
        }
      });
    }, options);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (observer) {
        sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      }
    };
  }, []);

  return (
    <>
      <HistoryPageWrapper>
        <PageContainer>
          <Title
            text={"회사 연혁"}
            hr
            color={colors.white}
            subtitle={
              <>
                대명그룹의 <span>어제</span>와 <span>오늘</span>, 그리고
                <span>미래</span>
              </>
            }
          />
          <Container>
            <TimelineImageWrapper>
              {timelineData[activeIdx] && (
                <Image
                  src={urlFor(timelineData[activeIdx].image.asset._ref)
                    // .width(800)
                    .url()}
                  alt={timelineData[activeIdx].year}
                  layout="responsive"
                  width={400}
                  height={250}
                  objectFit="cover"
                  priority
                />
              )}
            </TimelineImageWrapper>
            <Sections>
              {timelineData.map((data, idx) => (
                <TimelineSection
                  key={data.year}
                  year={data.year}
                  items={data.fields}
                  active={activeIdx === idx}
                  ref={(el) => (sectionRefs.current[idx] = el)}
                  onClick={() => {
                    sectionRefs.current[idx]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  isFirst={idx === 0}
                  isLast={idx === timelineData.length - 1}
                />
              ))}
            </Sections>
          </Container>
        </PageContainer>
      </HistoryPageWrapper>
    </>
  );
};

export default HistoryPage;

const HistoryPageWrapper = styled.main`
  background: ${colors.black};
  color: ${colors.white};
  min-height: 100vh;
  min-width: 100vw;
  margin-top: -64px;
  /* margin-bottom: -20px; */
`;

const PageContainer = styled.div`
  padding: 64px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const TimelineImageWrapper = styled.div`
  /* flex: 0 0 520px; */
  margin-right: 48px;
  align-self: flex-start;
  position: sticky;
  top: 100px;
  /* height: 350px; */
  max-width: 440px;
  height: auto;

  @media (max-width: 1024px) {
    position: relative;
    margin-bottom: 24px;
    height: 220px;
    margin-right: 0;
    width: 100%;
  }
`;

const TimelineImage = styled.img`
  width: 100%;
  display: block;
`;

const Sections = styled.div`
  flex: 1;
  padding-bottom: 60px;
`;
