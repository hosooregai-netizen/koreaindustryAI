import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBe(false);
}

async function expectHomeHeroFillsInitialViewport(page: import("@playwright/test").Page) {
  const metrics = await page.evaluate(() => {
    window.scrollTo(0, 0);
    const hero = document.querySelector(".site-hero");
    const nextSection = document.querySelector(".site-trust-strip");

    if (!hero || !nextSection) {
      throw new Error("Could not find site home hero or following section");
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
    const header = document.querySelector<HTMLElement>(".site-header");
    const brand = document.querySelector<HTMLElement>(".site-brand");
    const brandMark = document.querySelector<HTMLElement>(".site-brand-mark");
    const menuButton = document.querySelector<HTMLElement>(".site-menu-button");
    const navControls = [...document.querySelectorAll<HTMLElement>(".site-nav-group > a, .site-nav-group > button")];

    if (!header || !brand || !brandMark || !menuButton) {
      throw new Error("Could not find site topbar elements");
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
      brandMarkBackgroundImage: getComputedStyle(brandMark).backgroundImage,
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
  expect(top.brandMarkBackgroundImage).not.toEqual(scrolled.brandMarkBackgroundImage);
  expect(scrolled.header).toEqual(top.header);
  expect(scrolled.brand).toEqual(top.brand);
  expect(scrolled.menuButton).toEqual(top.menuButton);
  expect(scrolled.navControls).toEqual(top.navControls);
}

async function getTransparentTopbarColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const brand = document.querySelector<HTMLElement>(".site-brand");
    const brandLabel = document.querySelector<HTMLElement>(".site-brand > span:last-child");
    const brandMark = document.querySelector<HTMLElement>(".site-brand-mark");
    const brandMarkLine = document.querySelector<HTMLElement>(".site-brand-mark span");
    const navControls = [...document.querySelectorAll<HTMLElement>(".site-nav-group > a, .site-nav-group > button")];
    const cta = document.querySelector<HTMLElement>(".site-nav .site-nav-cta");
    const menuButton = document.querySelector<HTMLElement>(".site-menu-button");

    if (!header || !brand || !brandLabel || !brandMark || !brandMarkLine || navControls.length === 0 || !cta || !menuButton) {
      throw new Error("Could not find site topbar color elements");
    }

    return {
      group: document.documentElement.dataset.siteHeroGroup,
      headerGroup: header.dataset.siteHeroGroup,
      headerClass: header.className,
      header: getComputedStyle(header).color,
      brand: getComputedStyle(brand).color,
      brandLabel: getComputedStyle(brandLabel).color,
      brandMark: getComputedStyle(brandMark).color,
      brandMarkBackground: getComputedStyle(brandMark).backgroundColor,
      brandMarkBackgroundImage: getComputedStyle(brandMark).backgroundImage,
      brandMarkBorder: getComputedStyle(brandMark).borderColor,
      brandMarkLine: getComputedStyle(brandMarkLine).backgroundColor,
      nav: navControls.map((element) => getComputedStyle(element).color),
      cta: getComputedStyle(cta).color,
      ctaBorder: getComputedStyle(cta).borderColor,
      menu: getComputedStyle(menuButton).color,
    };
  });
}

async function getMobileMenuColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const nav = document.querySelector<HTMLElement>(".site-nav.is-open");
    const navControls = [...document.querySelectorAll<HTMLElement>(".site-nav.is-open .site-nav-group > a, .site-nav.is-open .site-nav-group > button")];
    const dropdownItems = [...document.querySelectorAll<HTMLElement>(".site-nav.is-open .site-dropdown a")];
    const cta = document.querySelector<HTMLElement>(".site-nav.is-open .site-nav-cta");

    if (!nav || navControls.length === 0 || dropdownItems.length === 0 || !cta) {
      throw new Error("Could not find open site mobile menu color elements");
    }

    return {
      navBackground: getComputedStyle(nav).backgroundColor,
      navControls: navControls.map((element) => getComputedStyle(element).color),
      dropdownItems: dropdownItems.map((element) => getComputedStyle(element).color),
      cta: getComputedStyle(cta).color,
      ctaBorder: getComputedStyle(cta).borderColor,
      ctaBackground: getComputedStyle(cta).backgroundColor,
    };
  });
}

