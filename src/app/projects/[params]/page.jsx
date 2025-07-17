"use client";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import Title from "../../../components/title";

import colors from "../../../constants/colors";

const sections = ["real-estate", "fnb", "entertainment"];

const ProjectsPage = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const router = useRouter();
  const { params } = useParams(); // This gets the dynamic [params]
  const [currentIndex, setCurrentIndex] = useState(() => {
    const index = sections.indexOf(params);
    return index !== -1 ? index : 0;
  });

  // On load: scroll to the section based on the URL param
  useEffect(() => {
    const index = sections.indexOf(params);
    if (index !== -1 && sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "auto" });
      setCurrentIndex(index);
    }
  }, [params]);

  // Throttle scroll handling with a timer to avoid spamming
  const scrollTimeout = useRef(null);

  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const scrollTop = containerRef.current.scrollTop;
      const height = window.innerHeight;
      const index = Math.round(scrollTop / height);

      if (index !== currentIndex) {
        setCurrentIndex(index);
        router.replace(`/projects/${sections[index]}`);
      }
    }, 100); // Wait 100ms after scroll ends
  };

  // Example: determine content by params
  let content;
  switch (params) {
    case "real-estate":
      content = <div>Real Estate projects content...</div>;
      break;
    case "fnb":
      content = <div>Food & Beverage projects content...</div>;
      break;
    case "entertainment":
      content = <div>Entertainment projects content...</div>;
      break;
    default:
      content = <div>Some other projects content...</div>;
  }

  // Use 'page' to change content dynamically
  return (
    <>
      <ScrollContainer ref={containerRef} onScroll={handleScroll}>
        {sections.map((section, i) => (
          <Section
            key={section}
            ref={(el) => (sectionRefs.current[i] = el)}
            $bg={section}
          >
            <SectionContent>{section.toUpperCase()} CONTENT</SectionContent>
          </Section>
        ))}
      </ScrollContainer>
      {/* <Title
        text={
          params === "entertainment"
            ? "엔터테인먼트"
            : params === "fnb"
              ? "F&B"
              : "분양대행"
        }
        hr
        subtitle={
          params === "entertainment" ? (
            <>
              대명그룹이 책임지고 담당한 <span>엔터</span> 사업
            </>
          ) : params === "fnb" ? (
            <>
              대명그룹이 책임지고 담당한 <span>F&B</span> 사업
            </>
          ) : (
            <>
              대명그룹이 책임지고 담당한 <span>분양대행</span>
            </>
          )
        }
      /> */}
    </>
  );
};

export default ProjectsPage;

const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  width: 100%;
`;

const Section = styled.div`
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionContent = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 50px 50px 50px;
`;
