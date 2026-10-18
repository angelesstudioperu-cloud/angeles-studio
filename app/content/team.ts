export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
};

/** Equipo actual: dos manicuristas. */
export const team: TeamMember[] = [
  {
    id: 'kiara-alvarado',
    name: 'Kiara Alvarado',
    initials: 'KA',
    role: 'Manicurista',
    bio: 'Esmaltado en gel, acrílico y polygel. Trabaja la estructura y el largo con foco en que la uña natural aguante.',
  },
  {
    id: 'liliana-minaya',
    name: 'Liliana Minaya',
    initials: 'LM',
    role: 'Manicurista',
    bio: 'Pedicure spa, acripie y diseño de mirada. Se toma el tiempo de explicar cada paso antes de empezar.',
  },
];
