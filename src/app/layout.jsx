"use client";
import "./globals.css";

import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout({ children }) {
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
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
