"use client";
import "./globals.css";
import { useEffect, useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import PageLoader from "../components/pageLoader";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading; replace with real logic if needed
    const handle = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(handle);
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
          <PageLoader show={loading} />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
