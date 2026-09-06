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
 * Imágenes de referencia con licencia libre (Pexels) mientras el studio nos
 * envía sus propias fotos. Ver `docs/creditos-imagenes.md`.
 */
export const gallery: GalleryItem[] = [
  { src: '/images/galeria/nailart-flor.webp', width: 1000, height: 667, tag: 'manos', caption: 'Esmaltado en gel · rosa suave', alt: 'Mano con esmaltado en gel rosa sosteniendo una flor' },
  { src: '/images/galeria/manos-proceso.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Elección de color en cabina', alt: 'Especialista mostrando tips de color durante la asesoría' },
  { src: '/images/galeria/nailart-glitter.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Glitter sobre base nude', alt: 'Uñas rosas con glitter y anillo plateado' },
  { src: '/images/galeria/nailart-floral.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Nail art floral a mano alzada', alt: 'Uñas coral con detalles florales pintados a mano' },
  { src: '/images/galeria/nailart-rojo.webp', width: 1000, height: 1500, tag: 'manos', caption: 'Rojo con acabado brillante', alt: 'Uñas largas rojas con diseño blanco' },
  { src: '/images/galeria/pies-detalle.webp', width: 1000, height: 1500, tag: 'pies', caption: 'Pedicure spa · cuidado de cutícula', alt: 'Detalle de pedicure spa con esmalte rosa' },
  { src: '/images/galeria/lashes-detalle.webp', width: 1000, height: 667, tag: 'mirada', caption: 'Diseño de pestañas', alt: 'Especialista seleccionando pestañas antes del servicio' },
  { src: '/images/galeria/cejas-sonrisa.webp', width: 1000, height: 1498, tag: 'mirada', caption: 'Diseño y laminado de cejas', alt: 'Clienta sonriendo durante el diseño de cejas' },
];
