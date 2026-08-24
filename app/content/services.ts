export type ServiceCategory = 'unas' | 'lifting' | 'pestanas';

export type StudioService = {
  slug: string;
  category: ServiceCategory;
  name: string;
  shortName?: string;
  note: string;
  durationMinutes: number;
  priceFrom: number;
  featured?: boolean;
  addOn?: boolean;
};

export const categoryContent: Record<ServiceCategory, { label: string; intro: string }> = {
  unas: {
    label: 'Uñas',
    intro: 'Preparación cuidadosa, estructura ligera y acabados que se ven impecables de cerca.',
  },
  lifting: {
    label: 'Lifting',
    intro: 'Curvatura visible desde la raíz para abrir la mirada conservando una sensación natural.',
  },
  pestanas: {
    label: 'Pestañas',
    intro: 'Diseños personalizados según tu ojo, tu pestaña natural y cuánto mantenimiento deseas.',
  },
};

export const services: StudioService[] = [
  { slug: 'manicure-editorial', category: 'unas', name: 'Manicure editorial', note: 'Preparación, forma y color impecable', durationMinutes: 60, priceFrom: 65, featured: true },
  { slug: 'rubber-gel', category: 'unas', name: 'Rubber gel', note: 'Refuerzo flexible y brillo duradero', durationMinutes: 90, priceFrom: 105, featured: true },
  { slug: 'gel-x', category: 'unas', name: 'Gel X', note: 'Extensión ligera con acabado natural', durationMinutes: 120, priceFrom: 155, featured: true },
  { slug: 'nail-art-de-autor', category: 'unas', name: 'Nail art de autor', note: 'Detalle artístico que acompaña tu servicio', durationMinutes: 20, priceFrom: 25, addOn: true },
  { slug: 'lifting-esencial', category: 'lifting', name: 'Lifting esencial', shortName: 'Lifting de pestañas', note: 'Curvatura, definición y mirada abierta', durationMinutes: 75, priceFrom: 120, featured: true },
  { slug: 'lifting-tinte', category: 'lifting', name: 'Lifting + tinte', note: 'Curvatura y definición de color', durationMinutes: 85, priceFrom: 140 },
  { slug: 'lifting-ritual', category: 'lifting', name: 'Lifting ritual', note: 'Lifting, tinte y cuidado nutritivo', durationMinutes: 90, priceFrom: 160 },
  { slug: 'extensiones-clasicas', category: 'pestanas', name: 'Extensiones clásicas', shortName: 'Clásicas', note: 'Diseño pelo a pelo personalizado', durationMinutes: 120, priceFrom: 160, featured: true },
  { slug: 'efecto-humedo', category: 'pestanas', name: 'Efecto húmedo', note: 'Textura definida y ligera', durationMinutes: 135, priceFrom: 190 },
  { slug: 'volumen-ligero', category: 'pestanas', name: 'Volumen ligero', note: 'Textura suave y presencia medida', durationMinutes: 150, priceFrom: 220, featured: true },
  { slug: 'retoque-pestanas', category: 'pestanas', name: 'Retoque de extensiones', shortName: 'Retoque', note: 'Mantenimiento según evaluación', durationMinutes: 90, priceFrom: 110 },
];

export const featuredServices = services.filter((service) => service.featured);
export const bookableServices = services.filter((service) => !service.addOn);

export function formatDuration(minutes: number, addOn = false) {
  return `${addOn ? '+ ' : ''}${minutes} min`;
}

export function formatPrice(price: number) {
  return `Desde S/ ${price}`;
}
