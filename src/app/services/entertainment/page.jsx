"use client";
import styled from "styled-components";

import Title from "../../../components/title";
import PageTab from "../../../components/pageTab";

import menu_KO from "../../../constants/routes";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";
import colors from "../../../constants/colors";

const ServicesEntPage = () => {
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <Title
        text={"엔터테인먼트"}
        hr
        subtitle={
          <>
            <span>안정성</span>과 <span>수익성</span>을 함께 쌓아가는 대명그룹
          </>
        }
      />
      <TitleDescSection $isMobile={isMobile}>
        <p>
          대명그룹은 단순한 분양을 넘어, ‘운영의 관점에서 바라본 상업시설’
          이라는 시각으로
          <br />
          투자자와 임차인 모두에게 안정성과 수익성을 갖춘 성공적인 상업 부동산
          솔루션을 제공합니다.
        </p>
      </TitleDescSection>
      <PageContainer $isMobile={isMobile}>
        <PageTab
          pageValue={2}
          data={menu_KO[1].submenu.slice(1)}
          isRouter
          isFullWidth
        />
        <BannerImageWrapper $isMobile={isMobile}>
          <BannerImage
            loading="lazy"
            src="/assets/images/enter-banner.jpg"
            alt="Banner Image"
          />
        </BannerImageWrapper>
        <TextWrapper>
          <p>
            상업시설의 앵커시설인 정주, 체류시간을연장해줄 앵커테넌트를 직접
            운영합니다.
            <br />
            저희 대명리얼코는 상업시설의 투자에 전문화를 기하기 위해
            엔터테인먼트시설의 운영을 통해
            <br />
            상업시설 투자, 운영 노하우를 갖추고 있어 전문화된 전략을 제공합니다.
          </p>
        </TextWrapper>
        <SectionsContainer>
          <Section>
            <SectionHeader>
              <h1>01</h1>
              <h2>프렌즈스크린 (스크린골프)</h2>
            </SectionHeader>
            <SectionImages>
              <img
                src="/assets/images/projects/enter1-banner.jpg"
                alt="Friends Screen Entrance"
              />
              <img
                src="/assets/images/projects/enter1-3.jpg"
                alt="Friends Screen Reception"
              />
              <img
                src="/assets/images/projects/enter1-1.jpg"
                alt="Friends Screen Shop"
              />
            </SectionImages>
            <SectionText>
              프렌즈스크린 GIDC광명역점은 최신 골프 시뮬레이터와 고해상도
              스크린을 통해 실내에서도 실제골프와 같은 몰입감 있는 경험을
              제공합니다. <br />
              GIDC광명역점은 광명역 인근에 위치해 있어 접근성이 뛰어나며, 최신
              시설과 함께 편안한 분위기에서 골프의 매력을 만끽할 수 있는
              공간입니다. <br />
              실제 스크린골프 운영을 통해 분양 및 임대 시 필요한 건축사항, 체원,
              운영등 노하우를 축적하여, <br />
              상업시설의 성공적인 분양 및 활성화에 차별화된 컨설팅을 제공합니다.
            </SectionText>
          </Section>
          <Section>
            <SectionHeader>
              <h1>02</h1>
              <h2>멀티플렉스 영화관</h2>
            </SectionHeader>
            <SectionImages>
              <img
                src="/assets/images/projects/enter2-4.jpg"
                alt="Multiplex theater entrance"
              />
              <img
                src="/assets/images/projects/enter2-3.jpg"
                alt="Multiplex ticket kiosks"
              />
              <img
                src="/assets/images/projects/enter2-banner.jpg"
                alt="Multiplex seating area"
              />
            </SectionImages>
            <SectionText>
              CGV광명역 멀티플렉스 영화관은 총 5개관 전석 리클라이너석으로
              개발하여 <br />
              영화 관람객에게 영화 시청각 콘텐츠의 만족 뿐만 아니라 편안한
              시청환경을 제공하는 고객만족 최우선의 공간으로 개발되었습니다.{" "}
              <br />
              고객의 체류시간을 최대한 유치시킬 수 있는 앵커테넌트를 직접
              운영해보며 <br />
              실제 상권의 고객 흐름과 트렌드 파악을 가장 우선하여 현장의
              중심에서 경험을 쌓고 있는 대명리얼코의 차별화된 경쟁력입니다.
            </SectionText>
          </Section>
        </SectionsContainer>
      </PageContainer>
    </>
  );
};

export default ServicesEntPage;

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

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px 0px 20px 0px;
  ${(props) =>
    props.$isMobile && {
      flexDirection: "column",
    }}
`;

const ImageWrapper = styled.div`
  height: ${(props) => props.$height};
  width: auto;
  overflow: hidden; // hides any overflow for non-matching aspect ratios
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: auto;
  display: block;
`;

const TextWrapper = styled.div`
  text-align: center;
  padding: 50px 0px;
  color: ${colors.black};
  p {
    font-weight: 300;
    line-height: 1.5;
  }
`;

const SectionsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 50px;
`;

const Section = styled.section`
  margin-bottom: 80px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.charcoal};

  h1 {
    font-weight: 700;
    color: ${colors.red};
    font-size: 24px;
  }

  h2 {
    font-weight: 700;
    font-size: 20px;
    color: ${colors.charcoal};
  }
`;

const SectionImages = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;

  img {
    width: 32.5%;
    object-fit: cover;
    border-radius: 2px;
  }
`;

const SectionText = styled.p`
  margin-top: 25px;
  font-weight: 300;
  line-height: 1.6;
  text-align: center;
  white-space: pre-line;
  color: ${colors.black};
`;
