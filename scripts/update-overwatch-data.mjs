import path from "node:path";
import { fetchHeroCatalog } from "./ingest/sources/heroCatalogAdapter.mjs";
import { loadFallbackStats } from "./ingest/sources/fallbackStatsAdapter.mjs";
import { fetchOfficialRatesStats } from "./ingest/sources/officialRatesAdapter.mjs";
import { syncPortraits } from "./ingest/sources/portraitAdapter.mjs";
import { computeScoresFromStats } from "./ingest/scoring.mjs";
import {
  formatIsoNow,
  heroImageSlug,
  heroKey,
  LEGACY_TOP_TIER_RANKS,
  readJson,
  RANKS,
  repoPath,
  TOP_TIER_COMBINED_RANK,
  writeBrowserDataBundle,
  writeJson,
} from "./ingest/utils.mjs";
import {
  validateCounters,
  validateFormula,
  validateHeroes,
  validateMaps,
  validateStats,
} from "./ingest/validate.mjs";

const args = new Set(process.argv.slice(2));
const refreshPortraits = args.has("--refresh-portraits");
const skipOfficial = args.has("--skip-official");
const skipCatalog = args.has("--skip-catalog");
const dryRun = args.has("--dry-run");

const paths = {
  heroes: repoPath("data", "heroes.json"),
  counters: repoPath("data", "counters.json"),
  maps: repoPath("data", "maps.json"),
  stats: repoPath("data", "stats", "by_rank_map.json"),
  formula: repoPath("data", "score_formula.json"),
  metadata: repoPath("data", "metadata.json"),
  bundle: repoPath("data", "bundle.js"),
  imagesDir: repoPath("images"),
};

function createMapByName(items) {
  return new Map(items.map((item) => [item.name, item]));
}

function round2(value) {
  return Number(value.toFixed(2));
}

function scoreToDefaultStatPoint(score) {
  const safeScore = Number.isFinite(score) ? score : 75;
  const winRate = round2(45 + (safeScore - 55) * 0.22);
  const pickRate = round2(1.5 + (safeScore - 55) * 0.06);
  return {
    winRate,
    pickRate,
    sampleSize: null,
    source: "default_seed",
  };
}

function mergeStatPoints(points) {
  const validPoints = points.filter(
    (point) =>
      point &&
      typeof point === "object" &&
      Number.isFinite(point.winRate) &&
      Number.isFinite(point.pickRate),
  );
  if (validPoints.length === 0) return null;

  const winRate =
    validPoints.reduce((sum, point) => sum + point.winRate, 0) / validPoints.length;
  const pickRate =
    validPoints.reduce((sum, point) => sum + point.pickRate, 0) / validPoints.length;
  const sources = [...new Set(validPoints.map((point) => point.source).filter(Boolean))];

  return {
    winRate: round2(winRate),
    pickRate: round2(pickRate),
    sampleSize: null,
    source: sources.length === 1 ? sources[0] : "merged_top_tier",
  };
}

function mergeTopTierRankPoint(rankPoints) {
  if (!rankPoints || typeof rankPoints !== "object") return null;
  const candidateRanks = [TOP_TIER_COMBINED_RANK, ...LEGACY_TOP_TIER_RANKS];
  const points = candidateRanks
    .map((rank) => rankPoints[rank])
    .filter(Boolean);
  return mergeStatPoints(points);
}

function normalizeTopTierRanks(stats) {
  if (!stats?.heroes || typeof stats.heroes !== "object") return;

  for (const heroStats of Object.values(stats.heroes)) {
    if (!heroStats || typeof heroStats !== "object") continue;

    if (!heroStats.ranks || typeof heroStats.ranks !== "object") {
      heroStats.ranks = {};
    }
    const mergedRankPoint = mergeTopTierRankPoint(heroStats.ranks);
    if (mergedRankPoint) {
      heroStats.ranks[TOP_TIER_COMBINED_RANK] = mergedRankPoint;
    }
    for (const legacyRank of LEGACY_TOP_TIER_RANKS) {
      delete heroStats.ranks[legacyRank];
    }

    if (!heroStats.maps || typeof heroStats.maps !== "object") {
      heroStats.maps = {};
      continue;
    }

    for (const mapStats of Object.values(heroStats.maps)) {
      if (!mapStats || typeof mapStats !== "object") continue;
      const mergedMapPoint = mergeTopTierRankPoint(mapStats);
      if (mergedMapPoint) {
        mapStats[TOP_TIER_COMBINED_RANK] = mergedMapPoint;
      }
      for (const legacyRank of LEGACY_TOP_TIER_RANKS) {
        delete mapStats[legacyRank];
      }
    }
  }
}

