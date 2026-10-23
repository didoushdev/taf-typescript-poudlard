import { Cache } from "./decorators";
import { SpellRepository, WizardRepository } from "./repository";
import type { House, SpellCastEvent, Wizard } from "./types";

// ---------- Exercice 1 : ajouter un sorcier ----------
console.log("\n=== Exercice 1 : NewWizard ===");
const wizards = new WizardRepository();
const harry = wizards.addNew({ name: "Harry Potter", house: "Gryffindor", level: 5, active: true });
wizards.addNew({ name: "Hermione Granger", house: "Gryffindor", level: 7, active: true });
wizards.addNew({ name: "Draco Malfoy", house: "Slytherin", level: 5, active: true });
wizards.addNew({ name: "Luna Lovegood", house: "Ravenclaw", level: 4, active: true });
console.log("Créé :", harry); // id attribué automatiquement
// wizards.addNew({ name: "X", house: "Durmstrang", level: 1, active: true }); // ❌ erreur de compilation

// ---------- Exercice 2 : filtrer par maison ----------
console.log("\n=== Exercice 2 : findByHouse ===");
console.log("Gryffindor :", wizards.findByHouse("Gryffindor").map(w => w.name));
console.log("Slytherin  :", wizards.findByHouse("Slytherin").map(w => w.name));
console.log("Hufflepuff :", wizards.findByHouse("Hufflepuff").map(w => w.name));
// wizards.findByHouse("Durmstrang"); // ❌ erreur de compilation

// ---------- Exercice 3 : Extract / SpellCastEvent ----------
console.log("\n=== Exercice 3 : SpellCastEvent ===");
function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}
handleSpellCast({ type: "spell-cast", wizardId: 1, spellName: "Expelliarmus" });
// handleSpellCast({ type: "level-up", wizardId: 1, newLevel: 6 }); // ❌ erreur de compilation

// ---------- Exercice 4 : ValidateSpellPower ----------
console.log("\n=== Exercice 4 : ValidateSpellPower ===");
const spells = new SpellRepository();
spells.add({ id: 102, name: "Protego", category: "defense", power: 50 });
console.log("Protego ajouté, total :", spells.getAll().length);
try {
  spells.add({ id: 103, name: "Invalid Spell", category: "attack", power: -10 });
} catch (error) {
  console.log("Refusé :", (error as Error).message);
}
console.log("Total après tentative invalide :", spells.getAll().length);

// ---------- Exercice 5 : Cache ----------
console.log("\n=== Exercice 5 : Cache ===");
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}
const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3)); // MISS
console.log(calculator.calculatePower(10, 3)); // HIT
console.log(calculator.calculatePower(5, 2));  // MISS

// ---------- Exercice 6 : Type guards ----------
console.log("\n=== Exercice 6 : isHouse / isWizard ===");
const validHouses: readonly House[] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function isHouse(value: unknown): value is House {
  return typeof value === "string" && validHouses.some(house => house === value);
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

const validData: unknown = { id: 1, name: "Harry Potter", house: "Gryffindor", level: 5, active: true };
const invalidData: unknown = { id: 2, name: "Viktor", house: "Durmstrang", level: 5, active: true };
console.log(isWizard(validData));   // true
console.log(isWizard(invalidData)); // false
