export type Categorie =
  | 'pasta'
  | 'viande'
  | 'végé'
  | 'soupe'
  | 'poisson'
  | 'salade'
  | 'dessert'
  | 'autre';

export interface Plat {
  id: string;
  nom: string;
  categorie: Categorie | '';
  recette: string;
  createdAt: number;
}

export interface PlatSlot {
  midi: string;
  soir: string;
}

export type JourSemaine =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi'
  | 'dimanche';

export type PlanningJours = Record<JourSemaine, PlatSlot>;

export interface Planning {
  id: string;
  jours: Partial<PlanningJours>;
}

export const JOURS: JourSemaine[] = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
];

export const JOURS_LABELS: Record<JourSemaine, string> = {
  lundi: 'Lun',
  mardi: 'Mar',
  mercredi: 'Mer',
  jeudi: 'Jeu',
  vendredi: 'Ven',
  samedi: 'Sam',
  dimanche: 'Dim',
};

export const CATEGORIES: { value: Categorie; label: string; emoji: string }[] = [
  { value: 'pasta', label: 'Pasta', emoji: '🍝' },
  { value: 'viande', label: 'Viande', emoji: '🥩' },
  { value: 'végé', label: 'Végétarien', emoji: '🥗' },
  { value: 'soupe', label: 'Soupe', emoji: '🍲' },
  { value: 'poisson', label: 'Poisson', emoji: '🐟' },
  { value: 'salade', label: 'Salade', emoji: '🥬' },
  { value: 'dessert', label: 'Dessert', emoji: '🍰' },
  { value: 'autre', label: 'Autre', emoji: '🍽️' },
];

export function getCategorieEmoji(cat: Categorie | ''): string {
  if (!cat) return '🍽️';
  return CATEGORIES.find((c) => c.value === cat)?.emoji ?? '🍽️';
}
