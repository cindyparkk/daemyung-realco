"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";

import Header from "../components/header";
import Footer from "../components/footer";
import PageLoader from "../components/pageLoader";
import { useLoading } from "../context/LoadingContext";

import colors from "../constants/colors";

const MainWrapper = styled.main`
  background: ${colors.white};
  padding-top: 70px; /* Height of your fixed header */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ClientLoaderWrapper({ children }) {
  const { loading, setLoading } = useLoading();
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // for fade animation

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true); // Show loader initially
    const timer = setTimeout(() => setLoading(false), 800); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  // Show loader when loading = true
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300); // matches fade out duration
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Detect path change → hide loader
  useEffect(() => {
    if (hasMounted) {
      setLoading(false); // ✅ stop loading after route change
    }
  }, [pathname]);

  if (!hasMounted) return null;

  return (
    <>
      <PageLoader show={showLoader} fadingOut={!loading} />
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.2s" }}>
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </div>
    </>
  );
}
