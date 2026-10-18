/** Read-only deployment checks. Pass the final origin after migrating domains. */
const origin = new URL(process.argv[2] || 'https://angeles-studio.angelesstudioperu.workers.dev').origin;
if (!origin.startsWith('https://')) throw new Error('Use an HTTPS public origin.');

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const normalize = (url) => new URL(url).href.replace(/\/$/, '');
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
const meta = (html, name) => tags(html, 'meta').find((tag) => attribute(tag, 'name')?.toLowerCase() === name);

async function read(path) {
  const url = new URL(path, `${origin}/`);
  if (url.origin !== origin) throw new Error(`Unexpected external URL: ${url.origin}`);
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15_000) });
  check(response.status === 200, `${url.pathname}: HTTP ${response.status}`);
  return { response, body: await response.text() };
}

function checkHeaders(response, path) {
  const csp = response.headers.get('content-security-policy') || '';
  check(csp.includes("frame-ancestors 'none'"), `${path}: frame protection missing`);
  check(csp.includes("object-src 'none'"), `${path}: object protection missing`);
  check(!csp.includes("'unsafe-eval'"), `${path}: unsafe-eval enabled in production`);
  check(response.headers.get('x-content-type-options') === 'nosniff', `${path}: nosniff missing`);
  check(response.headers.get('x-frame-options') === 'DENY', `${path}: X-Frame-Options missing`);
  check(/max-age=\d+/.test(response.headers.get('strict-transport-security') || ''), `${path}: HSTS missing`);
}

const { body: robots } = await read('/robots.txt');
check(!/^Disallow:\s*\/\s*$/im.test(robots), 'robots.txt blocks the entire site');
check(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'robots.txt sitemap does not match the public origin');

const { body: sitemap } = await read('/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
check(urls.length > 0 && urls.length <= 100, `Unexpected sitemap size: ${urls.length}`);
check(new Set(urls).size === urls.length, 'Duplicate sitemap URLs');
check(!urls.some((url) => new URL(url).pathname === '/libro-de-reclamaciones'), 'Pending complaints book must not be in sitemap');
if (urls.length > 100) throw new Error('Refusing an unexpectedly large crawl.');

let pageCount = 0;
for (let offset = 0; offset < urls.length; offset += 3) {
  await Promise.all(urls.slice(offset, offset + 3).map(async (url) => {
    const path = new URL(url).pathname;
    try {
      const { response, body } = await read(url);
      checkHeaders(response, path);
      check(response.headers.get('content-type')?.includes('text/html'), `${path}: HTML response missing`);
      check(/<title>[^<]+<\/title>/i.test(body), `${path}: title missing`);
      check(/<h1\b/i.test(body), `${path}: h1 missing`);
      check(Boolean(attribute(meta(body, 'description') || '', 'content')?.trim()), `${path}: description missing`);
      const canonical = tags(body, 'link').find((tag) => attribute(tag, 'rel') === 'canonical');
      const href = attribute(canonical || '', 'href');
      check(Boolean(href) && normalize(href) === normalize(url), `${path}: canonical mismatch`);
      const robotsDirective = `${attribute(meta(body, 'robots') || '', 'content') || ''} ${response.headers.get('x-robots-tag') || ''}`;
      check(!/\bnoindex\b/i.test(robotsDirective), `${path}: sitemap page is noindex`);
      pageCount += 1;
      console.log(`${response.status} ${path}`);
    } catch (error) {
      failures.push(`${path}: ${error.message}`);
    }
  }));
}

const { body: complaints, response: complaintsResponse } = await read('/libro-de-reclamaciones');
checkHeaders(complaintsResponse, '/libro-de-reclamaciones');
check(/\bnoindex\b/i.test(attribute(meta(complaints, 'robots') || '', 'content') || ''), 'Pending complaints page must remain noindex');
check(!/<form\b/i.test(complaints), 'Pending complaints page unexpectedly contains a form');
check(complaints.includes('El formulario todavía no está habilitado'), 'Pending complaints notice missing');

if (failures.length) {
  console.error(`\nFAILED: ${failures.length} checks\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`\nPASS: ${pageCount} sitemap pages, robots, canonical URLs, security headers and pending complaints page.`);
  console.log('This does not prove Google indexing, legal compliance, accessibility or real-user performance.');
}
