// ===== Les 4 maisons de Poudlard =====
export type House = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

// ===== Un sorcier =====
export interface Wizard {
  id: number;
  name: string;
  house: House; // seulement une des 4 maisons
  level: number;
  active: boolean;
}

// ===== Un sort =====
export interface Spell {
  id: number;
  name: string;
  category: "attack" | "defense" | "utility";
  power: number;
}

// ===== Exercice 1 : NewWizard =====
// Omit retire la propriété "id" : on donne tout sauf l'id,
// c'est le repository qui l'attribue
export type NewWizard = Omit<Wizard, "id">;

// ===== Les événements de l'académie =====
// union discriminée : la propriété "type" permet de savoir de quel événement il s'agit
export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };

// ===== Exercice 3 : SpellCastEvent =====
// Extract garde seulement l'événement "spell-cast" de l'union AcademyEvent
export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;