async function getMobileTopbarLayout(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const brand = document.querySelector<HTMLElement>(".site-brand");
    const brandMark = document.querySelector<HTMLElement>(".site-header .site-brand-mark");
    const menuButton = document.querySelector<HTMLElement>(".site-menu-button");

    if (!header || !brand || !brandMark || !menuButton) {
      throw new Error("Could not find mobile topbar layout elements");
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
      header: rect(header),
      brand: rect(brand),
      brandMark: rect(brandMark),
      menuButton: rect(menuButton),
    };
  });
}

async function getHeroCopyMotion(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const copy = document.querySelector<HTMLElement>(".site-hero-copy.is-active, .site-hero-copy");

    if (!copy) {
      throw new Error("Could not find site hero copy");
    }

    const rect = copy.getBoundingClientRect();

    return {
      top: Math.round(rect.top * 100) / 100,
      transform: getComputedStyle(copy).transform,
    };
  });
}

async function getActiveHeroOverlayMotion(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const overlay = document.querySelector<HTMLElement>(".site-hero-overlay.is-active");

    if (!overlay) {
      throw new Error("Could not find active site hero overlay");
    }

    return {
      group: overlay.dataset.overlayGroup,
      background: getComputedStyle(overlay).backgroundImage,
      transform: getComputedStyle(overlay).transform,
    };
  });
}

async function getHeroCopyColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".site-hero");
    const copy = document.querySelector<HTMLElement>(".site-hero-copy.is-active, .site-hero-copy");
    const heading = copy?.querySelector<HTMLElement>("h1");
    const description = copy?.querySelector<HTMLElement>("p:not(.site-eyebrow)");
    const progress = document.querySelector<HTMLElement>(".site-hero-progress");

    if (!hero || !copy || !heading || !description || !progress) {
      throw new Error("Could not find site hero copy color elements");
    }

    return {
      group: hero.dataset.videoGroup,
      copy: getComputedStyle(copy).color,
      heading: getComputedStyle(heading).color,
      description: getComputedStyle(description).color,
      progress: getComputedStyle(progress).color,
    };
  });
}

async function expectHomeHeroCopySingleLine(page: import("@playwright/test").Page) {
  if (await page.locator(".site-hero.is-group-transitioning").count()) {
    await expect(page.locator(".site-hero.is-group-transitioning")).toHaveCount(0);
  }

  const metrics = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>(".site-hero.is-home h1");
    const description = document.querySelector<HTMLElement>(".site-hero.is-home .site-hero-copy > p:not(.site-eyebrow)");

    if (!heading || !description) {
      throw new Error("Could not find site home hero copy");
    }

    const measure = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);

      return {
        whiteSpace: style.whiteSpace,
        height: Math.round(rect.height * 100) / 100,
        lineHeight: Number.parseFloat(style.lineHeight),
        left: Math.round(rect.left * 100) / 100,
        right: Math.round(rect.right * 100) / 100,
      };
    };

    return {
      heading: measure(heading),
      description: measure(description),
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });

  for (const copyMetrics of [metrics.heading, metrics.description]) {
    expect(copyMetrics.whiteSpace).toBe("nowrap");
    expect(copyMetrics.height).toBeLessThanOrEqual(copyMetrics.lineHeight * 1.35);
    expect(copyMetrics.left).toBeGreaterThanOrEqual(-1);
    expect(copyMetrics.right).toBeLessThanOrEqual(metrics.viewportWidth + 1);
  }
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function getActiveHeroVideoMotion(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const video = document.querySelector<HTMLElement>(".site-hero-video.is-active");

    if (!video) {
      throw new Error("Could not find active site hero video");
    }

    const rect = video.getBoundingClientRect();

    return {
      height: Math.round(rect.height * 100) / 100,
      top: Math.round(rect.top * 100) / 100,
    };
  });
}

