import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal, IconButton } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import colors from "../../../constants/colors";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ImageCarousel = ({ images, open, onClose, startIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, open]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const isMobile = useClientMediaQuery("(max-width: 600px)");
  return (
    <>
      <Modal open={open} onClose={onClose} sx={modalStyle}>
        <ModalContainer>
          <IconButton
            onClick={goPrev}
            sx={{ position: "absolute", left: 0, top: "50%" }}
          >
            <KeyboardArrowLeftIcon
              sx={{ color: colors.white, fontSize: isMobile ? "2rem" : "3rem" }}
            />
          </IconButton>
          <img
            src={images[currentIndex].url}
            alt={`Image ${currentIndex + 1}`}
            style={{ maxHeight: "70vh", maxWidth: "80vw" }}
          />
          <IconButton
            onClick={goNext}
            sx={{ position: "absolute", right: 0, top: "50%" }}
          >
            <KeyboardArrowRightIcon
              sx={{ color: colors.white, fontSize: isMobile ? "2rem" : "3rem" }}
            />
          </IconButton>
          <div>
            {currentIndex + 1} / {images.length}
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ImageCarousel;

const ModalContainer = styled.div``;
