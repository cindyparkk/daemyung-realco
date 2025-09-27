import { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import colors from "../../../constants/colors";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const InlineImageCarousel = ({ images, onImageClick }) => {
  const [startIndex, setStartIndex] = useState(0);

  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const isTablet = useClientMediaQuery("(max-width: 900px)");

  // how many images to show depending on screen width
  const visibleCount = isMobile ? 1 : isTablet ? 2 : 3;

  const goPrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, images.length - visibleCount));
  };

  return (
    <CarouselWrapper>
      <ArrowButton onClick={goPrev} disabled={startIndex === 0}>
        <KeyboardArrowLeftIcon
          sx={{ color: colors.white, fontSize: isMobile ? "1.5rem" : "2rem" }}
        />
      </ArrowButton>

      <ImagesRow $visibleCount={visibleCount}>
        {images.slice(startIndex, startIndex + visibleCount).map((img, idx) => (
          <SquareThumb
            key={startIndex + idx}
            src={img.url}
            alt={`Thumbnail ${startIndex + idx + 1}`}
            onClick={() => onImageClick(startIndex + idx)}
          />
        ))}
      </ImagesRow>

      <ArrowButton
        onClick={goNext}
        disabled={startIndex >= images.length - visibleCount}
      >
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
  grid-template-columns: repeat(${(props) => props.$visibleCount}, 1fr);
  gap: 12px;
  flex: 1;
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
    /* background: ${colors.lightGrey}; */
    &:disabled {
      opacity: 0.3;
    }
  }
`;
