import { formatIsoNow, readJson } from "../utils.mjs";

export async function loadFallbackStats(options) {
  const { filePath, logger = console } = options;
  const snapshot = await readJson(filePath);
  logger.warn(`Using fallback stats snapshot from ${filePath}`);
  return {
    ...snapshot,
    source: "local_snapshot_fallback",
    updatedAt: formatIsoNow(),
  };
}
