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
