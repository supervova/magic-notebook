# Astro-компонент для product video

- HTML5 `<video>`;
- `mp4 + webm`;
- `track` для субтитров;
- автоподбор дорожки по языку браузера;
- ручной выбор сабов через нативный контрол видео;
- `poster`;
- безопасный fallback;
- без привязки к React.

## Структура файлов

```txt
src/
  components/
    marketing/
      product-video.astro

public/
  media/
    product-video/
      magic-notebook-product-video.mp4
      magic-notebook-product-video.webm
      magic-notebook-product-video-poster.jpg
      subtitles.en.vtt
      subtitles.ru.vtt
```

## `src/components/marketing/product-video.astro`

```astro

export interface ProductVideoSubtitleTrack {
  kind?: 'subtitles' | 'captions';
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
}

export interface ProductVideoProps {
  id?: string;
  class?: string;
  title?: string;
  poster: string;
  mp4Src: string;
  webmSrc?: string;
  subtitles?: ProductVideoSubtitleTrack[];
  preload?: 'none' | 'metadata' | 'auto';
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsinline?: boolean;
  ariaLabel?: string;
}

const {
  id = 'product-video',
  class: className = '',
  title = 'Magic Notebook product video',
  poster,
  mp4Src,
  webmSrc,
  subtitles = [],
  preload = 'metadata',
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  playsinline = true,
  ariaLabel = 'Product video preview',
} = Astro.props;

const componentId = `${id}-component`;
const videoId = `${id}-element`;
const hasSubtitles = subtitles.length > 0;


<div
  id={componentId}
  class:list={['product-video', className]}
  data-video-id={videoId}
  data-has-subtitles={hasSubtitles ? 'true' : 'false'}
>
  <video
    id={videoId}
    class='product-video__media'
    poster={poster}
    preload={preload}
    controls={controls}
    autoplay={autoplay}
    muted={muted}
    loop={loop}
    playsinline={playsinline}
    aria-label={ariaLabel}
  >
    {webmSrc && <source src={webmSrc} type='video/webm' />}
    <source src={mp4Src} type='video/mp4' />

    {subtitles.map(track => (
      <track
        kind={track.kind ?? 'subtitles'}
        src={track.src}
        srclang={track.srclang}
        label={track.label}
        default={track.default}
      />
    ))}

    <p class='product-video__fallback'>
      Your browser does not support HTML5 video.
      <a href={mp4Src}>Download the video</a>.
    </p>
  </video>

  <noscript>
    <p class='product-video__noscript'>
      JavaScript is disabled. Subtitles can still be enabled from the video
      player if your browser supports text tracks.
    </p>
  </noscript>
</div>

<script define:vars={{componentId, videoId}}>
  const component = document.getElementById(componentId);

  if (component instanceof HTMLElement) {
    const video = document.getElementById(videoId);

    if (video instanceof HTMLVideoElement) {
      const normalizeLanguage = value => value.toLowerCase().split('-')[0];

      const getPreferredLanguages = () => {
        const browserLanguages = Array.isArray(navigator.languages)
          ? navigator.languages
          : [];

        const values = browserLanguages.length > 0
          ? browserLanguages
          : [navigator.language];

        return values
          .filter(Boolean)
          .map(normalizeLanguage);
      };

      const disableAllTracks = () => {
        for (const track of Array.from(video.textTracks)) {
          track.mode = 'disabled';
        }
      };

      const enablePreferredTrack = () => {
        if (video.textTracks.length === 0) {
          return;
        }

        const preferredLanguages = getPreferredLanguages();
        const tracks = Array.from(video.textTracks);

        disableAllTracks();

        for (const preferredLanguage of preferredLanguages) {
          const matchedTrack = tracks.find(
            track => normalizeLanguage(track.language) === preferredLanguage,
          );

          if (matchedTrack) {
            matchedTrack.mode = 'showing';
            return;
          }
        }

        const defaultEnglishTrack = tracks.find(
          track => normalizeLanguage(track.language) === 'en',
        );

        if (defaultEnglishTrack) {
          defaultEnglishTrack.mode = 'showing';
        }
      };

      const applyTrackSelection = () => {
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          enablePreferredTrack();
          return;
        }

        video.addEventListener(
          'loadedmetadata',
          () => {
            enablePreferredTrack();
          },
          { once: true },
        );
      };

      applyTrackSelection();
    }
  }
</script>

<style>
  .product-video {
    width: 100%;
  }

  .product-video__media {
    display: block;
    width: 100%;
    height: auto;
    border: 0;
    border-radius: 20px;
    background: #000;
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.18),
      0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .product-video__fallback,
  .product-video__noscript {
    margin-top: 12px;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .product-video__fallback a {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .product-video__media {
      border-radius: 16px;
    }
  }
</style>
```

## Использование на Astro-странице

Например, в `src/pages/index.astro`:

```astro

import { ProductVideo } from '@/components/marketing/product-video.astro';


<ProductVideo
  id='hero-product-video'
  title='Magic Notebook product video'
  ariaLabel='Magic Notebook product video'
  poster='/media/product-video/magic-notebook-product-video-poster.jpg'
  mp4Src='/media/product-video/magic-notebook-product-video.mp4'
  webmSrc='/media/product-video/magic-notebook-product-video.webm'
  subtitles={[
    {
      src: '/media/product-video/subtitles.en.vtt',
      srclang: 'en',
      label: 'English',
      default: true,
    },
    {
      src: '/media/product-video/subtitles.ru.vtt',
      srclang: 'ru',
      label: 'Русский',
    },
  ]}
  preload='metadata'
  controls={true}
  autoplay={false}
  muted={false}
  loop={false}
  playsinline={true}
/>
```

## Если у тебя alias `@/` в Astro ещё не настроен

Тогда импорт так:

```astro

import ProductVideo from '../../components/marketing/product-video.astro';

```

Но лучше всё же держать alias единообразно.

## Важное замечание по Astro-импорту

Для `.astro` обычно используется **default import** на стороне потребителя, даже если внутри файла есть `export interface`.
Поэтому правильнее использовать так:

```astro

import ProductVideo from '@/components/marketing/product-video.astro';

```

## Рекомендованные параметры именно для твоего кейса

Для hero-блока сайта я бы ставил:

```astro
autoplay={false}
muted={false}
loop={false}
controls={true}
preload='metadata'
```

Почему:

- это не фон, а содержательный product film;
- пользователь должен запускать его осознанно;
- так меньше проблем с autoplay policy браузеров.

## Если нужен вариант для hero-preview

Можно сделать второй режим:

```astro
autoplay={true}
muted={true}
loop={true}
controls={false}
```

Но только если это отдельный короткий teaser, а не основной ролик.

## Что ещё стоит добавить рядом на странице

Рядом с видео хорошо работает блок:

- короткий заголовок;
- 1–2 строки описания;
- кнопка `Watch with subtitles`;
- кнопка `Download for macOS`.

