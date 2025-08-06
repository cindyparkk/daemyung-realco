import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import { Button } from "@mui/material";

const CustomButton = (props) => {
  const { text, onClick, color, success } = props;
  return (
    <StyledButton
      variant="contained"
      onClick={onClick}
      {...props}
      color={color}
      $success={success}
    >
      {text || "Button"}
    </StyledButton>
  );
};

export default CustomButton;

const StyledButton = styled(Button)`
  && {
    background-color: ${(props) => (props.color ? props.color : colors.red)};
    color: ${colors.white};
    &:hover {
      background-color: ${colors.darkRed};
      ${(props) =>
        props.color && {
          backgroundColor: colors.darkGreen,
        }}
      cursor: pointer;
    }
    padding: 8px 25px;
    font-size: 14px;
    text-transform: uppercase;
    border-radius: 5px;
    box-shadow: none;
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;
    &:active {
      box-shadow: none;
      background-color: ${colors.charcoal};
    }
    &:focus {
      outline: none;
      box-shadow: none;
    }
    /* @media (max-width: 600px) {
    width: 100%;
    font-size: 14px;
    padding: 8px 16px;
  }
  @media (min-width: 601px) and (max-width: 960px) {
    width: 80%;
    font-size: 15px;
    padding: 9px 18px;
  }
  @media (min-width: 961px) {
    width: auto;
    font-size: 16px;
    padding: 10px 20px;
  } */
  }
`;
