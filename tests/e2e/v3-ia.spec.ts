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
  await expect.poll(async () => (await getTopbarMetrics(page)).background).toBe("rgb(255, 255, 255)");
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

async function getTransparentTopbarColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".v3-header");
    const brand = document.querySelector<HTMLElement>(".v3-brand");
    const brandLabel = document.querySelector<HTMLElement>(".v3-brand > span:last-child");
    const brandMark = document.querySelector<HTMLElement>(".v3-brand-mark");
    const brandMarkLine = document.querySelector<HTMLElement>(".v3-brand-mark span");
    const navControls = [...document.querySelectorAll<HTMLElement>(".v3-nav-group > a, .v3-nav-group > button")];
    const cta = document.querySelector<HTMLElement>(".v3-nav .v3-nav-cta");
    const menuButton = document.querySelector<HTMLElement>(".v3-menu-button");

    if (!header || !brand || !brandLabel || !brandMark || !brandMarkLine || navControls.length === 0 || !cta || !menuButton) {
      throw new Error("Could not find v3 topbar color elements");
    }

    return {
      group: document.documentElement.dataset.v3HeroGroup,
      headerGroup: header.dataset.v3HeroGroup,
      headerClass: header.className,
      header: getComputedStyle(header).color,
      brand: getComputedStyle(brand).color,
      brandLabel: getComputedStyle(brandLabel).color,
      brandMark: getComputedStyle(brandMark).color,
      brandMarkBackground: getComputedStyle(brandMark).backgroundColor,
      brandMarkBorder: getComputedStyle(brandMark).borderColor,
      brandMarkLine: getComputedStyle(brandMarkLine).backgroundColor,
      nav: navControls.map((element) => getComputedStyle(element).color),
      cta: getComputedStyle(cta).color,
      ctaBorder: getComputedStyle(cta).borderColor,
      menu: getComputedStyle(menuButton).color,
    };
  });
}

async function getHeroCopyMotion(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const copy = document.querySelector<HTMLElement>(".v3-hero-copy.is-active, .v3-hero-copy");

    if (!copy) {
      throw new Error("Could not find v3 hero copy");
    }

    const rect = copy.getBoundingClientRect();

    return {
      top: Math.round(rect.top * 100) / 100,
      transform: getComputedStyle(copy).transform,
    };
  });
}

async function getHeroCopyColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".v3-hero");
    const copy = document.querySelector<HTMLElement>(".v3-hero-copy.is-active, .v3-hero-copy");
    const heading = copy?.querySelector<HTMLElement>("h1");
    const description = copy?.querySelector<HTMLElement>("p:not(.v3-eyebrow)");
    const primary = document.querySelector<HTMLElement>(".v3-hero .v3-button-primary");
    const progress = document.querySelector<HTMLElement>(".v3-hero-progress");

    if (!hero || !copy || !heading || !description || !primary || !progress) {
      throw new Error("Could not find v3 hero copy color elements");
    }

    return {
      group: hero.dataset.videoGroup,
      copy: getComputedStyle(copy).color,
      heading: getComputedStyle(heading).color,
      description: getComputedStyle(description).color,
      primary: getComputedStyle(primary).color,
      primaryBorder: getComputedStyle(primary).borderColor,
      progress: getComputedStyle(progress).color,
    };
  });
}

async function expectHomeHeroHeadingSingleLine(page: import("@playwright/test").Page) {
  if (await page.locator(".v3-hero.is-group-transitioning").count()) {
    await expect(page.locator(".v3-hero.is-group-transitioning")).toHaveCount(0);
  }

  const metrics = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>(".v3-hero.is-home h1");

    if (!heading) {
      throw new Error("Could not find v3 home hero heading");
    }

    const rect = heading.getBoundingClientRect();
    const style = getComputedStyle(heading);

    return {
      whiteSpace: style.whiteSpace,
      height: Math.round(rect.height * 100) / 100,
      lineHeight: Number.parseFloat(style.lineHeight),
      left: Math.round(rect.left * 100) / 100,
      right: Math.round(rect.right * 100) / 100,
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });

  expect(metrics.whiteSpace).toBe("nowrap");
  expect(metrics.height).toBeLessThanOrEqual(metrics.lineHeight * 1.35);
  expect(metrics.left).toBeGreaterThanOrEqual(-1);
  expect(metrics.right).toBeLessThanOrEqual(metrics.viewportWidth + 1);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function getActiveHeroVideoMotion(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const video = document.querySelector<HTMLElement>(".v3-hero-video.is-active");

    if (!video) {
      throw new Error("Could not find active v3 hero video");
    }

    const rect = video.getBoundingClientRect();

    return {
      height: Math.round(rect.height * 100) / 100,
      top: Math.round(rect.top * 100) / 100,
    };
  });
}

