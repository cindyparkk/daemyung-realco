"use client";
import styled from "styled-components";

import Title from "../../components/title";
import PageTab from "../../components/pageTab";
import Carousel from "../../components/carousel";
import menu_KO from "../../constants/routes";

const ServicesPage = () => {
  return (
    <>
      <Title
        text={"사업분야"}
        hr
        subtitle={
          <>
            대명그룹의 <span>핵심사업</span>을 소개합니다
          </>
        }
      />
      <TitleDescSection>
        <p>
          대명그룹은 분양대행을 넘어 F&B 사업과 엔터 사업을 아우르며,
          <br />
          신뢰할 수 있는 도전과 혁신을 통해 새로운 가치를 창출하는 기업입니다.
        </p>
      </TitleDescSection>
      <PageContainer>
        <PageTab pageValue={0} data={menu_KO[1].submenu} isRouter />
        <Carousel />
      </PageContainer>
    </>
  );
};

export default ServicesPage;

const TitleDescSection = styled.section`
  padding-bottom: 50px;
  text-align: center;
  p {
    font-weight: 300;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 50px 50px 50px;
`;
