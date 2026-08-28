import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

console.log("🔍 Running automated visibility & reveal engine regression checks...\n");

const srcDir = path.resolve(process.cwd(), "src");

// 1. Verify no component contains raw gsap.from() that causes hidden pre-animation states
const auditedComponents = [
  "components/homepage/hero.tsx",
  "components/homepage/WorkSection.tsx",
  "components/homepage/ServicesSection.tsx",
  "components/homepage/ProcessSection.tsx",
  "components/homepage/ProofSection.tsx",
  "components/homepage/FaqSection.tsx",
  "components/homepage/techSection.tsx",
  "components/homepage/teamSection.tsx",
  "components/homepage/contactSection.tsx",
  "components/homepage/SolutionsOverviewSection.tsx",
  "components/layout/CtaSection.tsx",
];

for (const compPath of auditedComponents) {
  const fullPath = path.join(srcDir, compPath);
  assert(fs.existsSync(fullPath), `File must exist: ${compPath}`);
  const content = fs.readFileSync(fullPath, "utf8");

  // Check for gsap.from() on scroll triggers
  assert(
    !content.includes("gsap.from("),
    `FAIL: ${compPath} contains raw gsap.from() which causes stuck opacity:0 states during hydration!`
  );

  // Check that useGSAPReveal or timeline fromTo is used
  const usesRevealHook = content.includes("useGSAPReveal") || content.includes("timeline");
  assert(
    usesRevealHook,
    `FAIL: ${compPath} must use unified useGSAPReveal or a safe scoped timeline!`
  );

  console.log(`  ✓ ${compPath} passes zero-hidden pre-animation state check`);
}

// 2. Verify all 6 solution routes exist with valid exports
const solutionRoutes = [
  "app/solutions/page.tsx",
  "app/solutions/ecommerce/page.tsx",
  "app/solutions/portfolio-websites/page.tsx",
  "app/solutions/saas-mvp/page.tsx",
  "app/solutions/business-platforms/page.tsx",
  "app/solutions/ai-automation/page.tsx",
  "app/solutions/mobile-apps/page.tsx",
];

for (const solPath of solutionRoutes) {
  const fullPath = path.join(srcDir, solPath);
  assert(fs.existsSync(fullPath), `Solution route must exist: ${solPath}`);
  const content = fs.readFileSync(fullPath, "utf8");
  assert(content.includes("export default function"), `Solution route must have default export: ${solPath}`);
  assert(content.includes("BreadcrumbList"), `Solution route must contain BreadcrumbList schema: ${solPath}`);
  console.log(`  ✓ ${solPath} exists and includes SEO BreadcrumbList schema`);
}

console.log("\n✅ All automated visibility & reveal engine regression checks passed successfully!");
