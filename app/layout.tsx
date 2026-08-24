import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'],
});
const sans = Montserrat({
  variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Ángeles Studio | Uñas, lifting y pestañas en Lima',
  description: 'Uñas, lifting y pestañas con precisión editorial en un beauty studio de Lima.',
  robots: process.env.SITE_LAUNCH_READY === 'true' ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: 'Ángeles Studio | Uñas, lifting y pestañas en Lima',
    description: 'Uñas, lifting y pestañas con precisión editorial en un beauty studio de Lima.',
    type: 'website',
    locale: 'es_PE',
    images: [{ url: '/og.png', width: 1734, height: 907, alt: 'Ángeles Studio — Belleza de autor en Lima' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ángeles Studio | Uñas, lifting y pestañas en Lima',
    description: 'Uñas, lifting y pestañas con precisión editorial en un beauty studio de Lima.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-PE"><head><link rel="preload" as="image" href="/images/angeles-nails-hero.webp" type="image/webp" /></head><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
