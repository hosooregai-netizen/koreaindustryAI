import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "대한산업AI | 기업 자동화 솔루션",
  description:
    "대한산업AI는 ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 기업의 반복 업무를 자동화하는 법인 자동화 솔루션 파트너입니다.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script id="site-scroll-restoration" strategy="beforeInteractive">
          {`if ("scrollRestoration" in history) history.scrollRestoration = "manual";`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
