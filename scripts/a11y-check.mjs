import http from 'node:http';
import { spawn } from 'node:child_process';

const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}`;

const routes = [
  '/',
  '/services',
  '/services/web-dev',
  '/services/mobile-dev',
  '/services/ai-automation',
  '/services/cloud-devops',
  '/services/design-systems',
  '/work',
  '/work/studio-marketing-platform',
  '/about',
  '/contact',
];

function fetchHtml(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function waitForServer(retries = 30, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetchHtml('/');
      if (res.status === 200) return true;
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return false;
}

async function runAudit() {
  console.log('🚀 Starting Next.js test server for Accessibility & Landmark Audit...');
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
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

  console.log('✅ Server ready. Performing Accessibility & Landmark Rule Assertions...\n');

  let passedAssertions = 0;
  let failedAssertions = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✔ ${message}`);
      passedAssertions++;
    } else {
      console.error(`  ✖ FAIL: ${message}`);
      failedAssertions++;
    }
  }

  for (const route of routes) {
    console.log(`Testing route: ${route}`);
    const { status, html } = await fetchHtml(route);

    assert(status === 200, `[${route}] Status code is 200 OK`);
    assert(html.includes('<html lang="en"'), `[${route}] Document specifies <html lang="en">`);
    assert(html.includes('<a href="#main-content"'), `[${route}] Contains functional skip-to-content link`);
    assert(html.includes('id="main-content"'), `[${route}] Contains target main landmark (#main-content)`);
    assert(html.includes('<header role="banner"'), `[${route}] Contains landmark <header role="banner">`);
    assert(html.includes('<footer'), `[${route}] Contains landmark <footer>`);
    assert(html.includes('aria-label="Footer navigation"'), `[${route}] Contains labeled footer navigation landmark`);
    assert(html.includes('<h1'), `[${route}] Contains top-level h1 heading`);

    // Check all image tags for alt attributes
    const imgMatches = html.match(/<img[^>]*>/g) || [];
    let allImgsHaveAlt = true;
    for (const img of imgMatches) {
      if (!img.includes('alt=')) {
        allImgsHaveAlt = false;
        break;
      }
    }
    assert(allImgsHaveAlt, `[${route}] All images (${imgMatches.length}) have alt attributes`);

    // Subpage breadcrumbs check
    if (route !== '/') {
      assert(
        html.includes('aria-label="Breadcrumb"'),
        `[${route}] Subpage contains labeled breadcrumb navigation`
      );
    }

    // Contact form checks
    if (route === '/contact' || route === '/') {
      assert(html.includes('id="contact-name"'), `[${route}] Contact form has name input with ID`);
      assert(html.includes('id="contact-email"'), `[${route}] Contact form has email input with ID`);
      assert(html.includes('id="contact-message"'), `[${route}] Contact form has message textarea with ID`);
      assert(html.includes('aria-live="polite"'), `[${route}] Contact form has aria-live announcement region`);
      assert(html.includes('id="contact-topic"'), `[${route}] Topic selector has select input with ID`);
    }

    console.log('');
  }

  console.log('==========================================');
  console.log(`Results: ${passedAssertions} passed, ${failedAssertions} failed.`);

  cleanup();

  if (failedAssertions > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All Accessibility & Landmark Assertions passed successfully!\n');
    process.exit(0);
  }
}

runAudit();
