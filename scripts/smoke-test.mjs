import { spawn } from "node:child_process";
import http from "node:http";

// Service & project slugs
const SERVICES = [
  "web-dev",
  "mobile-dev",
  "ai-automation",
  "cloud-devops",
  "design-systems",
];

const PUBLISHED_PROJECTS = ["studio-marketing-platform"];
const DRAFT_PROJECTS = ["enterprise-rag-assistant"];

function fetchRoute(port, path) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        hostname: "127.0.0.1",
        port,
        path,
        headers: {
          "User-Agent": "SmokeTestRunner/1.0",
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${path}`));
    });
  });
}

async function runSmokeTests() {
  console.log("🚀 Starting Next.js test server...");
  const port = 3892;

  const server = spawn("npx", ["next", "start", "-p", String(port)], {
    shell: true,
    stdio: "pipe",
  });

  let serverReady = false;

  server.stdout.on("data", (data) => {
    const msg = data.toString();
    if (msg.includes("Ready in") || msg.includes("started server on") || msg.includes(`http://localhost:${port}`)) {
      serverReady = true;
    }
  });

  server.stderr.on("data", (data) => {
    // stderr
  });

  // Wait up to 25s for server to start
  for (let i = 0; i < 50; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetchRoute(port, "/");
      if (res.statusCode === 200) {
        serverReady = true;
        break;
      }
    } catch {
      // server not ready yet
    }
  }

  if (!serverReady) {
    console.error("❌ Failed to start Next.js server");
    server.kill();
    process.exit(1);
  }

  console.log("✅ Next.js server is ready. Running route assertions...\n");

  const routesToTest = [
    { path: "/", expectedStatus: 200, name: "Homepage" },
    { path: "/services", expectedStatus: 200, name: "Services Index", hasBreadcrumbs: true },
    { path: "/work", expectedStatus: 200, name: "Work Index", hasBreadcrumbs: true },
    { path: "/about", expectedStatus: 200, name: "About Page", hasBreadcrumbs: true },
    { path: "/contact", expectedStatus: 200, name: "Contact Page", hasBreadcrumbs: true },
    { path: "/sitemap.xml", expectedStatus: 200, name: "Sitemap XML" },
    { path: "/robots.txt", expectedStatus: 200, name: "Robots TXT" },
  ];

  // Add all services
  for (const slug of SERVICES) {
    routesToTest.push({
      path: `/services/${slug}`,
      expectedStatus: 200,
      name: `Service Detail (${slug})`,
      hasBreadcrumbs: true,
    });
  }

  // Add published projects
  for (const slug of PUBLISHED_PROJECTS) {
    routesToTest.push({
      path: `/work/${slug}`,
      expectedStatus: 200,
      name: `Project Detail (${slug})`,
      hasBreadcrumbs: true,
    });
  }

  // Add draft projects (MUST return 404)
  for (const slug of DRAFT_PROJECTS) {
    routesToTest.push({
      path: `/work/${slug}`,
      expectedStatus: 404,
      name: `Draft Project 404 Guard (${slug})`,
    });
  }

  // Add invalid paths (MUST return 404)
  routesToTest.push(
    { path: "/services/non-existent-service-123", expectedStatus: 404, name: "Invalid Service 404" },
    { path: "/work/non-existent-work-456", expectedStatus: 404, name: "Invalid Work 404" }
  );

  let failed = 0;

  for (const test of routesToTest) {
    try {
      const res = await fetchRoute(port, test.path);
      const passStatus = res.statusCode === test.expectedStatus;

      let passBreadcrumbs = true;
      if (test.hasBreadcrumbs) {
        passBreadcrumbs = res.body.includes('aria-label="Breadcrumb"');
      }

      let passDraftNotInSitemap = true;
      if (test.path === "/sitemap.xml") {
        for (const draft of DRAFT_PROJECTS) {
          if (res.body.includes(draft)) {
            passDraftNotInSitemap = false;
          }
        }
      }

      const passed = passStatus && passBreadcrumbs && passDraftNotInSitemap;

      if (passed) {
        console.log(`  ✔ [${res.statusCode}] ${test.name} -> ${test.path}`);
      } else {
        failed++;
        console.error(
          `  ✖ FAIL: ${test.name} (${test.path}) - Expected Status ${test.expectedStatus}, got ${res.statusCode}. Breadcrumbs: ${passBreadcrumbs}, SitemapDraftSafe: ${passDraftNotInSitemap}`
        );
      }
    } catch (err) {
      failed++;
      console.error(`  ✖ ERROR: ${test.name} (${test.path}) - ${err.message}`);
    }
  }

  server.kill();

  console.log("\n==========================================");
  if (failed === 0) {
    console.log(`🎉 All ${routesToTest.length} route assertions passed successfully!`);
    process.exit(0);
  } else {
    console.error(`❌ ${failed} / ${routesToTest.length} test assertions failed.`);
    process.exit(1);
  }
}

runSmokeTests();
