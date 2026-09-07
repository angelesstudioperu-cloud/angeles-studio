import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Montserrat } from 'next/font/google';
import { business } from './content/business';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});
const sans = Montserrat({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600'] });
// Geométrica de trazo fino: es la que más se acerca al lettering del logo.
const brand = Jost({ variable: '--font-brand', subsets: ['latin'], weight: ['300', '400'] });

const title = `${business.name} | Uñas, pedicure y diseño de mirada en Los Olivos`;
const description = `${business.description} Esmaltado en gel desde S/ 30, pedicure spa desde S/ 40 y lifting de pestañas desde S/ 35.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: title, template: `%s | ${business.name}` },
  description,
  applicationName: business.name,
  robots: process.env.SITE_LAUNCH_READY === 'true' ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [{ url: '/favicon.png', sizes: '64x64', type: 'image/png' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: business.name,
    title,
    description,
    type: 'website',
    locale: 'es_PE',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${business.name} — uñas, pedicure y mirada` }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F3F1' },
    { media: '(prefers-color-scheme: dark)', color: '#344C3D' },
  ],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: business.name,
  description: business.description,
  image: '/og.png',
  telephone: `+${business.whatsappDigits}`,
  email: business.email,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${business.address.street}, ${business.address.unit}, ${business.address.area}`,
    addressLocality: business.address.district,
    addressRegion: business.address.city,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.mapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: business.hours.schemaDays,
      opens: business.hours.opens,
      closes: business.hours.closes,
    },
  ],
  sameAs: [business.social.instagram.url, business.social.tiktok.url],
  priceRange: 'S/ 10 — S/ 60',
  areaServed: 'Lima, Perú',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <head>
        <link rel="preload" as="image" href="/images/angeles-nails-hero.webp" type="image/webp" />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${brand.variable}`}>{children}</body>
    </html>
  );
}
