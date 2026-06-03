import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const siteSource = readFileSync(join(root, "components/site.tsx"), "utf8");
const siteHome = readFileSync(join(root, "app/page.tsx"), "utf8");

const plannedRoutes = [
  "app/page.tsx",
  "app/products/data-driven/page.tsx",
  "app/products/automation/page.tsx",
  "app/industries/construction/page.tsx",
  "app/industries/manufacturing/page.tsx",
  "app/industries/logistics/page.tsx",
  "app/industries/finance/page.tsx",
  "app/community/newsletter/page.tsx",
  "app/community/blog/page.tsx",
  "app/community/technology/page.tsx",
  "app/community/news/page.tsx",
  "app/company/page.tsx",
  "app/contact/page.tsx",
];

const removedRoutes = [
  "app/products/page.tsx",
  "app/products/ai-core/page.tsx",
  "app/mvp/page.tsx",
  "app/products/ai-apps/page.tsx",
  "app/products/tools/page.tsx",
  "app/products/si-ai/page.tsx",
  "app/community/threads/page.tsx",
];

function collectTsxFiles(directory) {
  const files = [];

  for (const entry of readdirSync(join(root, directory))) {
    const fullPath = join(root, directory, entry);
    const relativePath = join(directory, entry).replaceAll("\\", "/");

    if (statSync(fullPath).isDirectory()) {
      files.push(...collectTsxFiles(relativePath));
    } else if (entry.endsWith(".tsx")) {
      files.push(relativePath);
    }
  }

  return files;
}

test("planned site routes have page files and removed routes are gone", () => {
  for (const route of plannedRoutes) {
    assert.equal(existsSync(join(root, route)), true, `${route} should exist`);
  }

  for (const route of removedRoutes) {
    assert.equal(existsSync(join(root, route)), false, `${route} should not exist`);
  }
});

test("header navigation exposes the site IA", () => {
  const navBlock = siteSource.match(/export const navItems[\s\S]*?export const industryWordmarks/)?.[0] ?? "";

  for (const label of ["Product", "Industries", "Community", "Company"]) {
    assert.match(navBlock, new RegExp(`label: "${label}"`), `${label} should be present`);
  }

  assert.match(siteSource, /<Link className="site-nav-cta" href="\/contact"/);
  assert.match(navBlock, /label: "Data-Driven AI-Core"/);
  assert.match(navBlock, /href: "\/products\/data-driven"/);
  assert.match(navBlock, /label: "Automation AI-Core"/);
  assert.match(navBlock, /href: "\/products\/automation"/);
  assert.match(navBlock, /label: "건설"/);
  assert.match(navBlock, /href: "\/industries\/construction"/);
  assert.match(navBlock, /label: "Technology"/);
  assert.match(navBlock, /href: "\/community\/technology"/);
  assert.match(navBlock, /label: "문의하기"/);
  assert.match(navBlock, /href: "\/contact"/);

  for (const removed of [
    "AI Apps",
    "Tools",
    "Threads",
    "MVP",
    "/mvp",
    "/products/ai-core",
    "/products/ai-apps",
    "/products/tools",
    "/community/threads",
  ]) {
    assert.doesNotMatch(navBlock, new RegExp(removed.replaceAll("/", "\\/")));
  }
});

test("dropdowns include shared image and group summary, not modal flags", () => {
  assert.match(siteSource, /site-dropdown-media/);
  assert.match(siteSource, /site-dropdown-summary/);
  assert.match(siteSource, /\/assets\/industrial-ai-hero\.png/);
  assert.doesNotMatch(siteSource, /modal: true/);
  assert.doesNotMatch(siteSource, /SiteComingSoonModal/);
});

test("industry cards avoid unverified customer names", () => {
  const industryBlock = siteSource.match(/export const industryWordmarks[\s\S]*?export const clientLogos/)?.[0] ?? "";

  for (const wordmark of ["제조 운영팀", "금융 심사팀", "건설 안전팀", "물류 운영팀"]) {
    assert.match(industryBlock, new RegExp(wordmark), `${wordmark} should be present`);
  }

  for (const customerName of ["볼넛", "K-Finance", "한국종합안전 ANC", "마켓컬리"]) {
    assert.doesNotMatch(industryBlock, new RegExp(customerName), `${customerName} should not be used as a verified customer`);
  }
});

