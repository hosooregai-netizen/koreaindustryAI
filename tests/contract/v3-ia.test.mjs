import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const v3Site = readFileSync(join(root, "components/v3/v3-site.tsx"), "utf8");

const plannedRoutes = [
  "app/v3/page.tsx",
  "app/v3/products/page.tsx",
  "app/v3/products/ai-core/page.tsx",
  "app/v3/community/newsletter/page.tsx",
  "app/v3/community/blog/page.tsx",
  "app/v3/community/threads/page.tsx",
  "app/v3/company/page.tsx",
  "app/v3/contact/page.tsx",
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

test("all planned v3 routes have page files", () => {
  for (const route of plannedRoutes) {
    assert.equal(existsSync(join(root, route)), true, `${route} should exist`);
  }
});

test("header navigation exposes the AI-Core centered IA", () => {
  for (const label of ["Products", "Community", "Company", "시작하기"]) {
    assert.match(v3Site, new RegExp(label), `${label} should be present`);
  }

  const navBlock = v3Site.match(/export const navItems[\s\S]*?export const industryWordmarks/)?.[0] ?? "";

  assert.match(navBlock, /label: "AI-Core"/);
  assert.match(navBlock, /href: "\/v3\/products\/ai-core"/);
  assert.doesNotMatch(navBlock, /label: "AI Apps"/);
  assert.doesNotMatch(navBlock, /label: "Tools"/);
  assert.doesNotMatch(navBlock, /href: "\/v3\/products\/ai-apps"/);
  assert.doesNotMatch(navBlock, /href: "\/v3\/products\/tools"/);

  for (const href of [
    "/v3/community/newsletter",
    "/v3/community/blog",
    "/v3/community/threads",
    "/v3/company",
    "/v3/contact",
  ]) {
    assert.match(navBlock, new RegExp(href.replaceAll("/", "\\/")), `${href} should be linked`);
  }
});

test("industry wordmark contract is present", () => {
  for (const wordmark of ["볼넛", "K-Finance", "한국종합안전 ANC", "마켓컬리"]) {
    assert.match(v3Site, new RegExp(wordmark), `${wordmark} should be present`);
  }
});

test("start and YouTube actions use the coming soon modal", () => {
  assert.match(v3Site, /setModal\("시작하기"\)/);
  assert.match(v3Site, /label: "YouTube"/);
  assert.match(v3Site, /modal: true/);
  assert.match(v3Site, /MVP 시작하기 페이지를 준비하고 있어요/);
  assert.match(v3Site, /YouTube 콘텐츠를 준비하고 있어요/);
});

test("hero includes video source and image fallback", () => {
  assert.match(v3Site, /\/v3\/hero-video\.mp4/);
  assert.match(v3Site, /\/v3\/industrial-ai-hero\.png/);
  assert.match(v3Site, /data-video-state/);
  assert.match(v3Site, /image-fallback/);
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
