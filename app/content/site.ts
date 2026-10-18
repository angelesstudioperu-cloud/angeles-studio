/** Una sola URL pública para canonical, sitemap y datos estructurados. */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteOrigin = new URL(configured || 'https://angeles-studio.angelesstudioperu.workers.dev').origin;
export const siteLaunchReady = process.env.SITE_LAUNCH_READY === 'true';
export const absoluteUrl = (path = '/') => new URL(path, `${siteOrigin}/`).href;
