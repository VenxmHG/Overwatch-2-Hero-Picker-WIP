import fs from "node:fs/promises";
import path from "node:path";
import { heroImageSlug } from "../utils.mjs";

function extensionFromUrl(url) {
  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".webp" || ext === ".png") {
      return ext;
    }
  } catch {
    // Ignore parse failures and use default.
  }
  return ".png";
}

async function downloadToFile(url, filePath) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "overwatch-hero-picker-data-sync/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`Portrait download failed (${response.status}): ${url}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, bytes);
}

function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function needsPortraitDownload(existingHero, imagesDir) {
  if (!existingHero) return true;

  const existingImage = typeof existingHero.image === "string"
    ? existingHero.image.trim()
    : "";

  if (!existingImage) return true;
  if (isHttpUrl(existingImage)) return false;

  return !(await fileExists(path.join(imagesDir, existingImage)));
}

export async function syncPortraits(options) {
  const {
    catalog,
    heroesByName,
    imagesDir,
    refreshExisting = false,
    logger = console,
  } = options;

  const updates = new Map();
  const failures = [];

  for (const catalogHero of catalog) {
    const existingHero = heroesByName.get(catalogHero.name);
    const shouldRefresh =
      refreshExisting ||
      (await needsPortraitDownload(existingHero, imagesDir));

    if (!shouldRefresh) continue;
    if (!catalogHero.portraitUrl) continue;

    try {
      const slug = heroImageSlug(catalogHero.name);
      const ext = extensionFromUrl(catalogHero.portraitUrl);
      const imageFileName =
        typeof existingHero?.image === "string" &&
          existingHero.image.trim().length > 0 &&
          !isHttpUrl(existingHero.image)
          ? existingHero.image.trim()
          : `${slug}-portrait-small${ext}`;
      const destination = path.join(imagesDir, imageFileName);
      await downloadToFile(catalogHero.portraitUrl, destination);
      updates.set(catalogHero.name, imageFileName);
      logger.log(`Downloaded portrait for ${catalogHero.name} -> images/${imageFileName}`);
    } catch (error) {
      failures.push({ hero: catalogHero.name, message: error.message });
      logger.warn(`Portrait download failed for ${catalogHero.name}: ${error.message}`);
    }
  }

  return { updates, failures };
}
