const DATA_FILES = {
  heroes: "data/heroes.json",
  counters: "data/counters.json",
  maps: "data/maps.json",
  stats: "data/stats/by_rank_map.json",
  formula: "data/score_formula.json",
  metadata: "data/metadata.json",
};

const DEFAULT_RANKS = [
  "All",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster/Champion",
];

const CATEGORY_ORDER = { Tank: 0, Support: 1, DPS: 2 };
const COUNTER_DELTA = 10;

const state = {
  heroes: [],
  counters: {},
  maps: [],
  stats: null,
  formula: null,
  metadata: null,
  selectedRank: "All",
};

const heroList = document.getElementById("hero-list");
const searchInput = document.getElementById("search-input");
const enemyTeamContainer = document.getElementById("enemy-team-container");
const clearButton = document.getElementById("clear-button");
const rankSelect = document.getElementById("rank-select");
const dataUpdatedAt = document.getElementById("data-updated-at");
const heroPortraitResolutionCache = new Map();
const heroPortraitInFlight = new Map();

function deepClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function getBundledData() {
  const bundled = globalThis.__OW_DATA__;
  if (!bundled || typeof bundled !== "object") return null;

  const hasRequiredShape =
    Array.isArray(bundled.heroes) &&
    bundled.counters &&
    typeof bundled.counters === "object" &&
    Array.isArray(bundled.maps) &&
    bundled.stats &&
    typeof bundled.stats === "object" &&
    bundled.formula &&
    typeof bundled.formula === "object";

  if (!hasRequiredShape) return null;
  return deepClone(bundled);
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path} (${response.status})`);
  }
  return response.json();
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(String(value ?? "").trim());
}

function getHeroPortraitCandidates(hero) {
  const candidates = [];
  if (isNonEmptyString(hero?.image)) {
    const imageValue = hero.image.trim();
    candidates.push(isHttpUrl(imageValue) ? imageValue : `images/${imageValue}`);
  }
  if (isNonEmptyString(hero?.portraitUrl)) {
    candidates.push(hero.portraitUrl.trim());
  }
  return [...new Set(candidates)];
}

function testImageUrl(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = url;
  });
}

function setCardBackgroundImage(cardElement, url) {
  if (!isNonEmptyString(url)) return;
  cardElement.style.backgroundImage = `url(${url})`;
}

async function resolveHeroPortraitUrl(hero) {
  const candidates = getHeroPortraitCandidates(hero);
  const cacheKey = `${hero?.name ?? ""}|${candidates.join("|")}`;

  if (heroPortraitResolutionCache.has(cacheKey)) {
    return heroPortraitResolutionCache.get(cacheKey);
  }

  if (heroPortraitInFlight.has(cacheKey)) {
    return heroPortraitInFlight.get(cacheKey);
  }

  const pending = (async () => {
    for (const candidate of candidates) {
      if (await testImageUrl(candidate)) {
        heroPortraitResolutionCache.set(cacheKey, candidate);
        return candidate;
      }
    }
    const fallback = candidates[0] ?? "";
    heroPortraitResolutionCache.set(cacheKey, fallback);
    return fallback;
  })();

  heroPortraitInFlight.set(cacheKey, pending);
  try {
    return await pending;
  } finally {
    heroPortraitInFlight.delete(cacheKey);
  }
}

function applyHeroPortrait(hero, heroCard) {
  const initial = getHeroPortraitCandidates(hero)[0];
  if (initial) {
    setCardBackgroundImage(heroCard, initial);
  }

  void resolveHeroPortraitUrl(hero).then((resolved) => {
    if (!heroCard.isConnected) return;
    setCardBackgroundImage(heroCard, resolved);
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundToStep(value, step) {
  if (!step || step <= 0) return Math.round(value);
  return Math.round(value / step) * step;
}

function normalizeRange(value, min, max) {
  if (!Number.isFinite(value)) return 0;
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0.5;
  return (value - min) / (max - min);
}

function getActiveMapName() {
  const activeMapElement = document.querySelector(".map.active");
  if (!activeMapElement) return null;
  return activeMapElement.getAttribute("data-map");
}

function getMapByName(mapName) {
  return state.maps.find((map) => map.name === mapName);
}

function getCurrentHeroCategory() {
  const activeTab = document.querySelector(".hero-list .tab-button.active");
  return activeTab ? activeTab.getAttribute("data-category") : "All";
}

function getCurrentMapCategory() {
  const activeTab = document.querySelector(".map-selection .tab-button.active");
  return activeTab ? activeTab.getAttribute("data-category") : "All";
}

function filterHeroesByCategory(heroesToFilter, category) {
  if (category === "All") return heroesToFilter;
  return heroesToFilter.filter((hero) => hero.category === category);
}

function filterMapsByCategory(mapsToFilter, category) {
  if (category === "All") return mapsToFilter;
  return mapsToFilter.filter((map) => map.category === category);
}

function getHeroStatPoint(heroName, rank, mapName) {
  const heroStats = state.stats?.heroes?.[heroName];
  if (!heroStats) return null;

  const rankKey = rank || "All";

  if (mapName && heroStats.maps && heroStats.maps[mapName]) {
    return (
      heroStats.maps[mapName][rankKey] ??
      heroStats.maps[mapName].All ??
      null
    );
  }

  return (
    heroStats.ranks?.[rankKey] ??
    heroStats.ranks?.All ??
    null
  );
}

function computeBaseScores(rank, mapName) {
  const formula = state.formula ?? {};
  const weights = formula.weights ?? { winRate: 0.7, pickRate: 0.3 };
  const scoreRange = formula.scoreRange ?? { min: 40, max: 100 };
  const roundTo = formula.roundTo ?? 10;
  const missingDataFallbackScore = formula.missingDataFallbackScore ?? 75;

  const byHero = new Map();
  for (const hero of state.heroes) {
    const point = getHeroStatPoint(hero.name, rank, mapName);
    if (point) byHero.set(hero.name, point);
  }

  const winRates = [];
  const pickRates = [];
  for (const point of byHero.values()) {
    if (Number.isFinite(point.winRate)) winRates.push(point.winRate);
    if (Number.isFinite(point.pickRate)) pickRates.push(point.pickRate);
  }

  const winMin = winRates.length ? Math.min(...winRates) : 0;
  const winMax = winRates.length ? Math.max(...winRates) : 1;
  const pickMin = pickRates.length ? Math.min(...pickRates) : 0;
  const pickMax = pickRates.length ? Math.max(...pickRates) : 1;

  const computedScores = new Map();
  for (const hero of state.heroes) {
    const point = byHero.get(hero.name);
    if (!point) {
      computedScores.set(
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

    const unrounded =
      scoreRange.min + combined * (scoreRange.max - scoreRange.min);

    const rounded = roundToStep(unrounded, roundTo);
    computedScores.set(
      hero.name,
      clamp(rounded, scoreRange.min, scoreRange.max),
    );
  }

  return computedScores;
}

function getTierForScore(score) {
  const thresholds = state.formula?.tierThresholds ?? {
    sTierMin: 95,
    aToBTierMin: 85,
    bToCTierMin: 75,
    cToDTierMin: 65,
    fTierMax: 55,
  };

  if (score >= thresholds.sTierMin) return "S";
  if (score >= thresholds.aToBTierMin) return "A-B";
  if (score >= thresholds.bToCTierMin) return "B-C";
  if (score >= thresholds.cToDTierMin) return "C-D";
  if (score <= thresholds.fTierMax) return "F";
  return "D";
}

function createHeroCard(hero, options = {}) {
  const isEnemyTeamCard = options.isEnemyTeamCard === true;
  const heroCard = document.createElement("div");
  heroCard.className = "hero";
  heroCard.setAttribute("data-category", hero.category);
  heroCard.setAttribute("data-hero-name", hero.name);
  heroCard.setAttribute("data-tier", getTierForScore(hero.score));
  applyHeroPortrait(hero, heroCard);

  const heroName = document.createElement("span");
  heroName.textContent = `${hero.name} - ${hero.score}`;
  heroCard.appendChild(heroName);

  if (!isEnemyTeamCard) {
    heroCard.addEventListener("click", () => {
      addHeroToEnemyTeam(hero);
    });
  }

  return heroCard;
}

function createMapCard(map) {
  const mapCard = document.createElement("div");
  mapCard.className = "map";
  mapCard.setAttribute("data-map", map.name);
  mapCard.style.backgroundImage = `url(images/Maps/${map.image})`;

  const mapName = document.createElement("span");
  mapName.textContent = map.name;
  mapCard.appendChild(mapName);

  mapCard.addEventListener("click", () => {
    if (mapCard.classList.contains("active")) {
      mapCard.classList.remove("active");
      recalculateScores();
      return;
    }

    document.querySelectorAll(".map").forEach((mapElement) => {
      mapElement.classList.remove("active");
    });
    mapCard.classList.add("active");
    recalculateScores();
  });

  return mapCard;
}

function displayHeroes(heroesToDisplay) {
  heroList.innerHTML = "";

  const currentCategory = getCurrentHeroCategory();
  const searchQuery = searchInput.value.toLowerCase().trim();

  let filtered = filterHeroesByCategory(heroesToDisplay, currentCategory);
  if (searchQuery) {
    filtered = filtered.filter((hero) =>
      hero.name.toLowerCase().includes(searchQuery),
    );
  }

  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (CATEGORY_ORDER[a.category] ?? 999) - (CATEGORY_ORDER[b.category] ?? 999);
  });

  filtered.forEach((hero) => {
    heroList.appendChild(createHeroCard(hero, { isEnemyTeamCard: false }));
  });
}

function displayMaps() {
  const mapList = document.getElementById("map-list");
  mapList.innerHTML = "";

  const currentCategory = getCurrentMapCategory();
  const filteredMaps = filterMapsByCategory(state.maps, currentCategory);

  filteredMaps.forEach((map) => {
    mapList.appendChild(createMapCard(map));
  });
}

function addHeroToEnemyTeam(heroToAdd) {
  const existingEnemyNames = Array.from(
    enemyTeamContainer.querySelectorAll(".hero"),
  ).map((card) => card.getAttribute("data-hero-name"));

  if (existingEnemyNames.includes(heroToAdd.name)) {
    return;
  }

  const teamLimitSelect = document.getElementById("enemy-team-limit-select");
  const teamLimit = Number.parseInt(teamLimitSelect.value, 10);
  if (enemyTeamContainer.children.length >= teamLimit) {
    alert(`Enemy team is already full (maximum ${teamLimit} heroes)`);
    return;
  }

  const enemyHeroCard = createHeroCard(heroToAdd, { isEnemyTeamCard: true });
  enemyHeroCard.classList.add("in-enemy-team");
  enemyHeroCard.addEventListener("click", () => {
    removeHeroFromEnemyTeam(enemyHeroCard);
  });

  enemyTeamContainer.appendChild(enemyHeroCard);
  recalculateScores();
}

function removeHeroFromEnemyTeam(cardElement) {
  enemyTeamContainer.removeChild(cardElement);
  recalculateScores();
}

function recalculateScores() {
  const selectedMapName = getActiveMapName();
  const baseScores = computeBaseScores(state.selectedRank, selectedMapName);

  for (const hero of state.heroes) {
    hero.score = baseScores.get(hero.name) ?? hero.originalScore ?? 75;
  }

  if (selectedMapName) {
    const selectedMap = getMapByName(selectedMapName);
    if (selectedMap?.counters) {
      for (const [heroName, adjustment] of Object.entries(selectedMap.counters)) {
        const hero = state.heroes.find((h) => h.name === heroName);
        if (hero) hero.score += adjustment;
      }
    }
  }

  const enemyTeamCards = enemyTeamContainer.querySelectorAll(".hero");
  enemyTeamCards.forEach((enemyCard) => {
    const enemyHeroName = enemyCard.getAttribute("data-hero-name");
    if (!enemyHeroName) return;

    const directlyCountered = state.counters[enemyHeroName] ?? [];
    directlyCountered.forEach((counteredHeroName) => {
      const hero = state.heroes.find((h) => h.name === counteredHeroName);
      if (hero) hero.score -= COUNTER_DELTA;
    });

    for (const [counterHeroName, counteredHeroes] of Object.entries(state.counters)) {
      if (!counteredHeroes.includes(enemyHeroName)) continue;
      const hero = state.heroes.find((h) => h.name === counterHeroName);
      if (hero) hero.score += COUNTER_DELTA;
    }
  });

  displayHeroes(state.heroes);
}

function setupRankSelector() {
  const availableRanks =
    state.stats?.ranks?.length > 0 ? state.stats.ranks : DEFAULT_RANKS;

  rankSelect.innerHTML = "";
  availableRanks.forEach((rank) => {
    const option = document.createElement("option");
    option.value = rank;
    option.textContent = rank;
    rankSelect.appendChild(option);
  });

  rankSelect.value = availableRanks.includes("All") ? "All" : availableRanks[0];
  state.selectedRank = rankSelect.value;

  rankSelect.addEventListener("change", () => {
    state.selectedRank = rankSelect.value;
    recalculateScores();
  });
}

function setupHeroCategoryTabs() {
  const heroTabButtons = document.querySelectorAll(".hero-list .tab-button");
  heroTabButtons.forEach((button) => {
    button.addEventListener("click", function onHeroCategoryClick() {
      heroTabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      displayHeroes(state.heroes);
    });
  });
}

function setupMapCategoryTabs() {
  const mapTabButtons = document.querySelectorAll(".map-selection .tab-button");
  mapTabButtons.forEach((button) => {
    button.addEventListener("click", function onMapCategoryClick() {
      mapTabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      displayMaps();
    });
  });
}

function setupFilterHandlers() {
  searchInput.addEventListener("input", () => {
    displayHeroes(state.heroes);
  });

  clearButton.addEventListener("click", () => {
    enemyTeamContainer.innerHTML = "";
    document.querySelectorAll(".map.active").forEach((map) => {
      map.classList.remove("active");
    });
    recalculateScores();
  });
}

function renderDataUpdatedAt() {
  const updatedAt = state.metadata?.updatedAt || state.stats?.updatedAt;
  if (!updatedAt) {
    dataUpdatedAt.textContent = "";
    return;
  }

  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) {
    dataUpdatedAt.textContent = "";
    return;
  }

  dataUpdatedAt.textContent = `Stats updated: ${date.toLocaleString()}`;
}

async function initializeData() {
  let loaded;
  const bundled = getBundledData();
  const isFileProtocol = window.location?.protocol === "file:";

  if (isFileProtocol && bundled) {
    loaded = [
      bundled.heroes,
      bundled.counters,
      bundled.maps,
      bundled.stats,
      bundled.formula,
      bundled.metadata ?? null,
    ];
  } else {
    try {
      loaded = await Promise.all([
        loadJson(DATA_FILES.heroes),
        loadJson(DATA_FILES.counters),
        loadJson(DATA_FILES.maps),
        loadJson(DATA_FILES.stats),
        loadJson(DATA_FILES.formula),
        loadJson(DATA_FILES.metadata),
      ]);
    } catch (error) {
      if (!bundled) throw error;
      console.warn("Falling back to bundled data after JSON fetch failure.", error);
      loaded = [
        bundled.heroes,
        bundled.counters,
        bundled.maps,
        bundled.stats,
        bundled.formula,
        bundled.metadata ?? null,
      ];
    }
  }
  const [heroesRaw, countersRaw, mapsRaw, statsRaw, formulaRaw, metadataRaw] = loaded;

  heroPortraitResolutionCache.clear();
  heroPortraitInFlight.clear();
  state.heroes = deepClone(heroesRaw).map((hero) => ({
    ...hero,
    score: Number.isFinite(hero.score) ? hero.score : 75,
    originalScore:
      Number.isFinite(hero.originalScore) ? hero.originalScore : hero.score ?? 75,
  }));
  state.counters = deepClone(countersRaw);
  state.maps = deepClone(mapsRaw);
  state.stats = deepClone(statsRaw);
  state.formula = deepClone(formulaRaw);
  state.metadata = deepClone(metadataRaw);
}

function renderStartupError(error) {
  console.error(error);
  const detail = error?.message ? ` (${error.message})` : "";
  heroList.innerHTML =
    `<div style="padding: 12px; color: #b00020;">Failed to load hero data${detail}. Check console for details.</div>`;
}

async function bootstrap() {
  try {
    await initializeData();
    setupRankSelector();
    setupHeroCategoryTabs();
    setupMapCategoryTabs();
    setupFilterHandlers();
    renderDataUpdatedAt();

    displayMaps();
    recalculateScores();
  } catch (error) {
    renderStartupError(error);
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
