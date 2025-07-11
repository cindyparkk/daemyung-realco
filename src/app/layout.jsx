"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../components/header";
import Footer from "../components/footer";
import PageLoader from "../components/pageLoader";

const MainWrapper = styled.main`
  background: #fff;
  padding-top: 64px; /* Height of your fixed header */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function RootLayout({ children }) {
  // Loader is always visible on first render (both SSR and client)
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Remove loader after hydration (or after your loading logic)
    const timer = setTimeout(() => setShowLoader(false), 1200); // adjust as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="/assets/logo-dark.svg"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="icon"
            href="/assets/logo-light.svg"
            media="(prefers-color-scheme: dark)"
          />
          <title>대명리얼코</title>
        </head>
        <body>
          <PageLoader show={showLoader} />
          <div
            style={{ opacity: showLoader ? 0 : 1, transition: "opacity 0.2s" }}
          >
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
}
