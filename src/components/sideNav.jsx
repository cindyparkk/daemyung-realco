import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import colors from "../constants/colors";
import menu_KO from "../constants/routes";

const SideNav = ({ isOpen, onClose, children }) => {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Wait for the next tick to enable click-away detection
      const timer = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(timer);
    } else {
      setReady(false);
    }
  }, [isOpen]);

  const handleMenuClick = (path) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      <Backdrop $isOpen={isOpen} />
      {/* <ClickAwayListener onClickAway={onClose}> */}
      <SidebarWrapper $isOpen={isOpen} role="navigation">
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
            {menu_KO.map((item) => (
              <div key={item.key}>
                <MenuTitle>{item.label}</MenuTitle>
                <MenuItems>
                  {item.submenu.map((sub, idx) => (
                    <div key={idx}>
                      <p
                        style={{ margin: "5px 0" }}
                        onClick={() => handleMenuClick(sub.path)}
                      >
                        {sub.label}{" "}
                      </p>
                      {idx !== item.submenu.length - 1 && <span>|</span>}
                    </div>
                  ))}
                </MenuItems>
              </div>
            ))}
          </div>
          <LargeText>Daemyung</LargeText>
        </SideNavContent>
      </SidebarWrapper>
      {/* </ClickAwayListener> */}
    </>
  );
};

export default SideNav;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40vw;
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

const MenuTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${colors.red};
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
