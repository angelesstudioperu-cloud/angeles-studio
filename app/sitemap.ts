import type { MetadataRoute } from 'next';
import { services, servicePath } from './content/services';

const routes = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' as const },
  ...services.map((service) => ({ path: servicePath(service.slug), priority: 0.8, changeFrequency: 'monthly' as const })),
  { path: '/galeria', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/nosotros', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/contacto', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/reservar', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/privacidad', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/terminos', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/libro-de-reclamaciones', priority: 0.2, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const lastModified = new Date('2026-09-05');
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
