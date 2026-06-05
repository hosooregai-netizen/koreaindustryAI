import { NextResponse } from "next/server";

type ContactSubmission = {
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  adoptionStage: string;
  interest: string;
  message: string;
};

const requiredFields = ["name", "company", "email", "phone", "interest", "message"] as const;
const maxRequestBodyBytes = 12_000;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 5;

const fieldLabels: Record<keyof ContactSubmission, string> = {
  name: "성함",
  company: "회사명",
  email: "이메일",
  phone: "휴대폰번호",
  source: "유입 경로",
  adoptionStage: "도입 검토 상황",
  interest: "관심 솔루션",
  message: "문의내용",
};

const maxFieldLengths: Record<keyof ContactSubmission, number> = {
  name: 80,
  company: 120,
  email: 160,
  phone: 40,
  source: 80,
  adoptionStage: 80,
  interest: 80,
  message: 1800,
};

const submissionBuckets = new Map<string, { count: number; resetAt: number }>();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readField = (payload: Record<string, unknown>, key: string) => {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
};

const escapeSlackText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (clientIp: string) => {
  const now = Date.now();
  const currentBucket = submissionBuckets.get(clientIp);

  if (!currentBucket || currentBucket.resetAt <= now) {
    submissionBuckets.set(clientIp, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  currentBucket.count += 1;
  return currentBucket.count > maxSubmissionsPerWindow;
};

const buildSlackMessage = (submission: ContactSubmission) => {
  const field = (key: keyof ContactSubmission) => ({
    type: "mrkdwn",
    text: `*${fieldLabels[key]}*\n${escapeSlackText(submission[key] || "-")}`,
  });

  return {
    text: `새 문의가 접수되었습니다: ${submission.company} / ${submission.name}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "새 문의가 접수되었습니다",
        },
      },
      {
        type: "section",
        fields: [field("company"), field("name"), field("email"), field("phone"), field("interest"), field("source")],
      },
      {
        type: "section",
        fields: [field("adoptionStage")],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*문의내용*\n${escapeSlackText(submission.message)}`,
        },
      },
    ],
  };
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (Number.isFinite(contentLength) && contentLength > maxRequestBodyBytes) {
    return NextResponse.json({ message: "문의 내용이 너무 깁니다. 핵심 내용만 줄여서 보내주세요." }, { status: 413 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "문의 내용을 다시 확인해주세요." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "문의 내용을 다시 확인해주세요." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const honeypotValue = readField(payload, "website");

  if (honeypotValue) {
    return NextResponse.json({ ok: true });
  }

  const submission: ContactSubmission = {
    name: readField(payload, "name"),
    company: readField(payload, "company"),
    email: readField(payload, "email"),
    phone: readField(payload, "phone"),
    source: readField(payload, "source"),
    adoptionStage: readField(payload, "adoptionStage"),
    interest: readField(payload, "interest"),
    message: readField(payload, "message"),
  };

  const missingField = requiredFields.find((key) => !submission[key]);

  if (missingField) {
    return NextResponse.json({ message: `${fieldLabels[missingField]} 항목을 입력해주세요.` }, { status: 400 });
  }

  if (!emailPattern.test(submission.email)) {
    return NextResponse.json({ message: "이메일 주소를 다시 확인해주세요." }, { status: 400 });
  }

  const oversizedField = (Object.keys(maxFieldLengths) as Array<keyof ContactSubmission>).find(
    (key) => submission[key].length > maxFieldLengths[key],
  );

  if (oversizedField) {
    return NextResponse.json(
      { message: `${fieldLabels[oversizedField]} 항목이 너무 깁니다. 조금 줄여서 입력해주세요.` },
      { status: 400 },
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { message: "짧은 시간에 문의가 여러 번 접수되었습니다. 잠시 후 다시 시도해주세요." },
      { status: 429 },
    );
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ message: "문의 접수 설정이 아직 완료되지 않았습니다." }, { status: 500 });
  }

  try {
    const slackResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSlackMessage(submission)),
    });

    if (!slackResponse.ok) {
      console.error("Slack webhook failed", slackResponse.status, await slackResponse.text());
      return NextResponse.json(
        { message: "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Slack webhook request failed", error);
    return NextResponse.json(
      { message: "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