function ensureHeroInCounters(counters, heroName) {
  if (!Array.isArray(counters[heroName])) {
    counters[heroName] = [];
  }
}

function ensureHeroInMapCounters(maps, heroName) {
  maps.forEach((map) => {
    if (!map.counters || typeof map.counters !== "object") {
      map.counters = {};
    }
    if (map.counters[heroName] === undefined) {
      map.counters[heroName] = 0;
    }
  });
}

function makeDefaultHero(catalogHero) {
  const image = `${heroImageSlug(catalogHero.name)}-portrait-small.png`;
  return {
    name: catalogHero.name,
    category: catalogHero.category,
    score: 75,
    originalScore: 75,
    image,
    portraitUrl: catalogHero.portraitUrl ?? null,
  };
}

function ensureStatsCoverage(stats, heroes, maps) {
  normalizeTopTierRanks(stats);
  stats.ranks = [...RANKS];
  if (!Array.isArray(stats.maps)) {
    stats.maps = [];
  }
  for (const map of maps) {
    if (!stats.maps.includes(map.name)) {
      stats.maps.push(map.name);
    }
  }

  if (!stats.heroes || typeof stats.heroes !== "object") {
    stats.heroes = {};
  }

  for (const hero of heroes) {
    const heroName = hero.name;
    if (!stats.heroes[heroName] || typeof stats.heroes[heroName] !== "object") {
      stats.heroes[heroName] = { ranks: {}, maps: {} };
    }
    const heroStats = stats.heroes[heroName];
    if (!heroStats.ranks || typeof heroStats.ranks !== "object") {
      heroStats.ranks = {};
    }
    if (!heroStats.maps || typeof heroStats.maps !== "object") {
      heroStats.maps = {};
    }

    const baselinePoint = scoreToDefaultStatPoint(hero.originalScore ?? hero.score ?? 75);

    for (const rank of stats.ranks) {
      if (!heroStats.ranks[rank]) {
        heroStats.ranks[rank] = { ...baselinePoint };
      }
    }

    for (const map of maps) {
      if (!heroStats.maps[map.name] || typeof heroStats.maps[map.name] !== "object") {
        heroStats.maps[map.name] = {};
      }
      for (const rank of stats.ranks) {
        if (!heroStats.maps[map.name][rank]) {
          heroStats.maps[map.name][rank] = { ...heroStats.ranks[rank] };
        }
      }
    }
  }
}

function mergeHeroCatalog(existingHeroes, catalog) {
  const mergedHeroes = structuredClone(existingHeroes);
  const existingByKey = new Map();
  const existingByName = new Map();
  mergedHeroes.forEach((hero, index) => {
    existingByKey.set(heroKey(hero.name), { index, hero });
    existingByName.set(hero.name, hero);
  });

  const newHeroNames = [];
  const resolvedCatalog = [];

  for (const catalogHero of catalog) {
    const key = heroKey(catalogHero.name);
    const existing = existingByKey.get(key);
    if (existing) {
      const target = mergedHeroes[existing.index];
      target.category = catalogHero.category || target.category;
      if (catalogHero.portraitUrl) {
        target.portraitUrl = catalogHero.portraitUrl;
      }
      resolvedCatalog.push({ ...catalogHero, name: target.name });
      continue;
    }

    const newHero = makeDefaultHero(catalogHero);
    mergedHeroes.push(newHero);
    existingByKey.set(key, { index: mergedHeroes.length - 1, hero: newHero });
    newHeroNames.push(newHero.name);
    resolvedCatalog.push(newHero);
  }

  return {
    mergedHeroes,
    newHeroNames,
    existingByName,
    resolvedCatalog,
  };
}

function heroHasOfficialStats(stats, heroName) {
  const heroStats = stats?.heroes?.[heroName];
  if (!heroStats?.ranks) return false;
  return Object.values(heroStats.ranks).some(
    (point) => point?.source === "official_rates",
  );
}

