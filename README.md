# KoreaIndustry AI Landing

대한산업AI 기본 랜딩 사이트입니다. 버전 라우트 없이 현재 사이트를 `/`에서 제공합니다.

## Run

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 확인합니다.

## Environment

문의 폼 Slack 알림에는 서버 환경 변수가 필요합니다.

```bash
SLACK_WEBHOOK_URL=
```

로컬은 `.env.local`, Vercel은 Project Settings의 Environment Variables에 같은 이름으로 등록합니다.

## Structure

- `app/page.tsx`: 메인 페이지
- `app/api/contact/route.ts`: 문의 폼 Slack 전송 API
- `app/products`, `app/industries`, `app/community`, `app/company`, `app/contact`: 버전 없는 하위 라우트
- `components/site.tsx`: 공통 사이트 컴포넌트
- `app/globals.css`: 사이트 스타일
- `public/assets`: 이미지, 영상, 로고 asset
- `docs`: 사이트 기획/UI/페이지 상세 문서
