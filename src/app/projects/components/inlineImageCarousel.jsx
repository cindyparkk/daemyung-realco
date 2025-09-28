import { useState, useRef } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import colors from "../../../constants/colors";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const InlineImageCarousel = ({ images, onImageClick }) => {
  const scrollRef = useRef(null);

  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const isTablet = useClientMediaQuery("(max-width: 900px)");

  // how many images to show depending on screen width
  const visibleCount = isMobile ? 1 : isTablet ? 2 : 3;

  // calculate current index from scroll position
  const getCurrentIndex = () => {
    if (!scrollRef.current) return 0;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.clientWidth / visibleCount;
    return Math.round(scrollLeft / itemWidth);
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth / visibleCount;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const goPrev = () => {
    const currentIndex = getCurrentIndex();
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(newIndex);
  };

  const goNext = () => {
    const currentIndex = getCurrentIndex();
    const newIndex = Math.min(currentIndex + 1, images.length - visibleCount);
    scrollToIndex(newIndex);
  };

  return (
    <CarouselWrapper>
      <ArrowButton onClick={goPrev}>
        <KeyboardArrowLeftIcon
          sx={{ color: colors.white, fontSize: isMobile ? "1.5rem" : "2rem" }}
        />
      </ArrowButton>

      <ImagesRow ref={scrollRef} $visibleCount={visibleCount}>
        {images.map((img, idx) => (
          <SquareThumb
            key={idx}
            src={img.url}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => onImageClick(idx)}
          />
        ))}
      </ImagesRow>

      <ArrowButton onClick={goNext}>
        <KeyboardArrowRightIcon
          sx={{ color: colors.white, fontSize: isMobile ? "1.5rem" : "2rem" }}
        />
      </ArrowButton>
    </CarouselWrapper>
  );
};

export default InlineImageCarousel;

// ---------------- styled ----------------

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

const ImagesRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% / ${(props) => props.$visibleCount});
  gap: 12px;
  flex: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* hide scrollbar in Firefox */
  -ms-overflow-style: none; /* hide scrollbar in IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* hide scrollbar in Chrome/Safari */
  }
`;

const SquareThumb = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  z-index: 10;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ArrowButton = styled(IconButton)`
  && {
    &:disabled {
      opacity: 0.3;
    }
  }
`;
