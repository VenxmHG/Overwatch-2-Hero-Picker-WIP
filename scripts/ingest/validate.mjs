function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateHeroes(heroes) {
  assert(Array.isArray(heroes), "heroes.json must be an array");
  for (const hero of heroes) {
    assert(isObject(hero), "Each hero must be an object");
    assert(typeof hero.name === "string" && hero.name.length > 0, "Hero.name is required");
    assert(typeof hero.category === "string" && hero.category.length > 0, "Hero.category is required");
    assert(typeof hero.image === "string" && hero.image.length > 0, "Hero.image is required");
    if (hero.portraitUrl !== undefined && hero.portraitUrl !== null) {
      assert(typeof hero.portraitUrl === "string", "Hero.portraitUrl must be a string when set");
    }
  }
}

export function validateMaps(maps) {
  assert(Array.isArray(maps), "maps.json must be an array");
  for (const map of maps) {
    assert(isObject(map), "Each map must be an object");
    assert(typeof map.name === "string" && map.name.length > 0, "Map.name is required");
    assert(typeof map.image === "string" && map.image.length > 0, "Map.image is required");
    if (map.counters !== undefined) {
      assert(isObject(map.counters), `Map.counters must be an object (${map.name})`);
    }
  }
}

export function validateCounters(counters) {
  assert(isObject(counters), "counters.json must be an object");
  for (const [heroName, countered] of Object.entries(counters)) {
    assert(Array.isArray(countered), `Counter list for ${heroName} must be an array`);
    countered.forEach((entry) => {
      assert(typeof entry === "string", `Counter entry for ${heroName} must be a string`);
    });
  }
}

export function validateFormula(formula) {
  assert(isObject(formula), "score_formula.json must be an object");
  assert(isObject(formula.weights), "score_formula.json.weights is required");
  assert(Number.isFinite(formula.weights.winRate), "weights.winRate must be a number");
  assert(Number.isFinite(formula.weights.pickRate), "weights.pickRate must be a number");
  assert(isObject(formula.scoreRange), "score_formula.json.scoreRange is required");
  assert(Number.isFinite(formula.scoreRange.min), "scoreRange.min must be a number");
  assert(Number.isFinite(formula.scoreRange.max), "scoreRange.max must be a number");
}

export function validateStats(stats, heroes, maps) {
  assert(isObject(stats), "stats file must be an object");
  assert(Array.isArray(stats.ranks), "stats.ranks must be an array");
  assert(Array.isArray(stats.maps), "stats.maps must be an array");
  assert(isObject(stats.heroes), "stats.heroes must be an object");

  const heroNames = new Set(heroes.map((hero) => hero.name));
  const mapNames = new Set(maps.map((map) => map.name));

  for (const heroName of heroNames) {
    const heroStats = stats.heroes[heroName];
    assert(isObject(heroStats), `Missing stats entry for hero: ${heroName}`);
    assert(isObject(heroStats.ranks), `stats.heroes.${heroName}.ranks must be an object`);
    assert(isObject(heroStats.maps), `stats.heroes.${heroName}.maps must be an object`);

    for (const rank of stats.ranks) {
      const rankPoint = heroStats.ranks[rank];
      if (!rankPoint) continue;
      assert(Number.isFinite(rankPoint.winRate), `Invalid winRate for ${heroName} (${rank})`);
      assert(Number.isFinite(rankPoint.pickRate), `Invalid pickRate for ${heroName} (${rank})`);
    }

    for (const mapName of mapNames) {
      if (!heroStats.maps[mapName]) continue;
      assert(isObject(heroStats.maps[mapName]), `stats.heroes.${heroName}.maps.${mapName} must be an object`);
    }
  }
}