function expectHeroVideoBoxToStayStable(
  actual: Awaited<ReturnType<typeof getActiveHeroVideoMotion>>,
  expected: Awaited<ReturnType<typeof getActiveHeroVideoMotion>>,
) {
  expect(Math.abs(actual.top - expected.top)).toBeLessThanOrEqual(16);
  expect(Math.abs(actual.height - expected.height)).toBeLessThanOrEqual(16);
}

async function getHeroProgressState(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const progress = document.querySelector<HTMLElement>(".v3-hero-progress");
    const track = progress?.querySelector<HTMLElement>("strong");

    if (!progress || !track) {
      throw new Error("Could not find v3 hero progress");
    }

    return {
      labels: [...progress.querySelectorAll("span")].map((element) => element.textContent?.trim()),
      percent: Number.parseFloat(track.style.getPropertyValue("--v3-hero-progress")) || 0,
    };
  });
}

async function getHeroBackgroundImage(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".v3-hero");

    if (!hero) {
      throw new Error("Could not find v3 hero");
    }

    return getComputedStyle(hero).backgroundImage;
  });
}

function topbarColorsMatch(
  colors: Awaited<ReturnType<typeof getTransparentTopbarColors>>,
  group: string,
  expectedColor: string,
) {
  return (
    colors.group === group &&
    colors.headerGroup === group &&
    colors.header === expectedColor &&
    colors.brand === expectedColor &&
    colors.brandLabel === expectedColor &&
    colors.brandMark === expectedColor &&
    colors.brandMarkBackground === expectedColor &&
    colors.brandMarkBorder === expectedColor &&
    colors.brandMarkLine === expectedColor &&
    colors.nav.every((color) => color === expectedColor) &&
    colors.cta === expectedColor &&
    colors.ctaBorder === expectedColor &&
    colors.menu === expectedColor
  );
}

