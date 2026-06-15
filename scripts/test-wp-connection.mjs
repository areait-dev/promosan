#!/usr/bin/env node
// scripts/test-wp-connection.mjs
//
// Testa la raggiungibilità degli endpoint REST di WordPress (wp.promosan.eu)
// usati dal frontend. Legge NEXT_PUBLIC_WORDPRESS_URL da .env.local.
//
// Uso: npm run test:wp

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = join(__dirname, "..", ".env.local");

/* -------------------------------------------------------------------------- */
/*                       Lettura .env.local (minimale)                        */
/* -------------------------------------------------------------------------- */

async function loadEnv(path) {
  let content;
  try {
    content = await readFile(path, "utf8");
  } catch {
    return {};
  }
  const env = {};
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    // Rimuove eventuali virgolette
    value = value.replace(/^['"]|['"]$/g, "");
    env[key] = value;
  }
  return env;
}

/* -------------------------------------------------------------------------- */
/*                                  Main                                       */
/* -------------------------------------------------------------------------- */

const env = await loadEnv(ENV_PATH);
const BASE_URL = (
  env.NEXT_PUBLIC_WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://wp.promosan.eu"
).replace(/\/$/, "");

const ENDPOINTS = [
  "/wp-json/wp/v2/posts",
  "/wp-json/wp/v2/news",
  "/wp-json/wp/v2/sedi",
  "/wp-json/wp/v2/pacchetti",
  "/wp-json/wp/v2/faq",
  "/wp-json/wp/v2/pages?slug=opzioni-globali",
];

const PASS = "✅"; // ✅
const FAIL = "❌"; // ❌
const TIMEOUT_MS = 10000;

console.log(`\n🔌 Test connessione WordPress`);
console.log(`   Base URL: ${BASE_URL}\n`);

async function testEndpoint(path) {
  const url = `${BASE_URL}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.log(`${FAIL} ${path}  →  HTTP ${res.status} ${res.statusText}`);
      return false;
    }

    const text = await res.text();
    const preview = text.replace(/\s+/g, " ").slice(0, 200);
    console.log(`${PASS} ${path}  →  HTTP ${res.status}`);
    console.log(`     ${preview}${text.length > 200 ? "…" : ""}\n`);
    return true;
  } catch (error) {
    clearTimeout(timer);
    const reason =
      error.name === "AbortError"
        ? `timeout dopo ${TIMEOUT_MS}ms`
        : error.cause?.code || error.message;
    console.log(`${FAIL} ${path}  →  ${reason}`);
    return false;
  }
}

let ok = 0;
for (const path of ENDPOINTS) {
  const success = await testEndpoint(path);
  if (success) ok++;
}

const total = ENDPOINTS.length;
console.log("─".repeat(50));
console.log(`📊 Riepilogo: ${ok}/${total} endpoint funzionanti`);

if (ok === total) {
  console.log(`${PASS} Tutti gli endpoint rispondono correttamente.\n`);
} else if (ok === 0) {
  console.log(`${FAIL} Nessun endpoint raggiungibile. Verifica URL, DNS, certificato TLS e plugin WordPress.\n`);
} else {
  console.log(`⚠️  Alcuni endpoint non rispondono: controlla CPT/route mancanti su WordPress.\n`);
}

// Exit code: 0 se tutti ok, 1 altrimenti (utile per CI).
process.exit(ok === total ? 0 : 1);
