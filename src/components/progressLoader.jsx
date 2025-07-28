import { CircularProgress, Backdrop } from "@mui/material";
import styled from "styled-components";
import colors from "../constants/colors";

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

export default function ProgressLoader({ open = false, text }) {
  return (
    <StyledBackdrop open={open}>
      <CircularProgress color={colors.white} size={70} thickness={4} />
      <h2>{text}...</h2>
    </StyledBackdrop>
  );
}
