import EmblaCarousel from 'embla-carousel';

/** @typedef {import('embla-carousel').EmblaCarouselType} EmblaCarouselType */
/** @typedef {import('embla-carousel').EmblaOptionsType} EmblaOptionsType */

const carouselRegistry = new WeakMap();

/**
 * Replaces `{key}` placeholders in a label template.
 * @param {string} template The template string.
 * @param {Record<string, number|string>} values Placeholder values.
 * @returns {string}
 */
const formatLabel = (template, values) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );

/**
 * Parses Embla options from the carousel dataset.
 * @param {HTMLElement} carousel The carousel root element.
 * @returns {EmblaOptionsType}
 */
const parseOptions = (carousel) => {
  const { carouselOptions } = carousel.dataset;

  if (!carouselOptions) {
    return {};
  }

  try {
    const parsedOptions = JSON.parse(carouselOptions);

    return typeof parsedOptions === 'object' && parsedOptions !== null ? parsedOptions : {};
  } catch {
    return {};
  }
};

/**
 * Updates disabled state for a navigation button.
 * @param {Element|null} element The button element.
 * @param {boolean} isDisabled Whether the button should be disabled.
 * @returns {void}
 */
const toggleButtonState = (element, isDisabled) => {
  if (!(element instanceof HTMLButtonElement)) {
    return;
  }

  element.disabled = isDisabled;
  element.setAttribute('aria-disabled', isDisabled.toString());
};

/**
 * Updates the live region with the current slide position.
 * @param {HTMLElement} carousel The carousel root element.
 * @param {EmblaCarouselType} embla The Embla instance.
 * @returns {void}
 */
const updateStatus = (carousel, embla) => {
  const status = carousel.querySelector('[data-role="carousel-status"]');

  if (!(status instanceof HTMLElement)) {
    return;
  }

  const total = embla.scrollSnapList().length;

  if (total <= 1) {
    status.textContent = '';
    return;
  }

  const template = carousel.dataset.carouselStatusLabel || 'Slide {index} of {total}';

  status.textContent = formatLabel(template, {
    index: embla.selectedScrollSnap() + 1,
    total,
  });
};

/**
 * Rebuilds pagination dots for the carousel.
 * @param {HTMLElement} carousel The carousel root element.
 * @param {EmblaCarouselType} embla The Embla instance.
 * @returns {void}
 */
const renderDots = (carousel, embla) => {
  const pagination = carousel.querySelector('[data-role="carousel-pagination"]');

  if (!(pagination instanceof HTMLElement)) {
    return;
  }

  const goToLabel = carousel.dataset.carouselGoToLabel || 'Go to slide {index}';
  const total = embla.scrollSnapList().length;
  const controlsId = carousel.dataset.carouselViewportId || carousel.id;

  pagination.replaceChildren();

  embla.scrollSnapList().forEach((_, index) => {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-controls', controlsId);
    dot.setAttribute(
      'aria-label',
      formatLabel(goToLabel, {
        index: index + 1,
        total,
      })
    );
    dot.dataset.index = index.toString();
    dot.addEventListener('click', () => {
      embla.scrollTo(index);
    });

    pagination.append(dot);
  });
};

/**
 * Synchronizes navigation buttons, dots and state classes.
 * @param {HTMLElement} carousel The carousel root element.
 * @param {EmblaCarouselType} embla The Embla instance.
 * @returns {void}
 */
const syncCarouselState = (carousel, embla) => {
  const prevButton = carousel.querySelector('[data-role="carousel-prev"]');
  const nextButton = carousel.querySelector('[data-role="carousel-next"]');
  const dots = Array.from(carousel.querySelectorAll('.dot'));
  const snapCount = embla.scrollSnapList().length;
  const selectedIndex = embla.selectedScrollSnap();
  const isStatic = snapCount <= 1;

  carousel.classList.toggle('is-inactive', isStatic);

  toggleButtonState(prevButton, isStatic || !embla.canScrollPrev());
  toggleButtonState(nextButton, isStatic || !embla.canScrollNext());

  dots.forEach((dot, index) => {
    if (!(dot instanceof HTMLButtonElement)) {
      return;
    }

    const isSelected = index === selectedIndex;

    dot.classList.toggle('is-active', isSelected);

    if (isSelected) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });

  updateStatus(carousel, embla);
};

/**
 * Initializes a single carousel instance.
 * @param {HTMLElement} carousel The carousel root element.
 * @returns {void}
 */
const initCarousel = (carousel) => {
  if (carouselRegistry.has(carousel)) {
    return;
  }

  const viewport = carousel.querySelector('[data-role="carousel-viewport"]');

  if (!(viewport instanceof HTMLElement)) {
    return;
  }

  const embla = EmblaCarousel(viewport, parseOptions(carousel));
  const prevButton = carousel.querySelector('[data-role="carousel-prev"]');
  const nextButton = carousel.querySelector('[data-role="carousel-next"]');

  prevButton?.addEventListener('click', () => {
    embla.scrollPrev();
  });

  nextButton?.addEventListener('click', () => {
    embla.scrollNext();
  });

  const sync = () => {
    syncCarouselState(carousel, embla);
  };

  const rebuild = () => {
    renderDots(carousel, embla);
    sync();
  };

  rebuild();
  embla.on('reInit', rebuild);
  embla.on('select', sync);

  carouselRegistry.set(carousel, embla);
};

/**
 * Initializes all carousels inside the provided root.
 * @param {ParentNode} [root=document] The root node to scan.
 * @returns {void}
 */
export default function initCarousels(root = document) {
  root.querySelectorAll('[data-role="carousel"]').forEach((carousel) => {
    if (carousel instanceof HTMLElement) {
      initCarousel(carousel);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      initCarousels();
    },
    { once: true }
  );
} else {
  initCarousels();
}

document.addEventListener('astro:page-load', () => {
  initCarousels();
});