test("home hero uses the ordered landing video assets", () => {
  const heroSourcesBlock = siteSource.match(/const heroVideoSources = \[[\s\S]*?\];/)?.[0] ?? "";

  assert.match(siteSource, /\/assets\/industrial-ai-hero\.png/);
  assert.match(siteSource, /data-video-state/);
  assert.match(
    heroSourcesBlock,
    /\/assets\/hero-landing-intro\.mp4[\s\S]*\/assets\/hero-landing-reverse\.mp4/,
  );
  assert.doesNotMatch(heroSourcesBlock, /\/assets\/hero-landing-process\.mp4/);
  assert.doesNotMatch(heroSourcesBlock, /\/assets\/hero-landing-automation\.mp4/);
  assert.match(siteSource, /loop=\{heroVideoSources\.length === 1\}/);
  assert.match(siteSource, /is-active/);
  assert.match(siteSource, /is-buffering/);
  assert.match(siteSource, /is-retiring/);
  assert.match(siteSource, /현장의 데이터로 만드는 AI 시스템/);
  assert.match(siteSource, /반복 업무를 자동으로 처리하는 AI 시스템/);
  assert.doesNotMatch(siteSource, /AI-Core Build Flow/);
  assert.doesNotMatch(siteSource, /Modular Automation/);
  assert.match(siteSource, /data-video-group/);
  assert.match(siteSource, /site-hero-group-wipe/);
  assert.match(siteSource, /const heroVideoDurations = \[13\.167, 12\.243\];/);
  assert.match(siteSource, /layer\.sourceIndex === 0 && !videoReady/);
  assert.match(siteSource, /padStart\(2, "0"\)/);
  assert.match(siteHome, /\n\s+video\r?\n/);
  assert.doesNotMatch(siteHome, /primary=\{\{ label: "AI-Core", href: "\/products\/data-driven" \}\}/);
  assert.doesNotMatch(siteHome, /secondary=\{\{ label: "AI-Core 보기"/);
});

test("home product showcase links product visuals and copy CTAs", () => {
  const productBlock =
    siteSource.match(/export function SiteProductShowcase\(\) \{[\s\S]*?export function SiteToolCta/)?.[0] ?? "";

  assert.match(productBlock, /<article\s+className=\{`site-product-showcase/);
  assert.doesNotMatch(productBlock, /<Link[^>]*className=\{?`?site-product-showcase/);
  assert.match(productBlock, /href: "\/products\/data-driven"/);
  assert.match(productBlock, /href: "\/products\/automation"/);
  assert.match(productBlock, /<Link\s+className=\{`site-product-visual[\s\S]*?href=\{item\.href\}/);
  assert.match(productBlock, /<Link\s+className="site-product-cta"\s+href=\{item\.href\}/);
  assert.match(productBlock, /ctaLabel: "Data-Driven"/);
  assert.match(productBlock, /ctaLabel: "Automation"/);
});

test("home solution bridge uses overview cards instead of the old flow canvas", () => {
  const solutionBlock =
    siteSource.match(/export function SiteWorkTransitionSection\(\) \{[\s\S]*?export function SiteAiCoreShowcase/)?.[0] ??
    "";

  assert.match(solutionBlock, /solutionOverviewItems/);
  assert.match(solutionBlock, /기업에 맞춘 AI-Core 솔루션으로 기업 생산성을 혁신합니다\./);
  assert.match(solutionBlock, /업무 구조 정리/);
  assert.match(solutionBlock, /AI-Core 설계/);
  assert.match(solutionBlock, /제품 모듈 연결/);
  assert.doesNotMatch(solutionBlock, />Overview</);
  assert.doesNotMatch(solutionBlock, /현장 업무를 이해하는 방식부터 제품으로 확장되는 방식까지 한 번에 설계합니다/);
  assert.doesNotMatch(solutionBlock, /site-work-flow/);
  assert.doesNotMatch(solutionBlock, /industrial-ai-hero/);
});

test("site source does not include mojibake markers", () => {
  const files = [...collectTsxFiles("app"), ...collectTsxFiles("components")];
  const markers = ["�", "占", "?쒖", "硫"];

  for (const file of files) {
    const source = readFileSync(join(root, file), "utf8");
    for (const marker of markers) {
      assert.equal(source.includes(marker), false, `${file} contains mojibake marker ${marker}`);
    }
  }
});
