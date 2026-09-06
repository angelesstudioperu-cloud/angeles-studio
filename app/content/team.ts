export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  /**
   * Retrato pendiente. Mientras tanto usamos una foto de trabajo en cabina (sin
   * rostro) para no presentar a una desconocida como si fuera parte del equipo.
   */
  photo: { src: string; width: number; height: number; alt: string };
};

/** Equipo actual: dos manicuristas. */
export const team: TeamMember[] = [
  {
    id: 'kiara-alvarado',
    name: 'Kiara Alvarado',
    initials: 'KA',
    role: 'Manicurista',
    bio: 'Esmaltado en gel, acrílico y polygel. Trabaja la estructura y el largo con foco en que la uña natural aguante.',
    photo: {
      src: '/images/galeria/manos-proceso.webp',
      width: 1000,
      height: 1500,
      alt: 'Elección de color con muestrario durante un servicio de uñas',
    },
  },
  {
    id: 'liliana-minaya',
    name: 'Liliana Minaya',
    initials: 'LM',
    role: 'Manicurista',
    bio: 'Pedicure spa, acripie y diseño de mirada. Se toma el tiempo de explicar cada paso antes de empezar.',
    photo: {
      src: '/images/servicios/esmaltado-en-gel.webp',
      width: 1200,
      height: 2133,
      alt: 'Aplicación de esmalte en gel sobre la uña natural',
    },
  },
];
