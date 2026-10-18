import type { ServiceCategory } from './services';

export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  tag: ServiceCategory;
};

/**
 * Imágenes referenciales de inspiración (Pexels); no representan trabajos del salón.
 * Ver `docs/creditos-imagenes.md`.
 */
export const gallery: GalleryItem[] = [
  { src: '/images/galeria/nailart-flor.webp', width: 1000, height: 667, tag: 'manos', caption: 'Esmaltado en gel · rosa suave', alt: 'Mano con esmaltado en gel rosa sosteniendo una flor' },
  { src: '/images/galeria/manos-proceso.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Inspiración de color', alt: 'Manicura de referencia con distintos tonos de esmalte' },
  { src: '/images/galeria/nailart-glitter.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Glitter sobre base nude', alt: 'Uñas rosas con glitter y anillo plateado' },
  { src: '/images/galeria/nailart-floral.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Nail art floral a mano alzada', alt: 'Uñas coral con detalles florales pintados a mano' },
  { src: '/images/galeria/nailart-rosa.webp', width: 1000, height: 667, tag: 'manos', caption: 'Rosa sobre nude', alt: 'Uñas rosas de acabado brillante sobre tejido suave' },
  { src: '/images/galeria/pies-detalle.webp', width: 1000, height: 1500, tag: 'pies', caption: 'Pedicure spa · cuidado de cutícula', alt: 'Detalle de pedicure spa con esmalte rosa' },
  { src: '/images/galeria/lashes-detalle.webp', width: 1000, height: 667, tag: 'mirada', caption: 'Inspiración de pestañas', alt: 'Pestañas de referencia con acabado definido' },
  { src: '/images/galeria/cejas-sonrisa.webp', width: 1000, height: 1498, tag: 'mirada', caption: 'Inspiración de cejas', alt: 'Diseño de cejas de referencia' },
];