async function triggerHeroVideoLeadAdvance(page: import("@playwright/test").Page) {
  const activeHeroVideo = page.locator(".site-hero-video.is-active");
  return activeHeroVideo.evaluate((video) => {
    const media = video as HTMLVideoElement;
    if (!Number.isFinite(media.duration)) {
      throw new Error("Active site hero video duration is not ready");
    }

    media.pause();
    media.currentTime = Math.max(0, media.duration - 0.3);
    const stateBeforeTimeUpdate = {
      currentTime: media.currentTime,
      duration: media.duration,
      ended: media.ended,
      remaining: media.duration - media.currentTime,
    };
    media.dispatchEvent(new Event("timeupdate", { bubbles: true }));
    return stateBeforeTimeUpdate;
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
    const progress = document.querySelector<HTMLElement>(".site-hero-progress");
    const track = progress?.querySelector<HTMLElement>("strong");

    if (!progress || !track) {
      throw new Error("Could not find site hero progress");
    }

    return {
      labels: [...progress.querySelectorAll("span")].map((element) => element.textContent?.trim()),
      percent: Number.parseFloat(track.style.getPropertyValue("--site-hero-progress")) || 0,
    };
  });
}

async function getHoverBackground(page: import("@playwright/test").Page, selector: string) {
  const target = page.locator(selector).first();
  await target.hover();
  return target.evaluate((element) => getComputedStyle(element).backgroundColor);
}

async function getHeroProgressHeadingOrder(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const progress = document.querySelector<HTMLElement>(".site-hero-copy.is-active .site-hero-progress");
    const heading = document.querySelector<HTMLElement>(".site-hero-copy.is-active h1");

    if (!progress || !heading) {
      throw new Error("Could not find active hero progress or heading");
    }

    return {
      progressBottom: progress.getBoundingClientRect().bottom,
      headingTop: heading.getBoundingClientRect().top,
    };
  });
}

async function getHeroBackgroundImage(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".site-hero");

    if (!hero) {
      throw new Error("Could not find site hero");
    }

    return getComputedStyle(hero).backgroundImage;
  });
}

function topbarColorsMatch(
  colors: Awaited<ReturnType<typeof getTransparentTopbarColors>>,
  group: string,
  expectedColor: string,
) {
  const expectedWordmark = group === "0" ? "koreaindustry-wordmark-white.png" : "koreaindustry-wordmark-black.png";

  return (
    colors.group === group &&
    colors.headerGroup === group &&
    colors.header === expectedColor &&
    colors.brand === expectedColor &&
    colors.brandLabel === expectedColor &&
    colors.brandMark === expectedColor &&
    colors.brandMarkBackground === "rgba(0, 0, 0, 0)" &&
    colors.brandMarkBackgroundImage.includes(expectedWordmark) &&
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
    await page.goto("/");
    await expectHomeHeroFillsInitialViewport(page);
    await expect(page.getByRole("heading", { name: /현장의 데이터로 만드는 AI 시스템/ })).toBeVisible();
    if (viewport.width > 760) await expectHomeHeroCopySingleLine(page);
  }
});

test("topbar becomes white on scroll without resizing", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expectTopbarChangesBackgroundWithoutResizing(page);
  }
});

test("home hero starts video transition before the active clip ends", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const activeHeroVideo = page.locator(".site-hero-video.is-active");
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-index", "0");
  await expect
    .poll(() => activeHeroVideo.evaluate((video) => Number.isFinite((video as HTMLVideoElement).duration)))
    .toBe(true);

  const leadAdvanceState = await triggerHeroVideoLeadAdvance(page);
  expect(leadAdvanceState.ended).toBe(false);
  expect(leadAdvanceState.remaining).toBeGreaterThan(0);
  expect(leadAdvanceState.remaining).toBeLessThanOrEqual(0.5);

  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-index", "1");
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-group", "1");
  await expect(page.locator(".site-hero-overlay.is-retiring")).toHaveAttribute("data-overlay-group", "0");
  await expect(page.locator(".site-hero-video-freeze.is-retiring")).toHaveCount(0);
});

