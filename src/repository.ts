import { ValidateSpellPower } from "./decorators";
import type { NewWizard, Spell, Wizard } from "./types";

// ===== Repository générique =====
// T peut être n'importe quel type qui a un id (Wizard, Spell, ...)
export class Repository<T extends { id: number }> {
  // on stocke les éléments dans une Map : clé = id, valeur = l'élément
  protected items = new Map<number, T>();

  // ajoute un élément
  add(item: T): void {
    this.items.set(item.id, item);
  }

  // retourne l'élément correspondant à l'id (ou undefined s'il n'existe pas)
  getById(id: number): T | undefined {
    return this.items.get(id);
  }

  // retourne tous les éléments dans un tableau
  getAll(): T[] {
    return [...this.items.values()];
  }
}

// ===== Repository des sorciers =====
export class WizardRepository extends Repository<Wizard> {
  // prochain id à attribuer
  private nextId = 1;

  // Exercice 1 : on reçoit un sorcier sans id (NewWizard),
  // c'est le repository qui génère l'id
  addNew(data: NewWizard): Wizard {
    const wizard: Wizard = { id: this.nextId++, ...data };
    this.add(wizard);
    return wizard;
  }

  // Exercice 2 : retourne les sorciers d'une maison
  // Wizard["house"] = le type de la propriété house (les 4 maisons seulement)
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter((wizard) => wizard.house === house);
  }
}

// ===== Repository des sorts =====
export class SpellRepository extends Repository<Spell> {
  // Exercice 4 : le décorateur vérifie que la puissance n'est pas négative
  // avant d'ajouter le sort
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}
