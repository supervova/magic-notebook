import { spawn } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const astroPackagePath = require.resolve('astro/package.json');
const astroPackage = require(astroPackagePath);
const astroBin = path.resolve(path.dirname(astroPackagePath), astroPackage.bin.astro);

const spriteWatcher = spawn(process.execPath, ['scripts/build-svg-sprite.js', '--watch'], {
  stdio: 'inherit',
});
const cssImagesWatcher = spawn(process.execPath, ['scripts/optimize-public-images.js', '--watch'], {
  stdio: 'inherit',
});

const astroDev = spawn(process.execPath, [astroBin, 'dev'], {
  stdio: 'inherit',
});

const stopChildren = (code = 0) => {
  if (!spriteWatcher.killed) {
    spriteWatcher.kill('SIGTERM');
  }

  if (!cssImagesWatcher.killed) {
    cssImagesWatcher.kill('SIGTERM');
  }

  if (!astroDev.killed) {
    astroDev.kill('SIGTERM');
  }

  process.exit(code);
};

spriteWatcher.on('exit', (code) => {
  if (code !== 0) {
    stopChildren(code ?? 1);
  }
});

cssImagesWatcher.on('exit', (code) => {
  if (code !== 0) {
    stopChildren(code ?? 1);
  }
});

astroDev.on('exit', (code) => {
  stopChildren(code ?? 0);
});

process.on('SIGINT', () => {
  stopChildren(0);
});

process.on('SIGTERM', () => {
  stopChildren(0);
});