async function main() {
  const heroes = await readJson(paths.heroes);
  const counters = await readJson(paths.counters);
  const maps = await readJson(paths.maps);
  const currentStats = await readJson(paths.stats);
  const formula = await readJson(paths.formula);
  const metadata = await readJson(paths.metadata);

  validateHeroes(heroes);
  validateCounters(counters);
  validateMaps(maps);
  validateFormula(formula);
  validateStats(currentStats, heroes, maps);

  const catalog = skipCatalog ? [] : await fetchHeroCatalog({ logger: console });
  const {
    mergedHeroes,
    newHeroNames,
    existingByName,
    resolvedCatalog,
  } = mergeHeroCatalog(heroes, catalog);

  let stats = null;
  if (!skipOfficial) {
    try {
      stats = await fetchOfficialRatesStats({
        heroNames: mergedHeroes.map((hero) => hero.name),
        mapNames: maps.map((map) => map.name),
        ranks: RANKS,
        logger: console,
      });
    } catch (error) {
      console.warn(`Official rates sync failed: ${error.message}`);
    }
  }

  if (!stats) {
    stats = await loadFallbackStats({
      filePath: paths.stats,
      logger: console,
    });
  }

  const existingHeroNames = new Set(heroes.map((hero) => hero.name));
  let verifiedNewHeroes = [];
  let effectiveHeroes = mergedHeroes;

  if (stats.source === "official_overwatch_rates_scrape") {
    verifiedNewHeroes = newHeroNames.filter((heroName) =>
      heroHasOfficialStats(stats, heroName),
    );
    const keep = new Set([...existingHeroNames, ...verifiedNewHeroes]);
    effectiveHeroes = mergedHeroes.filter((hero) => keep.has(hero.name));
  } else {
    verifiedNewHeroes = [];
    effectiveHeroes = mergedHeroes.filter((hero) => existingHeroNames.has(hero.name));
  }

  ensureStatsCoverage(stats, effectiveHeroes, maps);
  validateStats(stats, effectiveHeroes, maps);

  const effectiveHeroSet = new Set(effectiveHeroes.map((hero) => hero.name));
  const portraitCatalog = resolvedCatalog.filter((hero) => effectiveHeroSet.has(hero.name));
  const portraitSync = await syncPortraits({
    catalog: portraitCatalog,
    heroesByName: existingByName,
    imagesDir: paths.imagesDir,
    refreshExisting: refreshPortraits,
    logger: console,
  });

  if (portraitSync.updates.size > 0) {
    const heroesByName = createMapByName(effectiveHeroes);
    for (const [heroName, imageFile] of portraitSync.updates.entries()) {
      const hero = heroesByName.get(heroName);
      if (hero) hero.image = imageFile;
    }
  }

  verifiedNewHeroes.forEach((heroName) => {
    ensureHeroInCounters(counters, heroName);
    ensureHeroInMapCounters(maps, heroName);
  });

  const baseScores = computeScoresFromStats(effectiveHeroes, stats, formula, {
    rank: "All",
    mapName: null,
  });

  for (const hero of effectiveHeroes) {
    const score = baseScores.get(hero.name) ?? hero.originalScore ?? 75;
    hero.originalScore = score;
    hero.score = score;
  }

  const nextMetadata = {
    ...metadata,
    schemaVersion: 1,
    updatedAt: formatIsoNow(),
    source: {
      heroes: "overfast_catalog",
      stats: stats.source ?? "unknown",
      portraits: refreshPortraits
        ? "overfast_refresh"
        : "overfast_new_or_missing",
    },
    syncSummary: {
      totalHeroes: effectiveHeroes.length,
      newHeroes: verifiedNewHeroes,
      droppedUnverifiedHeroes: newHeroNames.filter((name) => !verifiedNewHeroes.includes(name)),
      portraitsDownloaded: portraitSync.updates.size,
      portraitFailures: portraitSync.failures,
      usedOfficialRates: stats.source === "official_overwatch_rates_scrape",
      ranksSynced: stats.ranks?.length ?? 0,
      mapsSynced: stats.maps?.length ?? 0,
    },
  };

  if (dryRun) {
    console.log("Dry run summary:");
    console.log(JSON.stringify(nextMetadata.syncSummary, null, 2));
    return;
  }

  await writeJson(paths.heroes, effectiveHeroes);
  await writeJson(paths.counters, counters);
  await writeJson(paths.maps, maps);
  await writeJson(paths.stats, stats);
  await writeJson(paths.metadata, nextMetadata);
  await writeBrowserDataBundle(paths.bundle, {
    heroes: effectiveHeroes,
    counters,
    maps,
    stats,
    formula,
    metadata: nextMetadata,
  });

  console.log("Overwatch data sync complete.");
  console.log(`Heroes: ${effectiveHeroes.length} total (${verifiedNewHeroes.length} new)`);
  console.log(`Portraits downloaded: ${portraitSync.updates.size}`);
  console.log(`Stats source: ${stats.source}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
