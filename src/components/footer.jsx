"use client";
import Image from "next/image";
import styled from "styled-components";
import colors from "../constants/colors";
import useClientMediaQuery from "../hooks/useClientMediaQuery";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <FooterContainer>
      <ContentContainer $isMobile={isMobile}>
        <div style={{ textAlign: isMobile && "center" }}>
          <FooterTitle>(주)대명리얼코</FooterTitle>
          <FooterText>
            대표자: 이문수
            <br />
            주소: 경기도 광명시 일직로 43, G237호 (일직동, GIDC몰)
            <br />
            사업자등록번호: 220-88-15823
          </FooterText>
        </div>
        <div style={{ textAlign: isMobile ? "center" : "right" }}>
          <FooterTitle>CONTACT</FooterTitle>
          <FooterText>
            Phone: 02-6672-1115
            <br />
            Fax: 02-6672-1116
          </FooterText>
        </div>
      </ContentContainer>
      <LogoContainer $isMobile={isMobile}>
        <hr style={{ width: "100%", border: `0.5px solid ${colors.white}` }} />
        <Image
          src="/assets/logo-light.svg"
          alt="Logo"
          width={110}
          height={75}
        />
        <hr style={{ width: "100%", border: `0.5px solid ${colors.white}` }} />
      </LogoContainer>
      <FooterLinks $isMobile={isMobile}>
        <FooterText>
          Copyright © {year} 대명리얼코. All rights reserved.{" "}
          {!isMobile && `|`}
        </FooterText>
        <FooterLink href="#">개인정보 처리방침</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};
export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  /* position: absolute; */
  background-color: ${colors.black};
  bottom: 0;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 75%;
  padding-top: 20px;
  ${(props) =>
    props.$isMobile && {
      flexDirection: `column`,
      alignItems: "center",
      gap: "35px",
    }}
`;

const FooterTitle = styled.h1`
  color: ${colors.red};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const FooterText = styled.p`
  color: ${colors.white};
  font-size: 14px;
  line-height: 30px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 75%;
  margin-top: ${(props) => (props.$isMobile ? "35px" : "-20px")};
  margin-bottom: 15px;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${(props) =>
    props.$isMobile && {
      flexDirection: `column`,
    }}
`;
const FooterLink = styled.a`
  color: ${colors.white};
  text-decoration: none;
  font-size: 14px;
  text-decoration: underline;
`;
