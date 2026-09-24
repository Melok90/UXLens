#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const targetDir = process.argv[2] || 'dist';
const resolvedDir = path.resolve(process.cwd(), targetDir);

if (!fs.existsSync(resolvedDir)) {
  console.error(`\x1b[31m[ERROR]\x1b[0m Directory "${targetDir}" not found. Run your build command first (e.g., npm run build).`);
  process.exit(1);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(resolvedDir);
const assets = [];

for (const filePath of allFiles) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.css', '.html', '.svg', '.png', '.jpg', '.webp'].includes(ext)) continue;

  const content = fs.readFileSync(filePath);
  const rawSize = content.length;
  const gzipSize = zlib.gzipSync(content).length;
  const relPath = path.relative(resolvedDir, filePath);

  assets.push({
    path: relPath,
    ext,
    rawSize,
    gzipSize,
  });
}

assets.sort((a, b) => b.gzipSize - a.gzipSize);

console.log('\n\x1b[1m=== BUNDLE ASSET ANALYSIS ===\x1b[0m\n');
console.log(
  'Chunk / Asset'.padEnd(50) +
  'Type'.padEnd(10) +
  'Raw Size'.padEnd(15) +
  'Gzip Size'.padEnd(15) +
  'Status'
);
console.log('-'.repeat(100));

let totalRaw = 0;
let totalGzip = 0;

for (const asset of assets) {
  totalRaw += asset.rawSize;
  totalGzip += asset.gzipSize;

  const rawKb = (asset.rawSize / 1024).toFixed(1) + ' kB';
  const gzipKb = (asset.gzipSize / 1024).toFixed(1) + ' kB';

  let status = '\x1b[32m[PASS]\x1b[0m';
  if (asset.gzipSize > 100 * 1024) {
    status = '\x1b[31m[CRITICAL > 100kB gzip]\x1b[0m';
  } else if (asset.gzipSize > 50 * 1024) {
    status = '\x1b[33m[WARN > 50kB gzip]\x1b[0m';
  }

  console.log(
    asset.path.padEnd(50) +
    asset.ext.padEnd(10) +
    rawKb.padEnd(15) +
    gzipKb.padEnd(15) +
    status
  );
}

console.log('-'.repeat(100));
console.log(
  'TOTAL'.padEnd(60) +
  ((totalRaw / 1024).toFixed(1) + ' kB').padEnd(15) +
  ((totalGzip / 1024).toFixed(1) + ' kB').padEnd(15)
);

console.log('\n\x1b[1mRecommendations:\x1b[0m');
if (assets.some(a => a.gzipSize > 50 * 1024 && a.ext === '.js')) {
  console.log('• Use dynamic imports (React.lazy / import()) for heavy modals, non-critical routes, and third-party libraries.');
  console.log('• Configure manualChunks in vite.config.ts / webpack to split vendor code into cacheable chunks.');
} else {
  console.log('• Great job! All bundle chunks are below 50kB gzip.');
}
console.log();
