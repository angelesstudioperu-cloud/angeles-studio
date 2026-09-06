export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  /** pending: fotos reales del equipo. Mientras tanto se usa el monograma. */
  photo?: string;
};

/**
 * Equipo actual: dos manicuristas.
 * pending: el nombre de la segunda especialista (el salón lo confirmará) y las fotos.
 */
export const team: TeamMember[] = [
  {
    id: 'kiara-1',
    name: 'Kiara',
    initials: 'K',
    role: 'Manicurista',
    bio: 'Esmaltado en gel, acrílico y polygel. Trabaja la estructura y el largo con foco en que la uña natural aguante.',
  },
  {
    id: 'kiara-2',
    name: 'Kiara',
    initials: 'K',
    role: 'Manicurista',
    bio: 'Pedicure spa, acripie y diseño de mirada. Se toma el tiempo de explicar cada paso antes de empezar.',
  },
];
