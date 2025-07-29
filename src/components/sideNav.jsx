import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useTransitionRouter from "../hooks/useTransitionRouter";
import useClientMediaQuery from "../hooks/useClientMediaQuery";

import colors from "../constants/colors";
import menu_KO from "../constants/routes";

// mobile expandable
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SideNav = ({ isOpen, onClose, children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Wait for the next tick to enable click-away detection
      const timer = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(timer);
    } else {
      setReady(false);
    }
  }, [isOpen]);

  const { push } = useTransitionRouter();

  const handleMenuClick = async (path) => {
    await push(path);
    onClose();
  };

  const isMobile = useClientMediaQuery("(max-width: 600px)");

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Backdrop $isOpen={isOpen} />
      {isOpen && (
        <ClickAwayListener onClickAway={onClose}>
          <SidebarWrapper
            $isOpen={isOpen}
            role="navigation"
            $isMobile={isMobile}
          >
            <SideNavContent>
              <div>
                <ImageWrapper>
                  <Image
                    src="/assets/icons/plus-icon.svg"
                    alt="Close-icon"
                    width={50}
                    height={50}
                    style={{
                      cursor: "pointer",
                      transform: "rotate(90deg)",
                      "&:hover": { opacity: 0.8 },
                    }}
                    onClick={onClose}
                  />
                </ImageWrapper>
                {isMobile ? (
                  <AccordionContainer>
                    {menu_KO.map((item, index) => (
                      <StyledAccordion
                        key={index}
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                        $isFirst={index === 0}
                      >
                        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <h2>{item.label}</h2>
                        </StyledAccordionSummary>
                        <StyledAccordionDetails>
                          {item.submenu.map((sub, idx) => (
                            <p
                              style={{ margin: "5px 0" }}
                              onClick={() => handleMenuClick(sub.path)}
                              key={idx}
                            >
                              {sub.label}{" "}
                            </p>
                          ))}
                        </StyledAccordionDetails>
                      </StyledAccordion>
                    ))}
                  </AccordionContainer>
                ) : (
                  <>
                    {menu_KO.map((item) => (
                      <div key={item.key}>
                        <MenuTitle $isMobile={isMobile}>{item.label}</MenuTitle>
                        <MenuItems $isMobile={isMobile}>
                          {item.submenu.map((sub, idx) => (
                            <div key={idx}>
                              <p
                                style={{ margin: "5px 0" }}
                                onClick={() => handleMenuClick(sub.path)}
                              >
                                {sub.label}{" "}
                              </p>
                              {idx !== item.submenu.length - 1 && (
                                <span>|</span>
                              )}
                            </div>
                          ))}
                        </MenuItems>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <LargeText>Daemyung</LargeText>
            </SideNavContent>
          </SidebarWrapper>
        </ClickAwayListener>
      )}
    </>
  );
};

export default SideNav;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: ${(props) => (props.$isMobile ? "100vw" : "40vw")};
  min-width: 300px;
  height: 100vh;
  background-color: ${colors.black};
  box-shadow: -2px 0 16px rgba(0, 0, 0, 0.15);
  z-index: 1201;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateX(0);
    `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1200;
  transition: opacity 0.3s;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
`;

const SideNavContent = styled.div`
  padding: 20px 20px 0px 20px;
  color: ${colors.white};
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
`;

const MenuTitle = styled.h2`
  font-size: 1.75rem;
  padding-bottom: 10px;
  color: ${colors.red};
  /* ${(props) =>
    props.$isMobile && {
      borderBottom: `1px solid ${colors.charcoal}`,
    }} */
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  gap: 10px;
  p {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: ${colors.red};
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const LargeText = styled.h1`
  font-size: 70px;
  line-height: 1;
  margin: 0;
  text-align: justify;
  font-weight: bold;
  color: ${colors.charcoal};
  text-transform: uppercase;
`;

const AccordionContainer = styled.div`
  width: 100%;
`;

const StyledAccordion = styled(Accordion)`
  /* border: none; */
  box-shadow: none !important;
  margin-bottom: 12px;
  background: none !important;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  border: none;
  max-height: 50px;
  border-bottom: 1px solid ${colors.charcoal};

  div {
    display: flex;
    align-items: center;
    /* gap: 20px; */
  }

  h2 {
    color: ${colors.red};
    font-size: 2rem;
    /* border-bottom: 1px solid ${colors.charcoal}; */
    span {
      color: ${colors.red};
      font-size: 2.5rem;
    }
  }

  p {
    font-weight: 300;
    font-size: 16px;
    color: ${colors.textGrey};
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  font-size: 18px;
  color: ${colors.white};
  && {
    padding: 0px 16px;
    p {
      padding-bottom: 5px;
    }
  }
`;
