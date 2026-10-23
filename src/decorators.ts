// ===== Exercice 4 : décorateur qui vérifie la puissance d'un sort =====
export function ValidateSpellPower(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void {
  // on garde la méthode d'origine (add) pour pouvoir l'appeler après la vérification
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    // le premier argument de add() est le sort
    const spell = args[0] as { power?: number };

    // si la puissance est négative on refuse le sort
    if (typeof spell?.power === "number" && spell.power < 0) {
      throw new Error("Spell power cannot be negative");
    }

    // sinon on exécute la méthode normalement
    return originalMethod.apply(this, args);
  };
}

// ===== Exercice 5 : décorateur de cache =====
export function Cache(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  // un cache séparé pour chaque instance de la classe
  const instanceCaches = new WeakMap<object, Map<string, unknown>>();

  descriptor.value = function (this: object, ...args: unknown[]): unknown {
    // on récupère le cache de cette instance (ou on le crée s'il n'existe pas)
    let cache = instanceCaches.get(this);
    if (!cache) {
      cache = new Map<string, unknown>();
      instanceCaches.set(this, cache);
    }

    // la clé du cache = les arguments transformés en texte, ex: "[10,3]"
    const key = JSON.stringify(args);

    // résultat déjà calculé : on le renvoie directement
    if (cache.has(key)) {
      console.log(`[CACHE HIT] ${String(propertyKey)}`);
      return cache.get(key);
    }

    // sinon on calcule, on sauvegarde, puis on renvoie
    console.log(`[CACHE MISS] ${String(propertyKey)}`);
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
