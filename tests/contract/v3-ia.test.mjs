import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const v3Site = readFileSync(join(root, "components/v3/v3-site.tsx"), "utf8");
const v3Home = readFileSync(join(root, "app/v3/page.tsx"), "utf8");

const plannedRoutes = [
  "app/v3/page.tsx",
  "app/v3/products/ai-core/page.tsx",
  "app/v3/mvp/page.tsx",
  "app/v3/industries/construction/page.tsx",
  "app/v3/industries/manufacturing/page.tsx",
  "app/v3/industries/logistics/page.tsx",
  "app/v3/industries/finance/page.tsx",
  "app/v3/community/newsletter/page.tsx",
  "app/v3/community/blog/page.tsx",
  "app/v3/community/technology/page.tsx",
  "app/v3/community/news/page.tsx",
  "app/v3/company/page.tsx",
  "app/v3/contact/page.tsx",
];

const removedRoutes = [
  "app/v3/products/page.tsx",
  "app/v3/products/ai-apps/page.tsx",
  "app/v3/products/tools/page.tsx",
  "app/v3/products/si-ai/page.tsx",
  "app/v3/community/threads/page.tsx",
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

test("planned v3 routes have page files and removed routes are gone", () => {
  for (const route of plannedRoutes) {
    assert.equal(existsSync(join(root, route)), true, `${route} should exist`);
  }

  for (const route of removedRoutes) {
    assert.equal(existsSync(join(root, route)), false, `${route} should not exist`);
  }
});

test("header navigation exposes the v3 IA", () => {
  const navBlock = v3Site.match(/export const navItems[\s\S]*?export const industryWordmarks/)?.[0] ?? "";

  for (const label of ["Product", "Industries", "Resources", "Company"]) {
    assert.match(navBlock, new RegExp(`label: "${label}"`), `${label} should be present`);
  }

  assert.match(v3Site, /<Link className="v3-nav-cta" href="\/v3\/contact"/);
  assert.match(navBlock, /label: "AI Core"/);
  assert.match(navBlock, /href: "\/v3\/products\/ai-core"/);
  assert.match(navBlock, /label: "MVP"/);
  assert.match(navBlock, /href: "\/v3\/mvp"/);
  assert.match(navBlock, /label: "건설"/);
  assert.match(navBlock, /href: "\/v3\/industries\/construction"/);
  assert.match(navBlock, /label: "Technology"/);
  assert.match(navBlock, /href: "\/v3\/community\/technology"/);
  assert.match(navBlock, /label: "문의하기"/);
  assert.match(navBlock, /href: "\/v3\/contact"/);

  for (const removed of ["AI Apps", "Tools", "Threads", "/v3/products/ai-apps", "/v3/products/tools", "/v3/community/threads"]) {
    assert.doesNotMatch(navBlock, new RegExp(removed.replaceAll("/", "\\/")));
  }
});

test("dropdowns include shared image and group summary, not modal flags", () => {
  assert.match(v3Site, /v3-dropdown-media/);
  assert.match(v3Site, /v3-dropdown-summary/);
  assert.match(v3Site, /\/v3\/industrial-ai-hero\.png/);
  assert.doesNotMatch(v3Site, /modal: true/);
  assert.doesNotMatch(v3Site, /V3ComingSoonModal/);
});

test("industry cards avoid unverified customer names", () => {
  const industryBlock = v3Site.match(/export const industryWordmarks[\s\S]*?export const clientLogos/)?.[0] ?? "";

  for (const wordmark of ["제조 운영팀", "금융 심사팀", "건설 안전팀", "물류 운영팀"]) {
    assert.match(industryBlock, new RegExp(wordmark), `${wordmark} should be present`);
  }

  for (const customerName of ["볼넛", "K-Finance", "한국종합안전 ANC", "마켓컬리"]) {
    assert.doesNotMatch(industryBlock, new RegExp(customerName), `${customerName} should not be used as a verified customer`);
  }
});

test("home hero uses the ordered landing video assets", () => {
  const heroSourcesBlock = v3Site.match(/const heroVideoSources = \[[\s\S]*?\];/)?.[0] ?? "";

  assert.match(v3Site, /\/v3\/industrial-ai-hero\.png/);
  assert.match(v3Site, /data-video-state/);
  assert.match(
    heroSourcesBlock,
    /\/v3\/hero-landing-intro\.mp4[\s\S]*\/v3\/hero-landing-reverse\.mp4/,
  );
  assert.doesNotMatch(heroSourcesBlock, /\/v3\/hero-landing-process\.mp4/);
  assert.doesNotMatch(heroSourcesBlock, /\/v3\/hero-landing-automation\.mp4/);
  assert.match(v3Site, /loop=\{heroVideoSources\.length === 1\}/);
  assert.match(v3Site, /is-active/);
  assert.match(v3Site, /is-buffering/);
  assert.match(v3Site, /is-retiring/);
  assert.match(v3Site, /현장의 데이터로 만드는 AI 시스템/);
  assert.match(v3Site, /반복 업무를 자동으로 처리하는 AI 시스템/);
  assert.doesNotMatch(v3Site, /AI-Core Build Flow/);
  assert.doesNotMatch(v3Site, /Modular Automation/);
  assert.match(v3Site, /data-video-group/);
  assert.match(v3Site, /v3-hero-group-wipe/);
  assert.match(v3Site, /const heroVideoDurations = \[13\.167, 12\.243\];/);
  assert.match(v3Site, /layer\.sourceIndex === 0 && !videoReady/);
  assert.match(v3Site, /padStart\(2, "0"\)/);
  assert.match(v3Home, /\n\s+video\r?\n/);
  assert.match(v3Home, /primary=\{\{ label: "AI-Core", href: "\/v3\/products\/ai-core" \}\}/);
  assert.doesNotMatch(v3Home, /secondary=\{\{ label: "AI-Core 보기"/);
});

test("home product showcase links only the product visual", () => {
  const productBlock =
    v3Site.match(/export function V3ProductShowcase\(\) \{[\s\S]*?export function V3ToolCta/)?.[0] ?? "";

  assert.match(productBlock, /<article\s+className=\{`v3-product-showcase/);
  assert.doesNotMatch(productBlock, /<Link[^>]*className=\{?`?v3-product-showcase/);
  assert.match(productBlock, /href: "\/v3\/products\/ai-core"/);
  assert.match(productBlock, /<Link\s+className=\{`v3-product-visual[\s\S]*?href=\{item\.href\}/);
});

test("v3 source does not include mojibake markers", () => {
  const files = [...collectTsxFiles("app/v3"), ...collectTsxFiles("components/v3")];
  const markers = ["�", "占", "?쒖", "硫"];

  for (const file of files) {
    const source = readFileSync(join(root, file), "utf8");
    for (const marker of markers) {
      assert.equal(source.includes(marker), false, `${file} contains mojibake marker ${marker}`);
    }
  }
});