test("home hero fills the initial viewport on desktop and mobile", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/v3");
    await expectHomeHeroFillsInitialViewport(page);
    await expect(page.getByRole("heading", { name: /현장의 데이터로 만드는 AI 시스템/ })).toBeVisible();
    await expectHomeHeroHeadingSingleLine(page);
    await page.locator(".v3-hero-video.is-active").dispatchEvent("ended");
    await expect(page.locator(".v3-hero-copy.is-retiring")).toHaveCount(1);
    expect((await getHeroCopyMotion(page)).transform).not.toBe("none");
    await expect(page.locator(".v3-hero-copy.is-retiring")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /반복 업무를 자동으로 처리하는 AI 시스템/ })).toBeVisible();
    await expectHomeHeroHeadingSingleLine(page);
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

  await expect(page.getByRole("heading", { name: /현장의 데이터로 만드는 AI 시스템/ })).toBeVisible();
  await expectHomeHeroHeadingSingleLine(page);
  const heroActions = page.locator(".v3-hero .v3-hero-actions a");
  await expect(heroActions).toHaveCount(1);
  await expect(heroActions.first()).toHaveText(/AI-Core/);
  await expect(heroActions.first()).toHaveAttribute("href", "/v3/products/ai-core");
  const initialHeroCopyMotion = await getHeroCopyMotion(page);
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-state", /image-fallback|loaded/);
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "0");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "0");
  const activeHeroVideo = page.locator(".v3-hero-video.is-active");
  const initialHeroVideoMotion = await getActiveHeroVideoMotion(page);
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-intro\.mp4$/);
  await expect(activeHeroVideo).toHaveJSProperty("loop", false);
  await expect(activeHeroVideo).toHaveJSProperty("paused", false);
  await expect
    .poll(() => activeHeroVideo.evaluate((video) => (video as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.1);
  await expect(page.locator(".v3-hero")).toHaveClass(/has-video/);
  expect(await getHeroBackgroundImage(page)).not.toContain("hero-video-poster");
  const initialHeroProgress = await getHeroProgressState(page);
  expect(initialHeroProgress.labels).toEqual(["01", "02"]);
  expect(initialHeroProgress.percent).toBeGreaterThan(0);
  await expect
    .poll(async () => topbarColorsMatch(await getTransparentTopbarColors(page), "0", "rgb(255, 255, 255)"))
    .toBe(true);
  await activeHeroVideo.dispatchEvent("ended");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "1");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "1");
  await expect(page.locator(".v3-hero-copy.is-retiring")).toHaveCount(1);
  expect((await getHeroCopyMotion(page)).transform).not.toBe("none");
  await expect(page.locator(".v3-hero-video-freeze.is-retiring")).toHaveAttribute("src", /^data:image\/jpeg/);
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await expect(page.getByRole("heading", { name: /반복 업무를 자동으로 처리하는 AI 시스템/ })).toBeVisible();
  await expectHomeHeroHeadingSingleLine(page);
  expect(await getHeroBackgroundImage(page)).not.toContain("hero-video-poster");
  await expect
    .poll(async () => {
      const progress = await getHeroProgressState(page);
      return progress.percent;
    })
    .toBeGreaterThan(0);
  const groupTwoHeroProgress = await getHeroProgressState(page);
  expect(groupTwoHeroProgress.labels).toEqual(["02", "02"]);
  await expect(page.locator(".v3-hero-copy.is-retiring")).toHaveCount(0);
  const groupTwoHeroCopyMotion = await getHeroCopyMotion(page);
  expect(groupTwoHeroCopyMotion.transform).toBe("none");
  expect(Math.abs(groupTwoHeroCopyMotion.top - initialHeroCopyMotion.top)).toBeLessThanOrEqual(40);
  await expect
    .poll(async () => topbarColorsMatch(await getTransparentTopbarColors(page), "1", "rgb(0, 0, 0)"))
    .toBe(true);
  const groupTwoTopbar = await getTransparentTopbarColors(page);
  expect(groupTwoTopbar.group).toBe("1");
  expect(groupTwoTopbar.headerGroup).toBe("1");
  expect(groupTwoTopbar.headerClass).toContain("is-transparent");
  expect(groupTwoTopbar.header).toBe("rgb(0, 0, 0)");
  expect(groupTwoTopbar.brand).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.brandLabel).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.brandMark).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.brandMarkBackground).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.brandMarkBorder).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.brandMarkLine).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.nav.every((color) => color === groupTwoTopbar.header)).toBe(true);
  expect(groupTwoTopbar.cta).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.ctaBorder).toBe(groupTwoTopbar.header);
  expect(groupTwoTopbar.menu).toBe(groupTwoTopbar.header);
  const groupTwoHeroCopyColors = await getHeroCopyColors(page);
  expect(groupTwoHeroCopyColors.group).toBe("1");
  expect(groupTwoHeroCopyColors.copy).toBe("rgb(0, 0, 0)");
  expect(groupTwoHeroCopyColors.heading).toBe("rgb(0, 0, 0)");
  expect(groupTwoHeroCopyColors.description).toBe("rgb(0, 0, 0)");
  expect(groupTwoHeroCopyColors.primary).toBe("rgb(0, 0, 0)");
  expect(groupTwoHeroCopyColors.primaryBorder).toBe("rgb(0, 0, 0)");
  expect(groupTwoHeroCopyColors.progress).toBe("rgb(0, 0, 0)");
  await page.evaluate(() => window.scrollTo(0, 180));
  await expect(page.locator(".v3-header")).toHaveClass(/is-scrolled/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".v3-header")).toHaveClass(/is-transparent/);
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await activeHeroVideo.dispatchEvent("ended");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-index", "0");
  await expect(page.locator(".v3-hero")).toHaveAttribute("data-video-group", "0");
  await expect(page.locator(".v3-hero-copy.is-retiring")).toHaveCount(1);
  expect((await getHeroCopyMotion(page)).transform).not.toBe("none");
  await expect(page.getByRole("heading", { name: /현장의 데이터로 만드는 AI 시스템/ })).toBeVisible();
  await expectHomeHeroHeadingSingleLine(page);
  expect(await getHeroBackgroundImage(page)).not.toContain("hero-video-poster");
  const loopedHeroProgress = await getHeroProgressState(page);
  expect(loopedHeroProgress.labels).toEqual(["01", "02"]);
  await expect(page.locator(".v3-hero-copy.is-retiring")).toHaveCount(0);
  const loopedHeroCopyMotion = await getHeroCopyMotion(page);
  expect(loopedHeroCopyMotion.transform).toBe("none");
  expect(Math.abs(loopedHeroCopyMotion.top - initialHeroCopyMotion.top)).toBeLessThanOrEqual(40);
  for (const waitMs of [0, 180, 700]) {
    if (waitMs > 0) await page.waitForTimeout(waitMs);
    expectHeroVideoBoxToStayStable(await getActiveHeroVideoMotion(page), initialHeroVideoMotion);
  }
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
