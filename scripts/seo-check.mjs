import http from 'node:http';
import { spawn } from 'node:child_process';

const PORT = 3003;
const BASE_URL = `http://localhost:${PORT}`;

const routes = [
  { path: '/', expectedType: 'WebSite', expectedH1: 'Senior Engineering Collective' },
  { path: '/solutions', expectedType: 'CollectionPage', expectedH1: 'Solutions Engineered for Specific Growth Milestones' },
  { path: '/services', expectedType: 'CollectionPage', expectedH1: 'What We Build & Deliver' },
  { path: '/services/web-dev', expectedType: 'Service', expectedH1: 'Full-Stack Web Development' },
  { path: '/services/mobile-dev', expectedType: 'Service', expectedH1: 'Mobile App Development' },
  { path: '/services/ai-automation', expectedType: 'Service', expectedH1: 'AI & Machine Learning' },
  { path: '/services/cloud-devops', expectedType: 'Service', expectedH1: 'Cloud & DevOps Solutions' },
  { path: '/services/design-systems', expectedType: 'Service', expectedH1: 'UI/UX & Design Systems' },
  { path: '/work', expectedType: 'CollectionPage', expectedH1: 'Real Systems Built for Real Performance' },
  { path: '/work/studio-marketing-platform', expectedType: 'Article', expectedH1: 'Studio Marketing Platform' },
  { path: '/about', expectedType: 'AboutPage', expectedH1: 'An Engineering Collective Built for High-Impact Software' },
  { path: '/contact', expectedType: 'ContactPage', expectedH1: 'What Happens After You Reach Out' },
];

function fetchContent(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function waitForServer(retries = 30, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetchContent('/');
      if (res.status === 200) return true;
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return false;
}

async function runSeoAudit() {
  console.log('🚀 Starting Next.js test server for Technical & On-Page SEO Audit...');
  const server = spawn('npx', ['next', 'start', '-H', '127.0.0.1', '-p', String(PORT)], {
    stdio: 'ignore',
    shell: true,
  });

  const cleanup = () => {
    try {
      server.kill();
    } catch {}
  };

  process.on('exit', cleanup);
  process.on('SIGINT', cleanup);

  const isReady = await waitForServer();
  if (!isReady) {
    console.error('❌ Failed to start test server.');
    cleanup();
    process.exit(1);
  }

  console.log('✅ Server ready. Performing Technical SEO Assertions...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✔ ${message}`);
      passed++;
    } else {
      console.error(`  ✖ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Robots.txt check
  console.log('Testing /robots.txt');
  const robotsRes = await fetchContent('/robots.txt');
  assert(robotsRes.status === 200, '[/robots.txt] Status is 200 OK');
  assert(robotsRes.body.toLowerCase().includes('disallow: /api/'), '[/robots.txt] Disallows /api/');
  assert(robotsRes.body.toLowerCase().includes('sitemap:'), '[/robots.txt] Specifies sitemap location');
  console.log('');

  // 2. Sitemap.xml check
  console.log('Testing /sitemap.xml');
  const sitemapRes = await fetchContent('/sitemap.xml');
  assert(sitemapRes.status === 200, '[/sitemap.xml] Status is 200 OK');
  assert(!sitemapRes.body.includes('enterprise-rag-assistant'), '[/sitemap.xml] Excludes draft projects');
  assert(sitemapRes.body.includes('/services/web-dev'), '[/sitemap.xml] Includes public services');
  assert(sitemapRes.body.includes('/solutions'), '[/sitemap.xml] Includes solutions overview');
  assert(sitemapRes.body.includes('/work/studio-marketing-platform'), '[/sitemap.xml] Includes published work');
  console.log('');

  // 3. Route metadata & structured data check
  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();

  for (const item of routes) {
    console.log(`Auditing SEO for: ${item.path}`);
    const { status, body } = await fetchContent(item.path);

    assert(status === 200, `[${item.path}] Status 200 OK`);

    // Title tag
    const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';
    assert(title.length > 10, `[${item.path}] Title exists: "${title}"`);
    assert(!titles.has(title), `[${item.path}] Title is globally unique`);
    titles.add(title);

    // Meta description
    const descMatch = body.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const desc = descMatch ? descMatch[1] : '';
    assert(desc.length > 20, `[${item.path}] Description exists: "${desc.slice(0, 50)}..."`);
    assert(!descriptions.has(desc), `[${item.path}] Description is globally unique`);
    descriptions.add(desc);

    // Canonical tag
    const canonicalMatch = body.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : '';
    assert(canonical.length > 0, `[${item.path}] Canonical tag exists: "${canonical}"`);
    assert(!canonicals.has(canonical), `[${item.path}] Canonical is self-referencing and unique`);
    canonicals.add(canonical);

    // OpenGraph & Twitter
    assert(body.includes('property="og:title"') || body.includes('property="og:site_name"'), `[${item.path}] OpenGraph tags present`);
    assert(body.includes('name="twitter:card"'), `[${item.path}] Twitter card tag present`);

    // Primary H1 Heading
    const h1Matches = body.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    assert(h1Matches.length === 1, `[${item.path}] Exactly one <h1> heading present`);

    // JSON-LD Structured Data
    const jsonLdMatches = body.match(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    assert(jsonLdMatches.length > 0, `[${item.path}] Contains JSON-LD structured data (${jsonLdMatches.length} schemas)`);

    let foundExpectedType = false;
    for (const tag of jsonLdMatches) {
      const rawJson = tag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
      try {
        const parsed = JSON.parse(rawJson);
        if (parsed['@type'] === item.expectedType || parsed['@type'] === 'Organization') {
          foundExpectedType = true;
        }
      } catch (err) {
        console.error(`Invalid JSON-LD on ${item.path}:`, err);
      }
    }
    assert(foundExpectedType, `[${item.path}] JSON-LD contains expected @type "${item.expectedType}"`);

    console.log('');
  }

  console.log('==========================================');
  console.log(`SEO Audit Results: ${passed} passed, ${failed} failed.`);

  cleanup();

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All Technical & On-Page SEO Assertions passed successfully!\n');
    process.exit(0);
  }
}

runSeoAudit();
