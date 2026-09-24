#!/usr/bin/env bash
# Web Performance & Workspace Cruft Cleaner

set -e

echo "=== Cleaning Cruft & Temporary Files ==="

RECLAIMED=0

# Clean .DS_Store files
echo "→ Removing macOS .DS_Store files..."
find . -name ".DS_Store" -type f -delete 2>/dev/null || true

# Clean vite/build caches
echo "→ Cleaning Vite & bundler caches..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf .parcel-cache 2>/dev/null || true
rm -rf .next/cache 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true

# Clean log files
echo "→ Cleaning npm and yarn log files..."
rm -f npm-debug.log* yarn-debug.log* yarn-error.log* pnpm-debug.log* 2>/dev/null || true

# Clean coverage and test artifacts
echo "→ Cleaning test coverage artifacts..."
rm -rf coverage .nyc_output 2>/dev/null || true

echo "✔ Cleanup completed successfully!"
