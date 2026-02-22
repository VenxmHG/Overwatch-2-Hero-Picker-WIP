function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeRange(value, min, max) {
  if (!Number.isFinite(value)) return 0;
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0.5;
  return (value - min) / (max - min);
}

function roundToStep(value, step) {
  if (!Number.isFinite(step) || step <= 0) return Math.round(value);
  return Math.round(value / step) * step;
}

function getStatPoint(stats, heroName, rank, mapName = null) {
  const heroStats = stats?.heroes?.[heroName];
  if (!heroStats) return null;

  if (mapName && heroStats.maps?.[mapName]) {
    return heroStats.maps[mapName][rank] ?? heroStats.maps[mapName].All ?? null;
  }
  return heroStats.ranks?.[rank] ?? heroStats.ranks?.All ?? null;
}

export function computeScoresFromStats(heroes, stats, formula, options = {}) {
  const rank = options.rank ?? "All";
  const mapName = options.mapName ?? null;
  const weights = formula?.weights ?? { winRate: 0.7, pickRate: 0.3 };
  const scoreRange = formula?.scoreRange ?? { min: 40, max: 100 };
  const roundTo = formula?.roundTo ?? 10;
  const missingDataFallbackScore = formula?.missingDataFallbackScore ?? 75;

  const pointsByHero = new Map();
  for (const hero of heroes) {
    const point = getStatPoint(stats, hero.name, rank, mapName);
    if (point) pointsByHero.set(hero.name, point);
  }

  const winRates = [];
  const pickRates = [];
  for (const point of pointsByHero.values()) {
    if (Number.isFinite(point.winRate)) winRates.push(point.winRate);
    if (Number.isFinite(point.pickRate)) pickRates.push(point.pickRate);
  }

  const winMin = winRates.length ? Math.min(...winRates) : 0;
  const winMax = winRates.length ? Math.max(...winRates) : 1;
  const pickMin = pickRates.length ? Math.min(...pickRates) : 0;
  const pickMax = pickRates.length ? Math.max(...pickRates) : 1;

  const scores = new Map();
  for (const hero of heroes) {
    const point = pointsByHero.get(hero.name);
    if (!point) {
      scores.set(
        hero.name,
        hero.originalScore ?? hero.score ?? missingDataFallbackScore,
      );
      continue;
    }

    const winNorm = normalizeRange(point.winRate, winMin, winMax);
    const pickNorm = normalizeRange(point.pickRate, pickMin, pickMax);
    const combined =
      (weights.winRate ?? 0.7) * winNorm +
      (weights.pickRate ?? 0.3) * pickNorm;

    const score =
      scoreRange.min + combined * (scoreRange.max - scoreRange.min);
    const rounded = roundToStep(score, roundTo);
    scores.set(
      hero.name,
      clamp(rounded, scoreRange.min, scoreRange.max),
    );
  }

  return scores;
}
