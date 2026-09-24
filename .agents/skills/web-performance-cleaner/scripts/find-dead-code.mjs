#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'src');
const pkgPath = path.resolve(process.cwd(), 'package.json');

if (!fs.existsSync(srcDir)) {
  console.error('\x1b[31m[ERROR]\x1b[0m "src" directory not found.');
  process.exit(1);
}

function getSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getSourceFiles(filePath, fileList);
    } else {
      const ext = path.extname(file);
      if (['.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allSrcFiles = getSourceFiles(srcDir);
const fileContents = allSrcFiles.map(f => ({
  file: f,
  rel: path.relative(process.cwd(), f),
  content: fs.readFileSync(f, 'utf8'),
}));

console.log('\n\x1b[1m=== DEAD CODE & UNUSED ASSETS SCANNER ===\x1b[0m\n');

// 1. Check Package.json dependencies
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = Object.keys(pkg.dependencies || {});
  const unusedDeps = [];

  for (const dep of deps) {
    // Check if dep is imported anywhere in src or referenced in config
    const isUsed = fileContents.some(f => {
      return (
        f.content.includes(`'${dep}`) ||
        f.content.includes(`"${dep}`) ||
        f.content.includes(`from '${dep}'`) ||
        f.content.includes(`from "${dep}"`)
      );
    });

    if (!isUsed) {
      unusedDeps.push(dep);
    }
  }

  console.log('\x1b[1m1. Unused or Misplaced Client Dependencies:\x1b[0m');
  if (unusedDeps.length === 0) {
    console.log('  \x1b[32m✔ All declared dependencies appear in source code.\x1b[0m');
  } else {
    for (const dep of unusedDeps) {
      console.log(`  \x1b[33m⚠ ${dep}\x1b[0m (not directly imported in src/)`);
    }
    console.log('  \x1b[2mRecommendation: If server-only or build-time, move to devDependencies or remove.\x1b[0m');
  }
  console.log();
}

// 2. Check for potentially orphaned files
const entryFiles = ['main.', 'index.', 'App.', 'vite-env', 'setupTests'];
const orphanCandidates = [];

for (const f of fileContents) {
  const basename = path.basename(f.file);
  const nameWithoutExt = basename.replace(/\.[^/.]+$/, '');

  // Skip typical entry points
  if (entryFiles.some(entry => basename.startsWith(entry))) continue;

  const isImported = fileContents.some(other => {
    if (other.file === f.file) return false;
    return other.content.includes(nameWithoutExt);
  });

  if (!isImported) {
    orphanCandidates.push(f.rel);
  }
}

console.log('\x1b[1m2. Potential Orphan Files (Not imported anywhere in src):\x1b[0m');
if (orphanCandidates.length === 0) {
  console.log('  \x1b[32m✔ No orphan components detected.\x1b[0m');
} else {
  for (const candidate of orphanCandidates) {
    console.log(`  \x1b[33m⚠ ${candidate}\x1b[0m`);
  }
  console.log('  \x1b[2mReview whether these files can be safely deleted or integrated.\x1b[0m');
}
console.log();
