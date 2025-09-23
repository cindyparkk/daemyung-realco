"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import useTransitionRouter from "../hooks/useTransitionRouter";
import useClientMediaQuery from "../hooks/useClientMediaQuery";

import colors from "../constants/colors";
import menu_KO from "../constants/routes";

import SideNav from "./sideNav";

const Header = () => {
  const pathname = usePathname();
  const [lang, setLang] = useState("ko");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { push } = useTransitionRouter();

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === "ko" ? "en" : "ko"));
  };
  const handleLangClick = () => {
    toggleLang();
  };

  const handleLogoClick = async () => {
    setSelectedMenu(null);
    await push("/");
    setIsExpanded(false);
  };

  const handleMenuClick = async (pathname) => {
    await push(pathname);
    setIsExpanded(true);
  };

  useEffect(() => {
    // Close the sidebar when the component mounts
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isMenuOpen]);

  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <HeaderContainer>
        <MenuItemWrapper>
          <MainMenuContainer>
            <Image
              src="/assets/logo-dark.svg"
              alt="Logo"
              width={70}
              height={50}
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            />
            <div>
              {!isMobile &&
                menu_KO.map((item) => (
                  <MenuItem
                    key={item.key}
                    $active={selectedMenu === item.key}
                    onMouseEnter={() => {
                      setIsExpanded(true);
                      setSelectedMenu(item.key);
                    }}
                    onClick={() => {
                      handleMenuClick(item.submenu[0].path);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              {/* <LangButton>
                <Language selected={lang === "ko"} onClick={handleLangClick}>
                  ko
                </Language>
                <Language>|</Language>
                <Language selected={lang === "en"} onClick={handleLangClick}>
                  en
                </Language>
              </LangButton> */}
              <Image
                src="/assets/icons/menu-icon.svg"
                alt="Menu-icon"
                width={30}
                height={30}
                style={{
                  cursor: "pointer",
                  marginLeft: "15px",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => {
                  setIsMenuOpen(true);
                }}
              />
            </div>
          </MainMenuContainer>

          {!isMobile &&
            isExpanded &&
            menu_KO.map(
              (item) =>
                selectedMenu === item.key && (
                  <ExpandedMenuContainer
                    key={item.key}
                    style={{ paddingRight: `${item.paddingRight}px` }}
                    onMouseLeave={() => {
                      setIsExpanded(false);
                    }}
                  >
                    {item.submenu.map((sub, idx) => (
                      <SubMenuItem
                        key={idx}
                        $active={pathname === sub.path}
                        onClick={() => handleMenuClick(sub.path)}
                      >
                        <h4>{sub.label}</h4>
                        {idx !== item.submenu.length - 1 && <span>|</span>}
                      </SubMenuItem>
                    ))}
                  </ExpandedMenuContainer>
                )
            )}
        </MenuItemWrapper>
      </HeaderContainer>

      <SideNav
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
    </>
  );
};
export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const MenuItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MainMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: ${colors.white};
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  & > div {
    display: flex;
    align-items: center;
  }
`;

const MenuItem = styled.h3`
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  margin-left: 20px;
  font-size: 14px;

  color: ${(props) => (props.$active ? colors.red : colors.black)};

  &:hover {
    cursor: pointer;
    color: ${colors.red};
  }
`;

const Language = styled.h3`
  text-transform: uppercase;
  cursor: pointer;
  color: ${colors.black};
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  font-size: 14px;
`;

const LangButton = styled.button`
  background-color: ${colors.white};
  border: 2px solid ${colors.black};
  padding: 3px 10px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  margin: 0px 20px;
`;

const ExpandedMenuContainer = styled.div`
  background-color: ${colors.charcoal};
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* color: ${colors.white}; */
  position: absolute;
  left: 0;
  width: 100%;
  top: 100%;
`;

const SubMenuItem = styled.div`
  display: flex;
  align-items: center;
  h4 {
    cursor: pointer;
    color: ${(props) => (props.$active ? colors.lightRed : colors.white)};
    &:hover {
      color: ${colors.lightRed};
    }
  }

  span {
    margin: 0 10px;
    color: ${colors.white};
  }
`;
