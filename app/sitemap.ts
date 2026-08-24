import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return ['', '/privacidad', '/terminos', '/libro-de-reclamaciones'].map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date('2026-08-23'),
    changeFrequency: path ? 'yearly' : 'weekly',
    priority: path ? 0.3 : 1,
  }));
}
