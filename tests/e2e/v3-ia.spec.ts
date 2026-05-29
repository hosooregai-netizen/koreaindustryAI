import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBe(false);
}

async function expectHomeHeroFillsInitialViewport(page: import("@playwright/test").Page) {
  const metrics = await page.evaluate(() => {
    window.scrollTo(0, 0);
    const hero = document.querySelector(".v3-hero");
    const nextSection = document.querySelector(".v3-trust-strip");

    if (!hero || !nextSection) {
      throw new Error("Could not find v3 home hero or following section");
    }

    const heroRect = hero.getBoundingClientRect();
    const nextRect = nextSection.getBoundingClientRect();

    return {
      heroTop: heroRect.top,
      heroBottom: heroRect.bottom,
      nextTop: nextRect.top,
      viewportHeight: window.innerHeight,
    };
  });

  expect(metrics.heroTop).toBeGreaterThanOrEqual(-1);
  expect(metrics.heroTop).toBeLessThanOrEqual(1);
  expect(metrics.heroBottom).toBeGreaterThanOrEqual(metrics.viewportHeight - 1);
  expect(metrics.nextTop).toBeGreaterThanOrEqual(metrics.viewportHeight - 1);
}

async function getTopbarMetrics(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".v3-header");
    const brand = document.querySelector<HTMLElement>(".v3-brand");
    const brandMark = document.querySelector<HTMLElement>(".v3-brand-mark");
    const menuButton = document.querySelector<HTMLElement>(".v3-menu-button");
    const navControls = [...document.querySelectorAll<HTMLElement>(".v3-nav-group > a, .v3-nav-group > button")];

    if (!header || !brand || !brandMark || !menuButton) {
      throw new Error("Could not find v3 topbar elements");
    }

    const rect = (element: HTMLElement) => {
      const box = element.getBoundingClientRect();
      return {
        top: Math.round(box.top * 100) / 100,
        left: Math.round(box.left * 100) / 100,
        width: Math.round(box.width * 100) / 100,
        height: Math.round(box.height * 100) / 100,
      };
    };

    return {
      className: header.className,
      color: getComputedStyle(header).color,
      background: getComputedStyle(header).backgroundColor,
      brandColor: getComputedStyle(brand).color,
      brandMarkBackground: getComputedStyle(brandMark).backgroundColor,
      header: rect(header),
      brand: rect(brand),
      menuButton: rect(menuButton),
      navControls: navControls.map((element) => ({
        text: element.textContent?.trim(),
        rect: rect(element),
        fontSize: getComputedStyle(element).fontSize,
        minHeight: getComputedStyle(element).minHeight,
      })),
    };
  });
}

async function expectTopbarChangesBackgroundWithoutResizing(page: import("@playwright/test").Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  const top = await getTopbarMetrics(page);

  await page.evaluate(() => window.scrollTo(0, 180));
  await page.waitForTimeout(100);
  const scrolled = await getTopbarMetrics(page);

  expect(top.className).toContain("is-transparent");
  expect(scrolled.className).toContain("is-scrolled");
  expect(top.background).not.toEqual(scrolled.background);
  expect(top.brandColor).not.toEqual(scrolled.brandColor);
  expect(top.brandMarkBackground).not.toEqual(scrolled.brandMarkBackground);
  expect(scrolled.header).toEqual(top.header);
  expect(scrolled.brand).toEqual(top.brand);
  expect(scrolled.menuButton).toEqual(top.menuButton);
  expect(scrolled.navControls).toEqual(top.navControls);
}

test("home hero fills the initial viewport on desktop and mobile", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/v3");
    await expectHomeHeroFillsInitialViewport(page);
  }
});

test("topbar becomes white on scroll without resizing", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/v3");
    await expectTopbarChangesBackgroundWithoutResizing(page);
  }
});

