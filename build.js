// build.js - simple recursive copy from src -> dist
const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error('Source folder not found:', src);
    process.exit(1);
  }
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// remove existing dist
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

copyDir('src', 'dist');
console.log('Build complete → dist/');
