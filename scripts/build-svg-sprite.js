import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ICONS_DIR = path.resolve('src/assets/icons');
const OUTPUT_DIR = path.resolve('public/assets/icons');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'sprite.svg');
const WATCH_MODE = process.argv.includes('--watch');
const WATCH_INTERVAL = 300;

const loadIcons = async () => {
  try {
    const entries = await readdir(ICONS_DIR, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
      .map((entry) => ({
        name: entry.name,
        path: path.join(ICONS_DIR, entry.name),
      }));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
};

const compileSprite = async (icons) => {
  let SVGSpriter;

  try {
    ({ default: SVGSpriter } = await import('svg-sprite'));
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      console.error('Missing dependency: svg-sprite. Run `pnpm install` before dev/build.');
      process.exit(1);
    }

    throw error;
  }

  const spriter = new SVGSpriter({
    mode: {
      symbol: {
        dest: '.',
        sprite: 'sprite.svg',
      },
    },
    shape: {
      id: {
        generator: (name) => path.basename(name, '.svg'),
      },
      transform: [],
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  });

  await Promise.all(
    icons.map(async (icon) => {
      const content = await readFile(icon.path, 'utf8');

      spriter.add(icon.path, icon.name, content);
    })
  );

  const result = await new Promise((resolve, reject) => {
    spriter.compile((error, compiled) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(compiled);
    });
  });

  return result.symbol.sprite.contents;
};

const buildSprite = async () => {
  const icons = await loadIcons();

  if (icons.length === 0) {
    await rm(OUTPUT_FILE, { force: true });
    console.log('SVG sprite skipped: no icons in src/assets/icons.');
    return;
  }

  const sprite = await compileSprite(icons);

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, sprite);

  console.log(`SVG sprite generated: public/assets/icons/sprite.svg (${icons.length} icons).`);
};

const getIconsSignature = async () => {
  const icons = await loadIcons();
  const parts = await Promise.all(
    icons.map(async (icon) => {
      const { mtimeMs, size } = await stat(icon.path);

      return `${icon.name}:${size}:${mtimeMs}`;
    })
  );

  return parts.sort().join('|');
};

const watchIcons = async () => {
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
        await buildSprite();
        lastSignature = await getIconsSignature();
      })
      .catch((error) => {
        console.error('SVG sprite build failed.');
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

  await buildSprite();
  lastSignature = await getIconsSignature();

  const watcher = setInterval(async () => {
    try {
      const nextSignature = await getIconsSignature();

      if (nextSignature !== lastSignature) {
        scheduleBuild();
      }
    } catch (error) {
      console.error('SVG sprite watcher failed.');
      console.error(error);
    }
  }, WATCH_INTERVAL);

  const stopWatching = () => {
    clearInterval(watcher);
    process.exit(0);
  };

  process.on('SIGINT', stopWatching);
  process.on('SIGTERM', stopWatching);

  console.log('Watching src/assets/icons for SVG changes...');
};

if (WATCH_MODE) {
  await watchIcons();
} else {
  await buildSprite();
}