test("desktop Product navigation exposes Data-Driven AI-Core and routes correctly", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page).toHaveTitle("대한산업 AI");

  await expect(page.getByRole("heading", { name: /현장의 데이터로 만드는 AI 시스템/ })).toBeVisible();
  await expectHomeHeroCopySingleLine(page);
  const heroActions = page.locator(".site-hero .site-hero-actions a");
  await expect(heroActions).toHaveCount(0);
  const initialHeroCopyMotion = await getHeroCopyMotion(page);
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-state", /image-fallback|loaded/);
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-index", "0");
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-group", "0");
  const activeHeroVideo = page.locator(".site-hero-video.is-active");
  const initialHeroVideoMotion = await getActiveHeroVideoMotion(page);
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-intro\.mp4$/);
  await expect(activeHeroVideo).toHaveJSProperty("loop", false);
  await expect(activeHeroVideo).toHaveJSProperty("paused", false);
  await expect
    .poll(() => activeHeroVideo.evaluate((video) => (video as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.1);
  await expect(page.locator(".site-hero")).toHaveClass(/has-video/);
  expect(await getHeroBackgroundImage(page)).not.toContain("hero-video-poster");
  const initialHeroProgress = await getHeroProgressState(page);
  expect(initialHeroProgress.labels).toEqual(["AI-Core"]);
  expect(initialHeroProgress.percent).toBeGreaterThan(0);
  expect(await getHoverBackground(page, ".site-hero-copy.is-active .site-hero-progress-prev")).toBe("rgba(0, 0, 0, 0)");
  expect(await getHoverBackground(page, ".site-hero-copy.is-active .site-hero-progress-next")).toBe("rgba(0, 0, 0, 0)");
  const progressOrder = await getHeroProgressHeadingOrder(page);
  expect(progressOrder.progressBottom).toBeLessThan(progressOrder.headingTop);
  await expect
    .poll(async () => topbarColorsMatch(await getTransparentTopbarColors(page), "0", "rgb(255, 255, 255)"))
    .toBe(true);
  await page.locator(".site-hero-copy.is-active .site-hero-progress-next").click();
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-index", "1");
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-group", "1");
  await expect(page.locator(".site-hero-overlay.is-retiring")).toHaveAttribute("data-overlay-group", "0");
  await expect(page.locator(".site-hero-overlay.is-active")).toHaveAttribute("data-overlay-group", "1");
  expect((await getActiveHeroOverlayMotion(page)).transform).not.toBe("none");
  await expect(page.locator(".site-hero-copy.is-retiring")).toHaveCount(1);
  expect((await getHeroCopyMotion(page)).transform).not.toBe("none");
  await expect(page.locator(".site-hero-video-freeze.is-retiring")).toHaveAttribute("src", /^data:image\/jpeg/);
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-reverse\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await expect(page.getByRole("heading", { name: /반복 업무를 자동으로 처리하는 AI 시스템/ })).toBeVisible();
  await expectHomeHeroCopySingleLine(page);
  expect(await getHeroBackgroundImage(page)).not.toContain("hero-video-poster");
  await expect
    .poll(async () => {
      const progress = await getHeroProgressState(page);
      return progress.percent;
    })
    .toBeGreaterThan(0);
  const groupTwoHeroProgress = await getHeroProgressState(page);
  expect(groupTwoHeroProgress.labels).toEqual(["AI-Core"]);
  await expect(page.locator(".site-hero-overlay.is-retiring")).toHaveCount(0);
  await expect(page.locator(".site-hero-copy.is-retiring")).toHaveCount(0);
  expect((await getActiveHeroOverlayMotion(page)).group).toBe("1");
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
  expect(groupTwoTopbar.brandMarkBackground).toBe("rgba(0, 0, 0, 0)");
  expect(groupTwoTopbar.brandMarkBackgroundImage).toContain("koreaindustry-wordmark-black.png");
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
  expect(groupTwoHeroCopyColors.progress).toBe("rgb(0, 0, 0)");
  await page.evaluate(() => window.scrollTo(0, 180));
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".site-header")).toHaveClass(/is-transparent/);
  await expect(activeHeroVideo).toHaveAttribute("src", /hero-landing-reverse\.mp4$/);
  await expect(activeHeroVideo).not.toHaveAttribute("poster", /hero-video-poster/);
  await page.locator(".site-hero-copy.is-active .site-hero-progress-prev").click();
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-index", "0");
  await expect(page.locator(".site-hero")).toHaveAttribute("data-video-group", "0");
  await expect(page.locator(".site-hero-overlay.is-retiring")).toHaveAttribute("data-overlay-group", "1");
  await expect(page.locator(".site-hero-overlay.is-active")).toHaveAttribute("data-overlay-group", "0");
  expect((await getActiveHeroOverlayMotion(page)).transform).not.toBe("none");
  await expect(page.locator(".site-hero-copy.is-retiring")).toHaveCount(1);
  expect((await getHeroCopyMotion(page)).transform).not.toBe("none");
  await expect(page.getByRole("heading", { name: /현장의 데이터로 만드는 AI 시스템/ })).toBeVisible();
  await expectHomeHeroCopySingleLine(page);
  expect(await getHeroBackgroundImage(page)).not.toContain("hero-video-poster");
  const loopedHeroProgress = await getHeroProgressState(page);
  expect(loopedHeroProgress.labels).toEqual(["AI-Core"]);
  await expect(page.locator(".site-hero-overlay.is-retiring")).toHaveCount(0);
  await expect(page.locator(".site-hero-copy.is-retiring")).toHaveCount(0);
  expect((await getActiveHeroOverlayMotion(page)).group).toBe("0");
  const loopedHeroCopyMotion = await getHeroCopyMotion(page);
  expect(loopedHeroCopyMotion.transform).toBe("none");
  expect(Math.abs(loopedHeroCopyMotion.top - initialHeroCopyMotion.top)).toBeLessThanOrEqual(40);
  for (const waitMs of [0, 180, 700]) {
    if (waitMs > 0) await page.waitForTimeout(waitMs);
    expectHeroVideoBoxToStayStable(await getActiveHeroVideoMotion(page), initialHeroVideoMotion);
  }
  await expect(page.locator(".site-client-logo img")).toHaveCount(20);
  await expect(page.locator('.site-client-logo img[alt="한국종합안전(주)"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="금융결제원"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="다우데이타"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="대신자산운용"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="NH투자증권"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="LINE FRIENDS"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="페어스퀘어랩"]')).toHaveCount(1);
  await expect(page.locator('.site-client-logo img[alt="뽀득"]')).toHaveCount(0);
  await expect(page.locator('.site-client-logo img[alt="Ownist"]')).toHaveCount(0);
  await expect(page.locator('.site-client-logo img[alt="INSIDERS"]')).toHaveCount(0);

  const mainNav = page.getByLabel("주요 메뉴");
  const productGroup = mainNav.locator(".site-nav-group").filter({ hasText: "Product" }).first();
  await mainNav.getByRole("button", { name: "Product" }).focus();
  await expect(productGroup.locator(".site-dropdown")).toBeVisible();
  await expect(productGroup.locator(".site-dropdown-overview")).toContainText("Product");
  await expect(productGroup.locator(".site-dropdown-overview p")).toHaveCount(0);
  await expect(productGroup.locator(".site-dropdown-item")).toHaveCount(2);
  await expect(productGroup.locator(".site-dropdown img")).toHaveCount(0);

  await mainNav.getByRole("button", { name: "Product" }).hover();
  await expect(productGroup.locator(".site-dropdown-item")).toHaveCount(2);
  const homeTopDropdownColors = await productGroup.locator(".site-dropdown").evaluate((dropdown) => {
    const dropdownStyle = getComputedStyle(dropdown);
    const title = dropdown.querySelector<HTMLElement>(".site-dropdown-overview strong");
    const item = dropdown.querySelector<HTMLElement>(".site-dropdown-item");

    return {
      background: dropdownStyle.backgroundColor,
      borderBottomWidth: dropdownStyle.borderBottomWidth,
      borderTopWidth: dropdownStyle.borderTopWidth,
      color: dropdownStyle.color,
      item: item ? getComputedStyle(item).color : "",
      title: title ? getComputedStyle(title).color : "",
    };
  });
  expect(homeTopDropdownColors.background).toBe("rgba(0, 0, 0, 0)");
  expect(homeTopDropdownColors.color).toBe("rgb(255, 255, 255)");
  expect(homeTopDropdownColors.borderTopWidth).toBe("0px");
  expect(homeTopDropdownColors.borderBottomWidth).toBe("0px");
  expect(homeTopDropdownColors.item).toBe(homeTopDropdownColors.color);
  expect(homeTopDropdownColors.title).toBe(homeTopDropdownColors.color);

  const triggerBox = await mainNav.getByRole("button", { name: "Product" }).boundingBox();
  const dropdownBox = await productGroup.locator(".site-dropdown").boundingBox();
  if (!triggerBox || !dropdownBox) throw new Error("Could not measure Product trigger or dropdown");
  expect(Math.abs(dropdownBox.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(dropdownBox.y - 62)).toBeLessThanOrEqual(1);
  expect(Math.abs(dropdownBox.width - 1440)).toBeLessThanOrEqual(1);
  await page.mouse.move(triggerBox.x + triggerBox.width / 2, (triggerBox.y + triggerBox.height + dropdownBox.y) / 2);
  await expect(productGroup.locator(".site-dropdown-item")).toHaveCount(2);
  await page.mouse.move(dropdownBox.x + dropdownBox.width - 80, dropdownBox.y + 48);
  await expect(mainNav.getByRole("menuitem", { name: /Data-Driven AI-Core/ })).toBeVisible();

  await expect(mainNav.getByRole("menuitem", { name: /Data-Driven AI-Core/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /Automation AI-Core/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /AI Apps/ })).toHaveCount(0);
  await expect(mainNav.getByRole("menuitem", { name: /Tools/ })).toHaveCount(0);

  await mainNav.getByRole("menuitem", { name: /Data-Driven AI-Core/ }).click();
  await expect(page).toHaveURL(/\/products\/data-driven$/);
  await expect(page.getByRole("heading", { name: /현장 데이터 걱정 없이 AI 업무 시작/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("home scrolled dropdown item hover stays text-only", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 720));
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);

  const communityGroup = page.locator(".site-nav-links .site-nav-group").filter({ hasText: "Community" }).first();
  await communityGroup.locator(":scope > button").hover();
  const blogItem = communityGroup.locator(".site-dropdown-item").filter({ hasText: "Blog" }).first();
  await blogItem.hover();

  const hoverStyle = await blogItem.evaluate((item) => {
    const style = getComputedStyle(item);
    return {
      background: style.backgroundColor,
      color: style.color,
      minHeight: style.minHeight,
      padding: style.padding,
    };
  });
  expect(hoverStyle.background).toBe("rgba(0, 0, 0, 0)");
  expect(hoverStyle.color).toBe("rgb(47, 107, 255)");
  expect(hoverStyle.minHeight).toBe("0px");
  expect(hoverStyle.padding).toBe("0px");
});

