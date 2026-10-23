# TAF TypeScript – Poudlard

## Lancer
```bash
npm install
npm start
```
(Node.js 18+ requis.) `npm start` compile (tsc) puis exécute `dist/main.js`.

## Structure
- `src/types.ts`      : Wizard, Spell, NewWizard (Ex.1), AcademyEvent, SpellCastEvent (Ex.3)
- `src/repository.ts` : Repository<T> générique, WizardRepository (Ex.1-2), SpellRepository (Ex.4)
- `src/decorators.ts` : ValidateSpellPower (Ex.4), Cache (Ex.5)
- `src/main.ts`       : tests des 6 exercices (+ isHouse/isWizard, Ex.6)

Les lignes commentées « ❌ » dans main.ts : décommentez-les pour voir l'erreur de compilation.
