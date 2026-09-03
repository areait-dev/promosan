// scripts/optimize-images.mjs
//
// Ridimensiona/comprime in batch le immagini di public/assets/img/ che
// superano una soglia di peso, mantenendo lo stesso nome/estensione (nessun
// riferimento nel codice da aggiornare). Max 1920px sul lato lungo, qualità
// 75-80%. Usa sharp (devDependency).
//
// Uso: node scripts/optimize-images.mjs [--dry-run]

import { readdir, stat, writeFile, rename } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Su Windows, processare molti file in sequenza senza questi limiti può
// esaurire gli handle nativi di libvips ("unknown error, open ...") dopo le
// prime decine di immagini.
sharp.cache(false);
sharp.concurrency(1);

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const IMG_DIR = join(__dirname, '..', 'public', 'assets', 'img');

const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 78;
const PNG_QUALITY = 78;
const MIN_SIZE_TO_PROCESS = 300 * 1024; // 300 KB: sotto questa soglia non ne vale la pena

const DRY_RUN = process.argv.includes('--dry-run');

function fmt(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function processFile(filePath) {
  const before = (await stat(filePath)).size;
  if (before < MIN_SIZE_TO_PROCESS) return null;

  const ext = extname(filePath).toLowerCase();
  const buffer = await sharp(filePath).rotate().toBuffer();
  const image = sharp(buffer);
  const meta = await image.metadata();

  let pipeline = image;
  if ((meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION) {
    pipeline = pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
  } else {
    return null; // altri formati non toccati
  }

  const outBuffer = await pipeline.toBuffer();
  const after = outBuffer.length;

  if (!DRY_RUN && after < before) {
    // Scrittura su file temporaneo + rename: su Windows la scrittura diretta
    // sullo stesso path a volte fallisce ("unknown error, open") per lock
    // di antivirus/indexer; il rename è invece atomico e non urta il lock.
    const tmpPath = `${filePath}.tmp${process.pid}`;
    await writeFile(tmpPath, outBuffer);
    await rename(tmpPath, filePath);
  }

  return { before, after };
}

async function main() {
  const entries = await readdir(IMG_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;

  for (const entry of entries) {
    const filePath = join(IMG_DIR, entry);
    const s = await stat(filePath);
    if (!s.isFile()) continue;

    try {
      const result = await processFile(filePath);
      if (!result) continue;
      const { before, after } = result;
      totalBefore += before;
      totalAfter += after;
      processed++;
      const pct = (100 * (1 - after / before)).toFixed(0);
      console.log(`${DRY_RUN ? '[dry-run] ' : ''}${entry}: ${fmt(before)} -> ${fmt(after)} (-${pct}%)`);
    } catch (err) {
      console.error(`Errore su ${entry}:`, err.message);
    }
  }

  console.log('----------------------------------------');
  console.log(`File processati: ${processed}`);
  console.log(`Totale prima: ${fmt(totalBefore)}`);
  console.log(`Totale dopo:  ${fmt(totalAfter)}`);
  if (totalBefore > 0) {
    console.log(`Risparmio:    ${(100 * (1 - totalAfter / totalBefore)).toFixed(1)}%`);
  }
}

main();
