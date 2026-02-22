# Overwatch Hero Picker

Static Overwatch hero picker with rank-aware score calculation and automated hero/stat sync.

## Data Files

- `data/heroes.json`: hero roster, role category, local portrait filename, API portrait fallback URL, baseline score
- `data/counters.json`: manual hero counter relationships
- `data/maps.json`: map list and manual per-map score adjustments
- `data/stats/by_rank_map.json`: win/pick rates by hero, rank, and map
- `data/score_formula.json`: score formula configuration and tier thresholds
- `data/metadata.json`: sync metadata and last update timestamp
- `data/bundle.js`: browser-ready data bundle for `file://` and static hosting fallback

## Local Commands

- `npm run data:extract-legacy`  
  Extract current hardcoded arrays from `script.js` into JSON files.

- `npm run data:seed-stats`  
  Generate seeded stats/formula metadata for bootstrapping.

- `npm run data:sync`  
  Sync hero roster + portraits + stats from upstream sources.
  Official rates scraping defaults to **Competitive - Role Queue**.

### Optional flags for sync

- `--refresh-portraits`: re-download portraits for all heroes (default sync downloads new + missing portraits)
- `--skip-official`: skip official rates scraper and use local snapshot fallback
- `--skip-catalog`: skip hero catalog/portrait network sync
- `--dry-run`: run and print summary without writing files

## Automation

Daily GitHub Action: `.github/workflows/overwatch-data-sync.yml`

It runs `node scripts/update-overwatch-data.mjs` and opens/updates a PR with changed data/assets.
