const animationDuration = 400;

let visibleModal = null;

/**
 * Инициализирует модальные окна playground по атрибутам `data-action` и `aria-controls`.
 * @returns {void}
 */
export default function initModals() {
  document.addEventListener('click', handleBackdropClick);

  document.querySelectorAll('[data-action="close-modal"]').forEach((button) => {
    button.addEventListener('click', handleCloseClick);
  });

  document.querySelectorAll('[data-action="open-modal"]').forEach((button) => {
    button.addEventListener('click', handleOpenClick);
  });
}

const handleBackdropClick = (event) => {
  if (visibleModal === null) return;

  const modalContent = visibleModal.firstElementChild;
  if (!(modalContent instanceof HTMLElement)) return;

  if (!modalContent.contains(event.target)) {
    closeModal(visibleModal);
  }
};

const handleCloseClick = (event) => {
  const modal = event.currentTarget.closest('.modal');
  if (!(modal instanceof HTMLDialogElement)) return;

  closeModal(modal);
};

const handleOpenClick = (event) => {
  event.preventDefault();

  const trigger = event.currentTarget;
  const modalId = trigger.getAttribute('aria-controls');

  if (!modalId) return;

  const modal = document.getElementById(modalId);
  if (!(modal instanceof HTMLDialogElement)) return;

  if (modal.open) {
    closeModal(modal);
    return;
  }

  openModal(modal);
};

const closeModal = (modal) => {
  visibleModal = null;
  modal.setAttribute('closing', '');

  modal.addEventListener(
    'transitionend',
    () => {
      modal.removeAttribute('closing');
      modal.close();
    },
    { once: true }
  );
};

const openModal = (modal) => {
  window.setTimeout(() => {
    visibleModal = modal;
  }, animationDuration);

  modal.showModal();

  const header = modal.querySelector('header');
  if (header instanceof HTMLElement) {
    toggleTitleStyle(header, modal);
  }
};

const toggleTitleStyle = (title, modal) => {
  if (!window.matchMedia('(max-width: 767px)').matches) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      title.classList.toggle('is-pinned', entry.intersectionRatio < 1);
    },
    {
      threshold: [1],
      root: modal,
      rootMargin: '0px 50px',
    }
  );

  observer.observe(title);
};
