import { copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = path.resolve('src/assets/img/css');
const OUTPUT_DIR = path.resolve('public/assets/img');
const WATCH_MODE = process.argv.includes('--watch');
const WATCH_INTERVAL = 300;
const RASTER_EXTENSIONS = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);
const JPEG_OPTIONS = {
  chromaSubsampling: '4:4:4',
  progressive: true,
  quality: 92,
};

const loadFiles = async (dir = SOURCE_DIR) => {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          return loadFiles(fullPath);
        }

        return fullPath;
      })
    );

    return files.flat().sort();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
};

const optimizeRaster = async (sharp, inputPath, outputPath, extension) => {
  const image = sharp(inputPath, { animated: true });

  if (extension === '.png') {
    await image.png({ adaptiveFiltering: true, compressionLevel: 9 }).toFile(outputPath);
    return;
  }

  if (extension === '.jpg' || extension === '.jpeg') {
    await image.jpeg(JPEG_OPTIONS).toFile(outputPath);
    return;
  }

  if (extension === '.webp') {
    await image.webp({ quality: 85 }).toFile(outputPath);
    return;
  }

  if (extension === '.avif') {
    await image.avif({ quality: 60 }).toFile(outputPath);
  }
};

const buildImages = async () => {
  const files = await loadFiles();

  await rm(OUTPUT_DIR, { force: true, recursive: true });

  if (files.length === 0) {
    console.log('CSS images skipped: no files in src/assets/img/css.');
    return;
  }

  let sharp;

  try {
    ({ default: sharp } = await import('sharp'));
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      console.error('Missing dependency: sharp. Run `pnpm install` before dev/build.');
      process.exit(1);
    }

    throw error;
  }

  await Promise.all(
    files.map(async (inputPath) => {
      const relativePath = path.relative(SOURCE_DIR, inputPath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      const extension = path.extname(inputPath).toLowerCase();

      await mkdir(path.dirname(outputPath), { recursive: true });

      if (RASTER_EXTENSIONS.has(extension)) {
        await optimizeRaster(sharp, inputPath, outputPath, extension);
        return;
      }

      await copyFile(inputPath, outputPath);
    })
  );

  console.log(`CSS images generated: public/assets/img (${files.length} files).`);
};

const getFilesSignature = async () => {
  const files = await loadFiles();
  const parts = await Promise.all(
    files.map(async (filePath) => {
      const { mtimeMs, size } = await stat(filePath);

      return `${path.relative(SOURCE_DIR, filePath)}:${size}:${mtimeMs}`;
    })
  );

  return parts.join('|');
};

const watchImages = async () => {
  let isBuilding = false;
  let hasPendingBuild = false;
  let lastSignature = '';

  const scheduleBuild = () => {
    if (isBuilding) {
      hasPendingBuild = true;
      return;
    }

    isBuilding = true;

    Promise.resolve()
      .then(async () => {
        await buildImages();
        lastSignature = await getFilesSignature();
      })
      .catch((error) => {
        console.error('CSS images build failed.');
        console.error(error);
      })
      .finally(() => {
        isBuilding = false;

        if (hasPendingBuild) {
          hasPendingBuild = false;
          scheduleBuild();
        }
      });
  };

  await buildImages();
  lastSignature = await getFilesSignature();

  const watcher = setInterval(async () => {
    try {
      const nextSignature = await getFilesSignature();

      if (nextSignature !== lastSignature) {
        scheduleBuild();
      }
    } catch (error) {
      console.error('CSS images watcher failed.');
      console.error(error);
    }
  }, WATCH_INTERVAL);

  const stopWatching = () => {
    clearInterval(watcher);
    process.exit(0);
  };

  process.on('SIGINT', stopWatching);
  process.on('SIGTERM', stopWatching);

  console.log('Watching src/assets/img/css for image changes...');
};

if (WATCH_MODE) {
  await watchImages();
} else {
  await buildImages();
}
