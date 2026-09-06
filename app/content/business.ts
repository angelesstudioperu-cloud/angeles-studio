/**
 * Datos verificados de la marca.
 *
 * Fuentes: Instagram @angelesstudio.pe, TikTok @angelesnails.studio, el enlace de
 * Google Maps y los datos confirmados directamente por el negocio.
 *
 * Lo que sigue marcado como `pending` continúa sin confirmar.
 */
export const business = {
  name: 'Ángeles Nails Salon',
  shortName: 'Ángeles',
  legalName: null, // pending: el negocio aún no cuenta con razón social ni RUC
  taxId: null,
  tagline: 'A mal tiempo, uñas lindas.',
  description:
    'Especialistas en uñas, pedicure spa y diseño de mirada en Los Olivos, Lima.',

  whatsappDigits: '51947117905',
  whatsappDisplay: '+51 947 117 905',
  email: 'angelesstudioperu@gmail.com',

  address: {
    street: 'Calle Los Olivos',
    area: 'Urb. Rosario del Norte',
    district: 'Los Olivos',
    city: 'Lima',
    postalCode: '15304',
    country: 'PE',
    // pending: número de puerta y referencia exacta del local
    streetNumberConfirmed: false,
  },
  geo: { lat: -11.981465, lng: -77.0800296 },
  mapsUrl: 'https://maps.app.goo.gl/EY7G6DYuxjgJGGQj6',

  hours: {
    opens: '10:00',
    closes: '20:00',
    display: '10:00 a.m. — 8:00 p.m.',
    /** pending: qué días de la semana abre. Hasta saberlo no publicamos los días. */
    daysConfirmed: false,
  },
  bookingPolicy: 'Con cita previa',

  social: {
    instagram: { url: 'https://www.instagram.com/angelesstudio.pe/', handle: '@angelesstudio.pe' },
    tiktok: { url: 'https://www.tiktok.com/@angelesnails.studio', handle: '@angelesnails.studio' },
  },
} as const;

export const whatsappUrl = `https://wa.me/${business.whatsappDigits}`;
export const emailUrl = `mailto:${business.email}`;

export const addressLines = [
  business.address.street,
  `${business.address.area} · ${business.address.district}`,
  `${business.address.city}, Perú`,
];

export const addressInline = `${business.address.street}, ${business.address.district}, ${business.address.city}`;

/** Abre WhatsApp con un mensaje ya redactado. */
export function whatsappLink(message: string) {
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}
