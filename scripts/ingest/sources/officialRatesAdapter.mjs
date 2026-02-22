import {
  canonicalizeMapName,
  formatIsoNow,
  getHeroNameCandidates,
  mapToRatesSlug,
  normalizeTierNameForRates,
  parsePercent,
  RANKS,
  sleep,
  unique,
} from "../utils.mjs";

const RATES_BASE_URL = "https://overwatch.blizzard.com/en-us/rates/";

function stripHtmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(html) {
  return html
    .replace(/&quot;/g, "\"")
    .replace(/&#34;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createHeroAliasMap(heroNames) {
  const aliasToHero = new Map();
  for (const heroName of heroNames) {
    for (const candidate of getHeroNameCandidates(heroName)) {
      aliasToHero.set(candidate.toLowerCase(), heroName);
    }
  }
  return aliasToHero;
}

function normalizeRatesPair(firstPercent, secondPercent) {
  const first = parsePercent(firstPercent);
  const second = parsePercent(secondPercent);
  if (!Number.isFinite(first) || !Number.isFinite(second)) return null;

  // Win rates are usually around 40-60 and pick rates are usually much lower.
  // If one value clearly looks like win rate and the other pick rate, enforce
  // that mapping; otherwise default to the source order.
  if (first >= 35 && second <= 35) {
    return { winRate: first, pickRate: second };
  }
  if (second >= 35 && first <= 35) {
    return { winRate: second, pickRate: first };
  }
  return { winRate: first, pickRate: second };
}

function extractHeroStatsFromEmbeddedJson(html, heroNames) {
  const extracted = new Map();
  const aliasToHero = createHeroAliasMap(heroNames);
  const decoded = decodeHtmlEntities(html);

  const cellPattern =
    /"cells":\{"name":"([^"]+)","pickrate":(\d+(?:\.\d+)?),"winrate":(\d+(?:\.\d+)?)\}/g;
  let match;
  while ((match = cellPattern.exec(decoded))) {
    const sourceName = match[1]?.trim();
    const heroName = aliasToHero.get(sourceName.toLowerCase());
    if (!heroName) continue;

    const pickRate = Number(match[2]);
    const winRate = Number(match[3]);
    if (!Number.isFinite(pickRate) || !Number.isFinite(winRate)) continue;

    extracted.set(heroName, { pickRate, winRate });
  }

  return extracted;
}

function extractHeroStatsFromText(text, heroNames) {
  const extracted = new Map();

  for (const heroName of heroNames) {
    const candidates = getHeroNameCandidates(heroName);
    let found = null;

    for (const candidate of candidates) {
      const pattern = new RegExp(
        `${escapeRegex(candidate)}\\s+(\\d+(?:[\\.,]\\d+)?)%\\s+(\\d+(?:[\\.,]\\d+)?)%`,
        "i",
      );
      const match = text.match(pattern);
      if (!match) continue;

      const normalized = normalizeRatesPair(match[1], match[2]);
      if (!normalized) continue;

      found = normalized;
      break;
    }

    if (found) extracted.set(heroName, found);
  }

  return extracted;
}

