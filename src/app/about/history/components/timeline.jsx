"use client";

import { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Fade } from "@mui/material";
import Image from "next/image";

import colors from "../../../../constants/colors";
import { urlFor } from "../../../../sanity/lib/client";
import useClientMediaQuery from "../../../../hooks/useClientMediaQuery";

export default function AnimatedTimeline({ data }) {
  const refs = useRef([]);
  const [visible, setVisible] = useState(data.map(() => false));

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safety

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setVisible((prev) => {
                if (!prev[index]) {
                  const newVis = [...prev];
                  newVis[index] = true;
                  return newVis;
                }
                return prev;
              });
              observer.unobserve(entry.target); // animate only once
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <Timeline position="right">
      {data.map((dataItem, idx) => {
        return (
          <Fade key={idx} in={visible[idx]} timeout={1000}>
            <StyledTimelineItem
              ref={(el) => (refs.current[idx] = el)}
              $isMobile={isMobile}
            >
              {!isMobile && dataItem.image?.asset && (
                <TimelineOppositeContent
                  sx={{ paddingTop: "30px", paddingBottom: "25vh" }}
                >
                  <Image
                    src={urlFor(dataItem.image.asset._ref)
                      // .width(800)
                      .url()}
                    alt={dataItem.year}
                    layout="responsive"
                    width={350}
                    height={150}
                    objectFit="cover"
                    priority
                  />
                </TimelineOppositeContent>
              )}
              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: colors.red }} />
                {idx < data.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent
                // ref={(el) => (refs.current[idx] = el)}
                tabIndex={0}
              >
                {isMobile && dataItem.image?.asset && (
                  <ImageWrapper>
                    <Image
                      src={urlFor(dataItem.image.asset._ref).url()}
                      alt={dataItem.year}
                      layout="responsive"
                      width={350}
                      height={150}
                      objectFit="cover"
                      priority
                    />
                  </ImageWrapper>
                )}
                <YearTitle $isMobile={isMobile}>{dataItem.year}</YearTitle>
                <Content $isMobile={isMobile}>
                  {dataItem.fields.map((item, idx) => (
                    <div key={idx}>
                      <span>{item.month}</span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </Content>
              </TimelineContent>
            </StyledTimelineItem>
          </Fade>
        );
      })}
    </Timeline>
  );
}

const StyledTimelineItem = styled(TimelineItem)`
  /* Default styles */
  &::before {
    flex: 1;
  }

  /* When isMobile is true, remove the flex on ::before */
  ${(props) =>
    props.$isMobile &&
    css`
      &::before {
        flex: 0 !important;
        content: none !important; /* remove the pseudo-element entirely */
      }
    `}
`;

const YearTitle = styled.h1`
  font-size: 3rem;
  color: ${colors.red};
  /* margin-bottom: 25px; */
  margin-left: 35px;
  margin-top: -20px;

  ${(props) =>
    props.$isMobile && {
      marginLeft: "0px",
    }}
`;

const Content = styled.div`
  margin-left: 70px;
  padding-top: 35px;
  color: ${colors.white};
  padding-bottom: 25vh;
  div {
    display: flex;
    align-items: flex-start;
    padding-bottom: 15px;
  }
  p {
    margin-bottom: 8px;
    color: #fff;
    letter-spacing: 0.01em;
    font-size: 18px;
    font-weight: 300;
    /* max-width: 10vw; */
  }
  span {
    font-weight: 600;
    letter-spacing: 10px;
    font-size: 18px;
    margin-right: 10px;
    min-width: 36px;
  }

  ${(props) =>
    props.$isMobile && {
      marginLeft: "0px",
      paddingBottom: "10vh",
    }}
`;

const ImageWrapper = styled.div`
  margin-bottom: 20px;
  /* You may want to adjust spacing/margins here */
`;
