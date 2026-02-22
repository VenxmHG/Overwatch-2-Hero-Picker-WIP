import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const repoRoot = process.cwd();
const scriptPath = path.join(repoRoot, "script.js");
const source = await fs.readFile(scriptPath, "utf8");

function extractConstExpression(code, constName) {
  const token = `const ${constName} =`;
  const start = code.indexOf(token);
  if (start === -1) {
    throw new Error(`Could not find declaration for "${constName}"`);
  }

  let i = start + token.length;
  while (i < code.length && /\s/.test(code[i])) i += 1;
  const opener = code[i];
  const closer = opener === "[" ? "]" : opener === "{" ? "}" : null;
  if (!closer) {
    throw new Error(`Unsupported opener "${opener}" for ${constName}`);
  }

  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let cursor = i; cursor < code.length; cursor += 1) {
    const ch = code[cursor];
    const next = code[cursor + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        cursor += 1;
      }
      continue;
    }

    if (inSingle || inDouble || inTemplate) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (inSingle && ch === "'") inSingle = false;
      else if (inDouble && ch === '"') inDouble = false;
      else if (inTemplate && ch === "`") inTemplate = false;
      continue;
    }

    if (ch === "/" && next === "/") {
      inLineComment = true;
      cursor += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      cursor += 1;
      continue;
    }

    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "`") {
      inTemplate = true;
      continue;
    }

    if (ch === opener) depth += 1;
    if (ch === closer) {
      depth -= 1;
      if (depth === 0) {
        return code.slice(i, cursor + 1);
      }
    }
  }

  throw new Error(`Failed to parse "${constName}" expression`);
}

function evalExpression(expression) {
  const wrapped = `(${expression})`;
  return vm.runInNewContext(wrapped, {}, { timeout: 10_000 });
}

const heroes = evalExpression(extractConstExpression(source, "heroes"));
const counters = evalExpression(extractConstExpression(source, "counters"));
const maps = evalExpression(extractConstExpression(source, "maps"));

await fs.mkdir(path.join(repoRoot, "data"), { recursive: true });

await fs.writeFile(
  path.join(repoRoot, "data", "heroes.json"),
  `${JSON.stringify(heroes, null, 2)}\n`,
  "utf8",
);

await fs.writeFile(
  path.join(repoRoot, "data", "counters.json"),
  `${JSON.stringify(counters, null, 2)}\n`,
  "utf8",
);

await fs.writeFile(
  path.join(repoRoot, "data", "maps.json"),
  `${JSON.stringify(maps, null, 2)}\n`,
  "utf8",
);

console.log("Extracted data/heroes.json, data/counters.json, and data/maps.json");
