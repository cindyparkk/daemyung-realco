"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../components/header";
import Footer from "../components/footer";
import PageLoader from "../components/pageLoader";

import colors from "../constants/colors";

const MainWrapper = styled.main`
  background: ${colors.white};
  padding-top: 64px; /* Height of your fixed header */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ClientLoaderWrapper({ children }) {
  // Loader is always visible on first render (both SSR and client)
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Remove loader after hydration
    const timer = setTimeout(() => setShowLoader(false), 1200); // adjust as needed
    return () => clearTimeout(timer);
  }, []);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Prevent rendering on the server
  if (!hasMounted) return null;

  return (
    <>
      <PageLoader show={showLoader} />
      <div style={{ opacity: showLoader ? 0 : 1, transition: "opacity 0.2s" }}>
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </div>
    </>
  );
}