test("desktop Product navigation exposes AI Core and routes correctly", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  await expect(page.getByRole("heading", { name: /업무 흐름을 읽고/ })).toBeVisible();
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-state", /image-fallback|loaded/);
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "0");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "0");
  const activeHeroVideo = page.locator(".v3-hero-video.is-active");
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-intro\.mp4$/);
  await expect(activeHeroVideo).toHaveJSProperty("loop", false);
  await activeHeroVideo.dispatchEvent("ended");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "1");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "0");
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-process\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await activeHeroVideo.dispatchEvent("ended");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "2");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "0");
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-automation\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await activeHeroVideo.dispatchEvent("ended");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "3");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "1");
  await expect(page.getByRole("heading", { name: /작은 자동화가 운영 시스템으로 확장됩니다/ })).toBeVisible();
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await activeHeroVideo.dispatchEvent("ended");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "0");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "0");
  await expect(page.getByRole("heading", { name: /업무 흐름을 읽고/ })).toBeVisible();
  await expect(page.locator(".v3-client-logo img")).toHaveCount(10);
  await expect(page.locator('.v3-client-logo img[alt="한국종합안전(주)"]')).toHaveCount(1);
  await expect(page.locator('.v3-client-logo img[alt="INSIDERS"]')).toHaveCount(1);

  const mainNav = page.getByLabel("주요 메뉴");
  const productGroup = mainNav.locator(".v3-nav-group").filter({ hasText: "Product" }).first();
  await mainNav.getByRole("button", { name: "Product" }).focus();
  await expect(productGroup.locator(".v3-dropdown")).toBeHidden();

  await mainNav.getByRole("button", { name: "Product" }).hover();
  await expect(productGroup.locator(".v3-dropdown-media img")).toBeVisible();
  await expect(productGroup.locator(".v3-dropdown-summary")).toContainText("AI-Core와 MVP");

  const triggerBox = await mainNav.getByRole("button", { name: "Product" }).boundingBox();
  const dropdownBox = await productGroup.locator(".v3-dropdown").boundingBox();
  if (!triggerBox || !dropdownBox) throw new Error("Could not measure Product trigger or dropdown");
  await page.mouse.move(triggerBox.x + triggerBox.width / 2, (triggerBox.y + triggerBox.height + dropdownBox.y) / 2);
  await expect(productGroup.locator(".v3-dropdown-media img")).toBeVisible();
  await page.mouse.move(dropdownBox.x + dropdownBox.width - 80, dropdownBox.y + 48);
  await expect(mainNav.getByRole("menuitem", { name: /AI Core/ })).toBeVisible();

  await expect(mainNav.getByRole("menuitem", { name: /AI Core/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /^MVP/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /AI Apps/ })).toHaveCount(0);
  await expect(mainNav.getByRole("menuitem", { name: /Tools/ })).toHaveCount(0);

  await mainNav.getByRole("menuitem", { name: /AI Core/ }).click();
  await expect(page).toHaveURL(/\/v3\/products\/ai-core$/);
  await expect(page.getByRole("heading", { name: /모듈을 조립해 고객 맞춤/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("Product MVP item routes to the coming soon page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  const mainNav = page.getByLabel("주요 메뉴");
  await mainNav.getByRole("button", { name: "Product" }).hover();
  await mainNav.getByRole("menuitem", { name: /^MVP/ }).click();

  await expect(page).toHaveURL(/\/v3\/mvp$/);
  await expect(page.getByRole("heading", { name: /MVP 시작 패키지는 준비 중입니다/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("mobile menu exposes AI Core and routes without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/v3");

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  const mainNav = page.getByLabel("주요 메뉴");
  const aiCoreMenuItem = mainNav.getByRole("menuitem", { name: /^AI Core\b/ });
  await expect(aiCoreMenuItem).toBeVisible();
  await aiCoreMenuItem.click();

  await expect(page).toHaveURL(/\/v3\/products\/ai-core$/);
  await expect(page.getByRole("heading", { name: /AI-Core는 핵심 업무/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("home shows industry wordmarks and cross-industry tool CTA", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  for (const wordmark of ["제조 운영팀", "금융 심사팀", "건설 안전팀", "물류 운영팀"]) {
    await expect(page.getByText(wordmark).first()).toBeVisible();
  }

  await expect(page.getByRole("heading", { name: /범 산업 툴은 무료 공개 기능이 아니라/ })).toBeVisible();
  await expect(page.getByText("전자서명 / TBM 서명")).toBeVisible();
  await expect(page.getByRole("heading", { name: "사진대지" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("Resources and Industries route to coming soon pages", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  const mainNav = page.getByLabel("주요 메뉴");
  await mainNav.getByRole("button", { name: "Resources" }).hover();
  await expect(mainNav.getByRole("menuitem", { name: /News Letter/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /Blog/ })).toBeVisible();
  await mainNav.getByRole("menuitem", { name: /Technology/ }).click();
  await expect(page).toHaveURL(/\/v3\/community\/technology$/);
  await expect(page.getByRole("heading", { name: /기술 콘텐츠 페이지는 준비 중입니다/ })).toBeVisible();

  await page.goto("/v3");
  await mainNav.getByRole("button", { name: "Industries" }).hover();
  await mainNav.getByRole("menuitem", { name: /건설/ }).click();
  await expect(page).toHaveURL(/\/v3\/industries\/construction$/);
  await expect(page.getByRole("heading", { name: /건설 산업 페이지는 준비 중입니다/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("desktop contact CTA routes to contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/v3");

  await page.getByLabel("주요 메뉴").getByRole("link", { name: "문의하기" }).click();
  await expect(page).toHaveURL(/\/v3\/contact$/);
  await expect(page.getByRole("heading", { name: /자동화하고 싶은 업무/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("newsletter route is a coming soon page", async ({ page }) => {
  await page.goto("/v3/community/newsletter");
  await expect(page.getByRole("heading", { name: /뉴스레터 페이지는 준비 중입니다/ })).toBeVisible();
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
