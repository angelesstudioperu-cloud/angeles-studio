/**
 * Precios oficiales tomados de la lista de precios de Ángeles Nails Salon.
 *
 * `durationMinutes` son ESTIMACIONES provisionales pensadas para que la clienta
 * pueda calcular su tiempo. El salón las confirmará y hay que reemplazarlas.
 */

export type ServiceCategory = 'manos' | 'pies' | 'mirada';

export type StudioService = {
  slug: string;
  category: ServiceCategory;
  name: string;
  shortName?: string;
  note: string;
  priceFrom: number;
  /** Estimado provisional, pendiente de confirmación del salón. */
  durationMinutes: number;
  featured?: boolean;
};

export type Removal = {
  slug: string;
  name: string;
  price: number;
  durationMinutes: number;
};

export const categoryContent: Record<
  ServiceCategory,
  { label: string; title: string; intro: string; image: string; imageAlt: string; imageWidth: number; imageHeight: number }
> = {
  manos: {
    label: 'Manos',
    title: 'Uñas que se ven impecables de cerca',
    intro:
      'Esmaltado en gel y sistemas de extensión: preparación cuidadosa, estructura ligera y un acabado que aguanta el día a día.',
    image: '/images/servicio-manos.webp',
    imageAlt: 'Manicure nude con nail art delicado terminado en Ángeles Nails Salon',
    imageWidth: 1400,
    imageHeight: 937,
  },
  pies: {
    label: 'Pies',
    title: 'Pedicure con calma y con técnica',
    intro:
      'Desde la limpieza que ordena y devuelve comodidad hasta el acripie que aguanta semanas sin perder forma.',
    image: '/images/servicio-pies.webp',
    imageAlt: 'Sesión de pedicure spa en cabina',
    imageWidth: 1400,
    imageHeight: 2100,
  },
  mirada: {
    label: 'Mirada y cejas',
    title: 'Una mirada abierta, sin exagerar',
    intro:
      'Lifting, laminado, henna y depilación: definimos tu mirada respetando la forma natural de tu ceja y tu pestaña.',
    image: '/images/servicio-mirada.webp',
    imageAlt: 'Especialista trabajando el diseño de pestañas de una clienta',
    imageWidth: 1400,
    imageHeight: 934,
  },
};

export const services: StudioService[] = [
  // Manos
  { slug: 'esmaltado-en-gel', category: 'manos', name: 'Esmaltado en gel', note: 'Preparación, forma y color de larga duración sobre tu uña natural.', priceFrom: 30, durationMinutes: 60, featured: true },
  { slug: 'unas-polygel', category: 'manos', name: 'Uñas polygel', note: 'Extensión moldeable, ligera y resistente para largos medianos.', priceFrom: 50, durationMinutes: 120 },
  { slug: 'unas-acrilicas', category: 'manos', name: 'Uñas acrílicas', note: 'El sistema más firme: ideal si buscas largo y durabilidad.', priceFrom: 50, durationMinutes: 120, featured: true },
  { slug: 'unas-rubber', category: 'manos', name: 'Uñas rubber', note: 'Refuerzo flexible que protege la uña natural y da brillo.', priceFrom: 50, durationMinutes: 105 },
  { slug: 'unas-builder-gel', category: 'manos', name: 'Uñas builder gel', note: 'Estructura de gel para nivelar y fortalecer sin peso extra.', priceFrom: 50, durationMinutes: 105 },
  { slug: 'unas-soft-gel', category: 'manos', name: 'Uñas soft gel', note: 'Tips preformados de acabado natural y aplicación rápida.', priceFrom: 50, durationMinutes: 90, featured: true },

  // Pies
  { slug: 'pedicure-spa-en-gel', category: 'pies', name: 'Pedicure spa en gel', note: 'Limpieza completa, cuidado de cutícula y esmaltado en gel.', priceFrom: 40, durationMinutes: 75, featured: true },
  { slug: 'acripie', category: 'pies', name: 'Acripie', note: 'Refuerzo acrílico en pies para un acabado firme y parejo.', priceFrom: 60, durationMinutes: 120 },
  { slug: 'solo-limpieza', category: 'pies', name: 'Solo limpieza', note: 'Higiene, corte y cuidado de cutícula sin esmaltado.', priceFrom: 20, durationMinutes: 45 },

  // Mirada y cejas
  { slug: 'lifting-de-pestanas', category: 'mirada', name: 'Lifting de pestañas', note: 'Curvatura desde la raíz para abrir la mirada de forma natural.', priceFrom: 35, durationMinutes: 60, featured: true },
  { slug: 'laminado-de-cejas', category: 'mirada', name: 'Laminado de cejas', note: 'Peinado y fijado que ordena la ceja y le da volumen.', priceFrom: 20, durationMinutes: 45 },
  { slug: 'pigmentacion-con-henna', category: 'mirada', name: 'Pigmentación con henna', note: 'Color y definición temporal que rellena zonas sin vello.', priceFrom: 30, durationMinutes: 40 },
  { slug: 'depilacion-de-cejas', category: 'mirada', name: 'Depilación de cejas', note: 'Diseño de forma según tu rostro y tu crecimiento natural.', priceFrom: 15, durationMinutes: 20 },
  { slug: 'depilacion-de-bozo', category: 'mirada', name: 'Depilación de bozo', note: 'Retiro rápido y prolijo del vello del labio superior.', priceFrom: 10, durationMinutes: 10 },
  { slug: 'depilacion-de-rostro', category: 'mirada', name: 'Depilación de rostro', note: 'Limpieza completa de vello facial en una sola sesión.', priceFrom: 30, durationMinutes: 30 },
];

export const removals: Removal[] = [
  { slug: 'retiro-esmaltado-gel', name: 'Esmaltado en gel · manos o pies', price: 10, durationMinutes: 15 },
  { slug: 'retiro-acrilico-polygel', name: 'Uñas acrílicas / uñas polygel', price: 15, durationMinutes: 20 },
  { slug: 'retiro-gel-estructural', name: 'Uñas rubber gel / builder gel / soft gel', price: 20, durationMinutes: 25 },
];

export const categories: ServiceCategory[] = ['manos', 'pies', 'mirada'];

export const featuredServices = services.filter((service) => service.featured);

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((service) => service.category === category);
}

export function formatPrice(price: number) {
  return `Desde S/ ${price}`;
}

export function formatFlatPrice(price: number) {
  return `S/ ${price}`;
}

/** Duración aproximada; el salón confirma el tiempo real al reservar. */
export function formatDuration(minutes: number) {
  if (minutes < 60) return `aprox. ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `aprox. ${hours} h ${rest} min` : `aprox. ${hours} h`;
}
