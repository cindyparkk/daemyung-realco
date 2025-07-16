import { useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";

import colors from "../constants/colors";
import Image from "next/image";
import CustomButton from "./button";

const CarouselItems = [
  {
    title: "분양대행",
    icon: "/assets/icons/real_estate-icon.svg",
    description:
      "차별화 된 마케팅 노하우와 체계적인 운영시스템을 제공하여 클라이언트가 만족할 수있는 최적의 맞춤형 분양 솔루션을 제공합니다.",
    index: 1,
    hoveredIcon: "/assets/icons/real_estate-icon-white.svg",
    backgroundImage: "/assets/images/carousel-1.jpg",
    path: "/services/real-estate",
  },
  {
    title: "F&B",
    icon: "/assets/icons/f&b-icon.svg",
    description:
      "체계적인 운영 시스템을 바탕으로 식문화의 트렌드를 주도하며, 고객과 파트너사의 성공을 함께 만들어갑니다.",
    index: 2,
    hoveredIcon: "/assets/icons/f&b-icon-white.svg",
    backgroundImage: "/assets/images/carousel-2.jpg",
    path: "/services/f&b",
  },
  {
    title: "엔터테인먼트",
    icon: "/assets/icons/entertainment-icon.svg",
    description:
      "투자자와 임차인 모두에게 안정성과 수익성을 갖춘 성공적인 상업 부동산 솔루션을 제공합니다.",
    index: 3,
    hoveredIcon: "/assets/icons/entertainment-icon-white.svg",
    backgroundImage: "/assets/images/carousel-3.jpg",
    path: "/services/entertainment",
  },
];

const Carousel = ({ isButton, isHoverAnimation }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const router = useRouter();

  return (
    <CarouselContainer>
      {CarouselItems.map((item, idx) => {
        const isHovered = isHoverAnimation ? hoveredIdx === item.index : true;

        return (
          <CarouselItem
            key={idx}
            $hovered={hoveredIdx !== null}
            $active={isHovered}
            onMouseEnter={() => setHoveredIdx(item.index)}
            onMouseLeave={() => setHoveredIdx(null)}
            $bg={item.backgroundImage}
          >
            <Overlay $show={isHovered} />
            <Content>
              <Image
                src={isHovered ? item.hoveredIcon : item.icon}
                alt="Logo"
                width={70}
                height={50}
              />
              <CarouselItemTitle>{item.title}</CarouselItemTitle>
              {isHovered && (
                <>
                  <CarouselItemText>{item.description}</CarouselItemText>
                  {isButton && (
                    <CustomButton
                      text={"learn more"}
                      onClick={() => router.push(item.path)}
                    />
                  )}
                </>
              )}
            </Content>
          </CarouselItem>
        );
      })}
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 10px;
  padding: 20px;
`;

// Overlay that appears on hover
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s;
  pointer-events: none;
`;

const CarouselItem = styled.div`
  min-width: 300px;
  height: 450px;
  background-color: ${colors.lightGrey};
  border-radius: 10px;
  scroll-snap-align: start;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 24px;
  flex: 1 1 0;
  padding: 30px 20px;
  position: relative;
  color: ${({ $active }) => ($active ? colors.white : colors.black)};
  /* transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1); */
  /* transition:
    flex 0.5s ease-in-out,
    background-color 0.3s ease-in-out; */

  background: ${({ $active, $bg }) =>
    $active && $bg
      ? `url(${$bg}) center center / cover no-repeat`
      : colors.lightGrey};

  ${({ $hovered, $active }) =>
    $hovered
      ? $active
        ? css`
            flex: 3 1 0;
          `
        : css`
            flex: 1 1 0.0001;
          `
      : css`
          flex: 1 1 0;
        `}
`;

const Content = styled.div`
  z-index: 2;
`;

const CarouselItemTitle = styled.h1`
  font-size: 30px;
  margin: 10px 0;
`;

const CarouselItemText = styled.p`
  font-size: 14px;
  width: 90%;
  margin-bottom: 20px;
`;
