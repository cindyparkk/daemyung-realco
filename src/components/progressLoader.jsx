import { CircularProgress, Backdrop } from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import colors from "../constants/colors";
import CustomButton from "./button";
import useClientMediaQuery from "../hooks/useClientMediaQuery";

const StyledBackdrop = styled(Backdrop)`
  z-index: 1301 !important; /* higher than modal for blocking everything */
  color: #fff;
  && {
    background-color: rgba(0, 0, 0, 0.6); /* Dim background */
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    h2 {
      margin-top: 2rem;
    }
  }
`;

const SuccessContainer = styled.div`
  width: 25vw;
  padding: 30px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${colors.black};
  background-color: ${colors.white};
  border-radius: 10px;
  text-align: center;
  gap: 20px;
  h5 {
    font-size: 1.2rem;
  }

  ${(props) =>
    props.$isMobile && {
      width: "75vw",
    }}
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  padding: 10px;
  background-color: ${colors.lightGreen};
  width: 60px;
  height: 60px;
`;

export default function ProgressLoader({
  open = false,
  text,
  submitted,
  submitting,
  buttonOnClick,
}) {
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <StyledBackdrop open={open}>
      {submitted ? (
        <SuccessContainer $isMobile={isMobile}>
          <ImageWrapper>
            <Image
              src={"/assets/icons/check-icon.svg"}
              width={40}
              height={40}
              alt={"Success Icon"}
            />
          </ImageWrapper>
          <h5>
            문의가 성공적으로
            <br />
            접수되었습니다!
          </h5>
          <CustomButton
            text={"돌아가기"}
            color={colors.green}
            onClick={() => buttonOnClick()}
          />
        </SuccessContainer>
      ) : (
        <CircularProgress color={colors.white} size={70} thickness={4} />
      )}
      {submitting && <h2>{text}...</h2>}
    </StyledBackdrop>
  );
}
