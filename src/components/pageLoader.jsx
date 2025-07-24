import React from "react";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoaderWrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $show, $fadingOut }) =>
    !$show
      ? css`
          display: none;
        `
      : css`
          opacity: ${$fadingOut ? 0 : 1};
          pointer-events: none;
        `}
`;

export default function PageLoader({ show, fadingOut }) {
  return (
    <AnimatePresence>
      {show && (
        <LoaderWrapper
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          transition={{ duration: 0.5 }}
          $show={show}
          $fadingOut={fadingOut}
        >
          <img src="/assets/logo-light.svg" alt="Logo" width={96} height={96} />
        </LoaderWrapper>
      )}
    </AnimatePresence>
  );
}
