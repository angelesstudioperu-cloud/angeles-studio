import type { MetadataRoute } from 'next';
import { absoluteUrl, siteLaunchReady } from './content/site';

export default function robots(): MetadataRoute.Robots {
  if (!siteLaunchReady) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
