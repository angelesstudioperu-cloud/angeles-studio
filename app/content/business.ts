/**
 * Datos verificados de la marca.
 *
 * Fuentes: Instagram @angelesstudio.pe, TikTok @angelesnails.studio, el enlace de
 * Google Maps y los datos confirmados directamente por el negocio.
 *
 * Lo que sigue marcado como `pending` continúa sin confirmar.
 */
export const business = {
  name: 'Angeles Studio',
  shortName: 'Angeles',
  legalName: null, // pending: identidad del proveedor no documentada
  taxId: null, // El negocio confirmó que aún no tiene RUC; no publicar uno ficticio.
  tagline: 'A mal tiempo, uñas lindas.',
  description:
    'Especialistas en uñas, pedicure spa y diseño de mirada en Los Olivos, Lima.',

  whatsappDigits: '51947117905',
  whatsappDisplay: '+51 947 117 905',
  email: 'angelesstudioperu@gmail.com',

  // Ubicación y primer piso confirmados por el negocio el 18/10/2026.
  // La numeración de Street View no confirma el número de puerta: no reutilizar 66/64/63.
  address: {
    street: 'Calle Los Olivos',
    unit: 'Primer piso',
    area: 'Urb. Rosario del Norte',
    district: 'Los Olivos',
    city: 'Lima',
    postalCode: '15304',
    country: 'PE',
  },
  // Punto inferior señalado por el negocio en el mapa el 18/10/2026.
  geo: { lat: -11.981506, lng: -77.079941 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-11.981506%2C-77.079941',
  streetViewUrl: 'https://maps.app.goo.gl/hgXztzrzmQxh5mCS6',
  locationReference: 'Primer piso, local con letrero rosado Angeles Studio.',

  hours: {
    opens: '10:00',
    closes: '20:30',
    display: '10:00 a.m. — 8:30 p.m.',
    days: 'Lunes a sábado',
    daysShort: 'Lun — Sáb',
    closed: 'Domingos cerrado',
    /** Días de la semana en el vocabulario de schema.org, para los datos estructurados. */
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  bookingPolicy: 'Con cita previa',
  /** Confirmado por el salón. */
  yearsOfExperience: 3,
  /** Adelanto que se paga al reservar; se descuenta del total del servicio. */
  bookingDeposit: 10,

  social: {
    facebook: { url: 'https://www.facebook.com/profile.php?id=61550200861127', handle: 'Angeles Studio Nails' },
    instagram: { url: 'https://www.instagram.com/angelesstudio.pe/', handle: '@angelesstudio.pe' },
    tiktok: { url: 'https://www.tiktok.com/@angelesnails.studio', handle: '@angelesnails.studio' },
  },
} as const;

export const whatsappUrl = `https://wa.me/${business.whatsappDigits}`;
export const emailUrl = `mailto:${business.email}`;

export const addressLines = [
  `${business.address.street} · ${business.address.unit}`,
  `${business.address.area} · ${business.address.district}`,
  `${business.address.city}, Perú`,
];

export const addressInline = `${business.address.street}, ${business.address.unit}, ${business.address.district}, ${business.address.city}`;

/** «Lunes a sábado · 10:00 a.m. — 8:30 p.m.» */
export const hoursLine = `${business.hours.days} · ${business.hours.display}`;

/** Abre WhatsApp con un mensaje ya redactado. */
export function whatsappLink(message: string) {
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}