test("Product Automation item routes to the Automation AI-Core page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const mainNav = page.getByLabel("주요 메뉴");
  await mainNav.getByRole("button", { name: "Product" }).hover();
  await mainNav.getByRole("menuitem", { name: /Automation AI-Core/ }).click();

  await expect(page).toHaveURL(/\/products\/automation$/);
  await expect(page.getByRole("heading", { name: /반복 업무를 줄이고 실행 속도는 높입니다/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("mobile menu exposes Data-Driven AI-Core and routes without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const closedTopbarLayout = await getMobileTopbarLayout(page);
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  const mainNav = page.getByLabel("주요 메뉴");
  await expect(mainNav).toBeVisible();
  await expect.poll(() => getMobileTopbarLayout(page)).toEqual(closedTopbarLayout);
  const mobileMenuColors = await getMobileMenuColors(page);
  expect(mobileMenuColors.navBackground).toBe("rgb(255, 255, 255)");
  expect(mobileMenuColors.navControls.every((color) => color === "rgb(5, 5, 5)")).toBe(true);
  expect(mobileMenuColors.dropdownItems.every((color) => color === "rgb(5, 5, 5)")).toBe(true);
  expect(mobileMenuColors.cta).toBe("rgb(255, 255, 255)");
  expect(mobileMenuColors.ctaBorder).toBe("rgb(5, 5, 5)");
  expect(mobileMenuColors.ctaBackground).toBe("rgb(5, 5, 5)");
  await expect(mainNav.locator('.site-dropdown[data-nav-label="Company"]')).toBeHidden();
  await expect(mainNav.locator(".site-nav-cta")).toBeVisible();
  const aiCoreMenuItem = mainNav.getByRole("menuitem", { name: /Data-Driven AI-Core/ });
  await expect(aiCoreMenuItem).toBeVisible();
  await aiCoreMenuItem.click();

  await expect(page).toHaveURL(/\/products\/data-driven$/);
  await expect(page.getByRole("heading", { name: /현장 데이터 걱정 없이 AI 업무 시작/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("home omits industry wordmarks and shows industry image cards", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator(".site-industry-wordmarks")).toHaveCount(0);
  await expect(page.locator(".site-home-industries-title")).toHaveText("INDUSTRIES");
  await expect(page.locator(".site-home-industry-card")).toHaveCount(4);
  const whatsNew = page.locator(".site-whats-new-section");
  await expect(whatsNew.locator(".site-whats-new-tag")).toHaveCount(6);
  await expect(whatsNew.locator(".site-whats-new-card").first()).toHaveAttribute(
    "href",
    /\/community\/newsletter\/ai-cost-metering-note$/,
  );
  await expect(whatsNew.locator(".site-whats-new-card").first().locator("img")).toHaveAttribute(
    "src",
    /newsletter-ai-cost-metering/,
  );
  await expect(whatsNew.getByText("Monthly letter", { exact: true })).toHaveCount(0);
  await whatsNew.getByRole("button", { name: "다음 페이지" }).click();
  await expect(whatsNew.getByText("AI insight", { exact: true })).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("home What's New card opens a community article detail", async ({ page }) => {
  await page.goto("/");

  await page.locator(".site-whats-new-card").first().click();
  await expect(page).toHaveURL(/\/community\/newsletter\/ai-cost-metering-note$/);
  await expect(page.getByRole("heading", { name: "AI 비용을 업무 단위로 계량하는 운영 노트" })).toBeVisible();
  await expect(page.locator(".site-community-article-body")).toContainText("AI 비용 관리는 덜 쓰게 만드는 규칙");
  await expectNoHorizontalOverflow(page);
});

test("Community and Industries routes expose current pages", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const mainNav = page.getByLabel("주요 메뉴");
  await mainNav.getByRole("button", { name: "Community" }).hover();
  await expect(mainNav.getByRole("menuitem", { name: /Newsletter/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /Blog/ })).toBeVisible();
  await expect(mainNav.getByRole("menuitem", { name: /News$/ })).toHaveCount(0);
  await mainNav.getByRole("menuitem", { name: /Technology/ }).click();
  await expect(page).toHaveURL(/\/community\/technology$/);
  await expect(page.getByRole("heading", { name: "Technology", exact: true })).toBeVisible();
  await expect(page.locator(".site-community-hero")).toHaveCount(0);
  await expect(page.locator(".site-community-featured-card")).toHaveCount(1);
  await expect(page.locator(".site-community-card")).toHaveCount(6);

  await page.goto("/");
  await mainNav.getByRole("button", { name: "Industries" }).hover();
  await mainNav.getByRole("menuitem", { name: /금융/ }).click();
  await expect(page).toHaveURL(/\/industries\/finance$/);
  await expect(page.getByRole("heading", { level: 1, name: /금융 .*AI-Core/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI-Core 적용 흐름" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("desktop contact CTA routes to contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.getByLabel("주요 메뉴").getByRole("link", { name: "문의하기" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { name: /산업 AI 전문가에게 문의하기/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("desktop Company navigation routes directly to contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const companyGroup = page.locator(".site-nav-links .site-nav-group").filter({ hasText: "Company" }).first();
  await companyGroup.locator("> a").hover();
  await expect(companyGroup.locator(".site-dropdown")).toBeVisible();
  await expect(companyGroup.locator(".site-dropdown-overview")).toContainText("Company");
  await expect(companyGroup.locator(".site-dropdown-overview p")).toHaveCount(0);
  await expect(companyGroup.locator(".site-dropdown-item")).toHaveCount(1);
  await expect(companyGroup.locator(".site-dropdown img")).toHaveCount(0);
  const dropdownBox = await companyGroup.locator(".site-dropdown").boundingBox();
  if (!dropdownBox) throw new Error("Could not measure Company dropdown");
  expect(Math.abs(dropdownBox.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(dropdownBox.y - 62)).toBeLessThanOrEqual(1);
  expect(Math.abs(dropdownBox.width - 1440)).toBeLessThanOrEqual(1);

  await companyGroup.locator("> a").click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { name: /산업 AI 전문가에게 문의하기/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("newsletter route shows featured story and card grid", async ({ page }) => {
  await page.goto("/community/newsletter");
  await expect(page.getByRole("heading", { name: "Newsletter", exact: true })).toBeVisible();
  await expect(page.getByText("AI-Core 업데이트와 산업 자동화 노트")).toBeVisible();
  await expect(page.getByRole("button", { name: "소식받기" })).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator(".site-community-tags")).toHaveCount(0);
  await expect(page.locator(".site-community-featured-card")).toHaveCount(1);
  await expect(page.locator(".site-community-card")).toHaveCount(6);
  await expectNoHorizontalOverflow(page);
});

test("blog route shows featured story without filters or CTA", async ({ page }) => {
  await page.goto("/community/blog");
  await expect(page.getByRole("heading", { name: "Blog", exact: true })).toBeVisible();
  await expect(page.getByText("산업 AI와 현장 자동화 이야기")).toBeVisible();
  await expect(page.getByRole("link", { name: "블로그 이동하기" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "AI-Core" })).toHaveCount(0);
  await expect(page.locator(".site-community-tags")).toHaveCount(0);
  await expect(page.locator(".site-community-featured-card")).toHaveCount(1);
  await expect(page.locator(".site-community-card")).toHaveCount(6);
  await page.locator(".site-community-featured-card").click();
  await expect(page).toHaveURL(/\/community\/blog\/manufacturing-pilot-line-digital-thread$/);
  await expect(page.getByRole("heading", { name: "제조 파일럿 라인을 디지털 스레드로 묶는 방법" })).toBeVisible();
  await expect(page.locator(".site-community-article-cover img")).toHaveAttribute(
    "src",
    /blog-manufacturing-digital-thread/,
  );
  await expect(page.locator(".site-community-article-body")).toContainText("파일럿 라인의 학습이 느려지는 원인");
  await expect(page.getByRole("link", { name: "목록으로 돌아가기" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("technology route shows featured story without filters or hero CTA", async ({ page }) => {
  await page.goto("/community/technology");
  await expect(page.getByRole("heading", { name: "Technology", exact: true })).toBeVisible();
  await expect(page.getByText("AI-Core 구조와 자동화 설계")).toBeVisible();
  await expect(page.getByRole("button", { name: "소식받기" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "블로그 이동하기" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Architecture" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Automation" })).toHaveCount(0);
  await expect(page.locator(".site-community-tags")).toHaveCount(0);
  await expect(page.locator(".site-community-featured-card")).toHaveCount(1);
  await expect(page.locator(".site-community-card")).toHaveCount(6);
  await page.locator(".site-community-featured-card").click();
  await expect(page).toHaveURL(/\/community\/technology\/ai-cost-observability$/);
  await expect(page.getByRole("heading", { name: "AI 비용 관측성을 업무 레이어에 붙이는 설계" })).toBeVisible();
  await expect(page.locator(".site-community-article-cover img")).toHaveAttribute(
    "src",
    /technology-ai-cost-observability/,
  );
  await expectNoHorizontalOverflow(page);
});

test("contact form shows a success state", async ({ page }) => {
  let submittedPayload: Record<string, unknown> | null = null;

  await page.route("**/api/contact", async (route) => {
    submittedPayload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await page.goto("/contact");
  await page.getByLabel(/성함/).fill("테스터");
  await page.getByLabel(/회사명/).fill("대한테스트");
  await page.getByLabel(/업무용 이메일주소/).fill("test@example.com");
  await page.getByLabel(/휴대폰번호/).fill("010-1234-5678");
  await page.getByLabel(/문의내용/).fill("반복 보고 업무 자동화 상담을 요청합니다.");
  await page.getByRole("button", { name: /문의 접수하기/ }).click();
  await expect(page.getByText("문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.")).toBeVisible();
  expect(submittedPayload).toMatchObject({
    name: "테스터",
    company: "대한테스트",
    email: "test@example.com",
    phone: "010-1234-5678",
    message: "반복 보고 업무 자동화 상담을 요청합니다.",
  });
  expect(submittedPayload).not.toHaveProperty("source");
  expect(submittedPayload).not.toHaveProperty("adoptionStage");
  expect(submittedPayload).not.toHaveProperty("interest");
  await expectNoHorizontalOverflow(page);
});
