import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://industry.ai.kr"),
  title: "대한산업 AI",
  description:
    "대한산업AI는 ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 기업의 반복 업무를 자동화하는 법인 자동화 솔루션 파트너입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "대한산업 AI",
    description:
      "대한산업AI는 ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 기업의 반복 업무를 자동화하는 법인 자동화 솔루션 파트너입니다.",
    url: "/",
    siteName: "대한산업 AI",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png?v=20260607-hero",
        width: 1200,
        height: 630,
        alt: "대한산업 AI 메인 히어로 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "대한산업 AI",
    description:
      "대한산업AI는 ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 기업의 반복 업무를 자동화하는 법인 자동화 솔루션 파트너입니다.",
    images: ["/og-image.png?v=20260607-hero"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260606-logo", sizes: "any" },
      { url: "/favicon.png?v=20260606-logo", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico?v=20260606-logo" }],
    apple: [{ url: "/favicon.png?v=20260606-logo", type: "image/png", sizes: "512x512" }],
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
