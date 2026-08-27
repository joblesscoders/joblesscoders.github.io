import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const NEXT_DIR = path.resolve(process.cwd(), ".next");

function getGzipSize(content) {
  return zlib.gzipSync(content).length;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function runBundleAnalysis() {
  console.log("📦 Running Route & Dependency Bundle Analysis...\n");

  const buildManifestPath = path.join(NEXT_DIR, "build-manifest.json");
  const appBuildManifestPath = path.join(NEXT_DIR, "app-build-manifest.json");

  if (!fs.existsSync(appBuildManifestPath) || !fs.existsSync(buildManifestPath)) {
    console.error("❌ Build manifests not found in .next. Run `npm run build` first.");
    process.exit(1);
  }

  const appManifest = JSON.parse(fs.readFileSync(appBuildManifestPath, "utf-8"));
  const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, "utf-8"));

  const chunkSizes = new Map();

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".css"))) {
        const content = fs.readFileSync(fullPath);
        const relPath = path.relative(path.join(NEXT_DIR, "static"), fullPath).replace(/\\/g, "/");
        chunkSizes.set(`static/${relPath}`, {
          raw: content.length,
          gzip: getGzipSize(content),
          file: entry.name,
        });
      }
    }
  }

  scanDir(path.join(NEXT_DIR, "static"));

  console.log("================================================================================");
  console.log("ROUTE BUNDLE BUDGET AUDIT (Shared Framework + Route Specific)");
  console.log("================================================================================");
  console.log(
    "Route".padEnd(35) +
      "Raw JS/CSS".padEnd(16) +
      "Gzipped (Est)".padEnd(16) +
      "Budget (<=150KB Gzip)"
  );
  console.log("-".repeat(80));

  const routeResults = [];

  for (const [route, files] of Object.entries(appManifest.pages || {})) {
    let totalRaw = 0;
    let totalGzip = 0;
    const uniqueFiles = Array.from(new Set(files));

    for (const f of uniqueFiles) {
      const sizeInfo = chunkSizes.get(f);
      if (sizeInfo) {
        totalRaw += sizeInfo.raw;
        totalGzip += sizeInfo.gzip;
      }
    }

    const budgetPass = totalGzip <= 150 * 1024;
    const status = budgetPass ? "✔ PASS" : "✖ EXCEEDS";

    const displayRoute = route === "/page" ? "/" : route.replace(/\/page$/, "");
    console.log(
      displayRoute.padEnd(35) +
        formatBytes(totalRaw).padEnd(16) +
        formatBytes(totalGzip).padEnd(16) +
        status
    );

    routeResults.push({
      route: displayRoute,
      rawBytes: totalRaw,
      gzipBytes: totalGzip,
      pass: budgetPass,
    });
  }

  console.log("\n================================================================================");
  console.log("SHARED FRAMEWORK & HEAVIEST CHUNKS BREAKDOWN");
  console.log("================================================================================");
  const sortedChunks = Array.from(chunkSizes.entries()).sort((a, b) => b[1].raw - a[1].raw);
  for (const [file, info] of sortedChunks.slice(0, 10)) {
    console.log(`  • ${file.padEnd(50)}: ${formatBytes(info.raw).padEnd(10)} (Gzip: ${formatBytes(info.gzip)})`);
  }

  console.log("\n✅ Bundle analysis complete.\n");
  return { routeResults, chunkSizes };
}

runBundleAnalysis();
