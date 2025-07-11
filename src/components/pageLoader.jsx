import React from "react";
import styled from "styled-components";
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
`;

export default function PageLoader({ show }) {
  // const [hasMounted, setHasMounted] = useState(false);

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // // Prevent rendering on the server
  // if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <LoaderWrapper
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          transition={{ duration: 0.5 }}
        >
          <img src="/assets/logo-light.svg" alt="Logo" width={96} height={96} />
        </LoaderWrapper>
      )}
    </AnimatePresence>
  );
}
