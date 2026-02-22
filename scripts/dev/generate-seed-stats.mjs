import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "data");
const statsDir = path.join(dataDir, "stats");

const RANKS = [
  "All",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster/Champion",
];

const heroes = JSON.parse(await fs.readFile(path.join(dataDir, "heroes.json"), "utf8"));
const maps = JSON.parse(await fs.readFile(path.join(dataDir, "maps.json"), "utf8"));

function hashString(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function noise(seed, amplitude) {
  const normalized = (seed % 1000) / 1000; // [0,1)
  return (normalized * 2 - 1) * amplitude; // [-amp, +amp]
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round2(value) {
  return Number(value.toFixed(2));
}

function scoreToBaseWinRate(score) {
  return 45 + (score - 55) * 0.22;
}

function scoreToBasePickRate(score) {
  return 1.5 + (score - 55) * 0.06;
}

const uniqueMapNames = [...new Set(maps.map((m) => m.name))];

const seeded = {
  schemaVersion: 1,
  source: "seeded_from_current_scores",
  updatedAt: new Date().toISOString(),
  ranks: RANKS,
  maps: uniqueMapNames,
  heroes: {},
};

for (const hero of heroes) {
  const heroData = { ranks: {}, maps: {} };

  const baseWinRate = scoreToBaseWinRate(hero.originalScore ?? hero.score ?? 75);
  const basePickRate = scoreToBasePickRate(hero.originalScore ?? hero.score ?? 75);

  for (const rank of RANKS) {
    const rankSeed = hashString(`${hero.name}|${rank}`);
    const rankWin = clamp(baseWinRate + noise(rankSeed, 0.6), 40, 65);
    const rankPick = clamp(basePickRate + noise(rankSeed + 17, 0.45), 0.2, 25);
    heroData.ranks[rank] = {
      winRate: round2(rankWin),
      pickRate: round2(rankPick),
      sampleSize: null,
      source: "seeded",
    };
  }

  for (const mapName of uniqueMapNames) {
    heroData.maps[mapName] = {};
    for (const rank of RANKS) {
      const mapSeed = hashString(`${hero.name}|${mapName}|${rank}`);
      const base = heroData.ranks[rank] ?? heroData.ranks.All;
      const mapWin = clamp((base?.winRate ?? baseWinRate) + noise(mapSeed, 1.2), 35, 70);
      const mapPick = clamp((base?.pickRate ?? basePickRate) + noise(mapSeed + 23, 0.8), 0.1, 30);
      heroData.maps[mapName][rank] = {
        winRate: round2(mapWin),
        pickRate: round2(mapPick),
        sampleSize: null,
        source: "seeded",
      };
    }
  }

  seeded.heroes[hero.name] = heroData;
}

await fs.mkdir(statsDir, { recursive: true });

await fs.writeFile(
  path.join(statsDir, "by_rank_map.json"),
  `${JSON.stringify(seeded, null, 2)}\n`,
  "utf8",
);

const formula = {
  schemaVersion: 1,
  updatedAt: new Date().toISOString(),
  weights: {
    winRate: 0.7,
    pickRate: 0.3,
  },
  scoreRange: {
    min: 40,
    max: 100,
  },
  roundTo: 10,
  missingDataFallbackScore: 75,
  tierThresholds: {
    sTierMin: 95,
    aToBTierMin: 85,
    bToCTierMin: 75,
    cToDTierMin: 65,
    fTierMax: 55,
  },
};

await fs.writeFile(
  path.join(dataDir, "score_formula.json"),
  `${JSON.stringify(formula, null, 2)}\n`,
  "utf8",
);

const metadata = {
  schemaVersion: 1,
  updatedAt: new Date().toISOString(),
  source: {
    heroes: "legacy_script_seed",
    stats: "legacy_script_seed",
    portraits: "existing_assets",
  },
};

await fs.writeFile(
  path.join(dataDir, "metadata.json"),
  `${JSON.stringify(metadata, null, 2)}\n`,
  "utf8",
);

console.log("Generated data/stats/by_rank_map.json, data/score_formula.json, and data/metadata.json");
