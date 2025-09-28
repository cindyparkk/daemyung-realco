import "./globals.css";
import Script from "next/script";
import ClientLoaderWrapper from "../components/clientLoaderWrapper";

import { LoadingProvider } from "../context/LoadingContext";

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
          <meta property="og:title" content="대명리얼코 - 홈페이지" />
          <meta
            property="og:description"
            content="분양대행·F&B·엔터테인먼트를 아우르는 대명리얼코"
          />
          <meta
            property="og:image"
            content="https://ik.imagekit.io/x6pjpxa9a/website-preview.png?updatedAt=1759039575336"
          />
          <meta
            property="og:url"
            content="https://www.daemyung-realco.co.kr/"
          />
          <title>대명리얼코</title>
        </head>
        <body>
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
            strategy="beforeInteractive"
          />
          <LoadingProvider>
            <ClientLoaderWrapper>{children}</ClientLoaderWrapper>
          </LoadingProvider>
        </body>
      </html>
    </>
  );
}