async function fetchRatesHtml({ tier, mapSlug, region, input, rq }) {
  const params = new URLSearchParams({
    tier,
    map: mapSlug,
    region,
    input,
    rq,
    role: "All",
  });
  const url = `${RATES_BASE_URL}?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      "user-agent": "overwatch-hero-picker-data-sync/1.0",
      accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`Rates request failed (${response.status}) for ${url}`);
  }

  return response.text();
}

async function fetchParsedSnapshot(options) {
  const {
    tier,
    mapSlug,
    heroNames,
    region,
    input,
    rq,
  } = options;

  const html = await fetchRatesHtml({ tier, mapSlug, region, input, rq });
  const fromEmbeddedJson = extractHeroStatsFromEmbeddedJson(html, heroNames);
  if (fromEmbeddedJson.size > 0) {
    return fromEmbeddedJson;
  }

  const text = stripHtmlToText(html);
  return extractHeroStatsFromText(text, heroNames);
}

function createEmptyStatsSkeleton(heroNames, ranks, localMapNames) {
  const heroes = {};
  for (const heroName of heroNames) {
    heroes[heroName] = { ranks: {}, maps: {} };
    for (const mapName of localMapNames) {
      heroes[heroName].maps[mapName] = {};
    }
  }
  return {
    schemaVersion: 1,
    source: "official_overwatch_rates_scrape",
    updatedAt: formatIsoNow(),
    ranks,
    maps: localMapNames,
    heroes,
  };
}

export async function fetchOfficialRatesStats(options) {
  const logger = options.logger ?? console;
  const heroNames = options.heroNames;
  const localMapNames = options.mapNames;
  const ranks = options.ranks ?? RANKS;
  const requestDelayMs = options.requestDelayMs ?? 175;
  const input = options.input ?? "PC";
  const region = options.region ?? "Americas";
  const rq = options.rq ?? "2";

  const localToCanonicalMap = new Map(
    localMapNames.map((mapName) => [mapName, canonicalizeMapName(mapName)]),
  );
  const canonicalMaps = unique([...localToCanonicalMap.values()]);

  const result = createEmptyStatsSkeleton(heroNames, ranks, localMapNames);
  let successfulAllMapRanks = 0;

  for (const rank of ranks) {
    const sourceTier = normalizeTierNameForRates(rank);
    try {
      const parsed = await fetchParsedSnapshot({
        tier: sourceTier,
        mapSlug: "all-maps",
        heroNames,
        region,
        input,
        rq,
      });

      const coverage = parsed.size / Math.max(heroNames.length, 1);
      if (coverage < 0.35) {
        throw new Error(`Low parse coverage for rank "${rank}": ${(coverage * 100).toFixed(1)}%`);
      }

      successfulAllMapRanks += 1;
      for (const [heroName, point] of parsed.entries()) {
        result.heroes[heroName].ranks[rank] = {
          winRate: point.winRate,
          pickRate: point.pickRate,
          sampleSize: null,
          source: "official_rates",
        };
      }
      logger.log(`Official rates all-maps rank ${rank}: ${parsed.size}/${heroNames.length} heroes`);
    } catch (error) {
      logger.warn(`Failed to fetch all-maps rank ${rank}: ${error.message}`);
    }
    await sleep(requestDelayMs);
  }

  if (successfulAllMapRanks === 0) {
    throw new Error("Official rates adapter failed to fetch any all-maps rank snapshots.");
  }

  const canonicalMatrix = new Map();
  for (const canonicalMap of canonicalMaps) {
    const mapSlug = mapToRatesSlug(canonicalMap);
    for (const rank of ranks) {
      const sourceTier = normalizeTierNameForRates(rank);
      try {
        const parsed = await fetchParsedSnapshot({
          tier: sourceTier,
          mapSlug,
          heroNames,
          region,
          input,
          rq,
        });

        const coverage = parsed.size / Math.max(heroNames.length, 1);
        if (coverage < 0.2) {
          logger.warn(
            `Low coverage for map ${canonicalMap} (${rank}) at ${(coverage * 100).toFixed(1)}%; skipping snapshot.`,
          );
          continue;
        }

        canonicalMatrix.set(`${canonicalMap}::${rank}`, parsed);
        logger.log(
          `Official rates map ${canonicalMap} rank ${rank}: ${parsed.size}/${heroNames.length} heroes`,
        );
      } catch (error) {
        logger.warn(`Failed map snapshot ${canonicalMap} (${rank}): ${error.message}`);
      }
      await sleep(requestDelayMs);
    }
  }

  for (const mapName of localMapNames) {
    const canonicalMap = localToCanonicalMap.get(mapName);
    for (const rank of ranks) {
      const parsed = canonicalMatrix.get(`${canonicalMap}::${rank}`);
      if (!parsed) continue;
      for (const [heroName, point] of parsed.entries()) {
        result.heroes[heroName].maps[mapName][rank] = {
          winRate: point.winRate,
          pickRate: point.pickRate,
          sampleSize: null,
          source: "official_rates",
        };
      }
    }
  }

  return result;
}
