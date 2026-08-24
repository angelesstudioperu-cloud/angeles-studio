export type SecurityHeader = { key: string; value: string };

const directives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
] as const;

const scriptDirective = "script-src 'self' 'unsafe-inline'";
const connectDirective = "connect-src 'self'";

export function buildContentSecurityPolicy({ allowUnsafeEval = false } = {}) {
  return directives.map((directive) => {
    if (directive === scriptDirective && allowUnsafeEval) return `${directive} 'unsafe-eval'`;
    if (directive === connectDirective && allowUnsafeEval) return `${directive} ws: wss:`;
    return directive;
  }).join('; ');
}

export function securityHeaders({ allowUnsafeEval = false } = {}): SecurityHeader[] {
  return [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
    { key: 'Content-Security-Policy', value: buildContentSecurityPolicy({ allowUnsafeEval }) },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  ];
}

export function renderCloudflareHeadersFile() {
  const global = ['/*', ...securityHeaders().map(({ key, value }) => `  ${key}: ${value}`)].join('\n');
  const immutable = ['/_next/static/*', '  Cache-Control: public, max-age=31536000, immutable'].join('\n');
  const images = ['/images/*', '  Cache-Control: public, max-age=86400'].join('\n');
  return `${global}\n\n${immutable}\n\n${images}\n`;
}
