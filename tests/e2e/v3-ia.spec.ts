import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBe(false);
}

test("desktop navigation exposes only AI-Core in Products and routes correctly", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  await expect(page.getByRole("heading", { name: /산업별 업무 시스템/ })).toBeVisible();
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-state", "image-fallback");

  const mainNav = page.getByLabel("주요 메뉴");
  await mainNav.getByRole("link", { name: "Products" }).hover();
  await expect(mainNav.getByRole("menuitem", { name: /AI-Core/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /AI Apps/ })).toHaveCount(0);
  await expect(mainNav.getByRole("menuitem", { name: /Tools/ })).toHaveCount(0);

  await mainNav.getByRole("menuitem", { name: /AI-Core/ }).click();
  await expect(page).toHaveURL(/\/v3\/products\/ai-core$/);
  await expect(page.getByRole("heading", { name: /모듈을 조립해 고객 맞춤/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("mobile menu exposes AI-Core and routes without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/v3");

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  const mainNav = page.getByLabel("주요 메뉴");
  const aiCoreMenuItem = mainNav.getByRole("menuitem", { name: /^AI-Core\b/ });
  await expect(aiCoreMenuItem).toBeVisible();
  await aiCoreMenuItem.click();

  await expect(page).toHaveURL(/\/v3\/products\/ai-core$/);
  await expect(page.getByRole("heading", { name: /AI-Core는 핵심 업무/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("home shows industry wordmarks and cross-industry tool CTA", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  for (const wordmark of ["볼넛", "K-Finance", "한국종합안전 ANC", "마켓컬리"]) {
    await expect(page.getByText(wordmark).first()).toBeVisible();
  }

  await expect(page.getByRole("heading", { name: /범 산업 툴은 무료 공개 기능이 아니라/ })).toBeVisible();
  await expect(page.getByText("전자서명 / TBM 서명")).toBeVisible();
  await expect(page.getByRole("heading", { name: "사진대지" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("start and YouTube actions open and close coming soon modals", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  await page.getByRole("button", { name: "시작하기" }).click();
  await expect(page.getByRole("dialog")).toContainText("MVP 시작하기 페이지를 준비하고 있어요");
  await page.getByRole("button", { name: "모달 닫기" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  const mainNav = page.getByLabel("주요 메뉴");
  await mainNav.getByRole("button", { name: "Community" }).hover();
  await mainNav.getByRole("menuitem", { name: /YouTube/ }).click();
  await expect(page.getByRole("dialog")).toContainText("YouTube 콘텐츠를 준비하고 있어요");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("newsletter form shows a success state", async ({ page }) => {
  await page.goto("/v3/community/newsletter");
  await page.getByLabel("이메일").fill("hello@example.com");
  await page.getByLabel("관심 주제").selectOption("AI-Core");
  await page.getByRole("button", { name: /연락받기/ }).click();
  await expect(page.getByText("뉴스레터 신청이 접수되었습니다.")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("contact form shows a success state", async ({ page }) => {
  await page.goto("/v3/contact");
  await page.getByLabel("회사명").fill("대한테스트");
  await page.getByLabel("담당자명").fill("테스터");
  await page.getByLabel("연락처").fill("test@example.com");
  await page.getByLabel("관심 영역").selectOption("AI-Core");
  await page.getByRole("button", { name: /문의 접수하기/ }).click();
  await expect(page.getByText("문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
