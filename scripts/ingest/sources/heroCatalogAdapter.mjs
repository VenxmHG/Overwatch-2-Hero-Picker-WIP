import { mapToCategory } from "../utils.mjs";

const OVERFAST_HEROES_URL = "https://overfast-api.tekrop.fr/heroes";

function extractRoleName(rawHero) {
  if (typeof rawHero?.role === "string") return rawHero.role;
  if (typeof rawHero?.role?.name === "string") return rawHero.role.name;
  return "";
}

function extractPortraitUrl(rawHero) {
  const candidates = [
    rawHero?.portrait,
    rawHero?.image?.portrait,
    rawHero?.icon,
    rawHero?.image?.icon,
  ];
  return candidates.find((value) => typeof value === "string" && value.length > 0) ?? null;
}

export async function fetchHeroCatalog(options = {}) {
  const logger = options.logger ?? console;
  const response = await fetch(OVERFAST_HEROES_URL, {
    headers: {
      "user-agent": "overwatch-hero-picker-data-sync/1.0",
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`OverFast hero catalog request failed (${response.status})`);
  }

  const payload = await response.json();
  const rawHeroes = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  const catalog = rawHeroes
    .map((rawHero) => {
      const roleName = extractRoleName(rawHero);
      const name = String(rawHero?.name ?? "").trim();
      if (!name) return null;
      return {
        name,
        category: mapToCategory(roleName),
        portraitUrl: extractPortraitUrl(rawHero),
      };
    })
    .filter(Boolean);

  logger.log(`Fetched ${catalog.length} heroes from OverFast catalog.`);
  return catalog;
}
